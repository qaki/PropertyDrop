"use server";

import { db } from "~/server/db";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { resend } from "~/lib/resend";
import { VerificationEmail } from "~/emails/verification-email";
import crypto from "crypto";
import { env } from "~/env";

const signupSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string().min(1),
});

export async function signup(formData: FormData) {
  const rawData = {
    email: formData.get("email"),
    password: formData.get("password"),
    name: formData.get("name"),
  };

  const parsed = signupSchema.safeParse(rawData);

  if (!parsed.success) {
    return { success: false, error: "Invalid data" };
  }

  const existingUser = await db.user.findUnique({
    where: { email: parsed.data.email },
  });

  if (existingUser) {
    return { success: false, error: "User already exists" };
  }

  const passwordHash = await bcrypt.hash(parsed.data.password, 10);
  
  // Generate unique verification token
  const verificationToken = crypto.randomBytes(32).toString("hex");

  // Create user with unverified email
  const user = await db.user.create({
    data: {
      email: parsed.data.email,
      name: parsed.data.name,
      passwordHash,
      emailVerificationToken: verificationToken,
      emailVerified: null, // Not verified yet
    },
  });

  // Send verification email
  const appUrl = env.NEXT_PUBLIC_APP_URL || "http://localhost:3001";
  const verificationUrl = `${appUrl}/verify-email?token=${verificationToken}`;

  try {
    await resend.emails.send({
      from: "PropertyDrop <onboarding@resend.dev>", // Change this to your verified domain
      to: parsed.data.email,
      subject: "Verify your PropertyDrop account",
      react: <VerificationEmail name={parsed.data.name} verificationUrl={verificationUrl} />,
    });

    return {
      success: true,
      message: "Account created! Please check your email to verify your account.",
    };
  } catch (error) {
    console.error("Failed to send verification email:", error);
    
    // Delete the user if email fails to send
    await db.user.delete({ where: { id: user.id } });
    
    return {
      success: false,
      error: "Failed to send verification email. Please try again.",
    };
  }
}

