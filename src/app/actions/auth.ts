"use server";

import { db } from "~/server/db";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { resend } from "~/lib/resend";
import crypto from "crypto";
import { env } from "~/env";

// Helper function to generate verification email HTML
function generateVerificationEmailHTML(name: string, verificationUrl: string): string {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="margin: 0; padding: 0; font-family: Arial, sans-serif;">
        <div style="max-width: 600px; margin: 0 auto;">
          <div style="background-color: #4f46e5; padding: 40px 20px; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 32px;">PropertyDrop</h1>
            <p style="color: #e0e7ff; margin: 10px 0 0 0;">Real Estate Photography Platform</p>
          </div>
          
          <div style="padding: 40px 20px; background-color: #ffffff;">
            <h2 style="color: #1f2937; margin-bottom: 20px;">
              Welcome to PropertyDrop, ${name}!
            </h2>
            
            <p style="color: #4b5563; font-size: 16px; line-height: 1.6;">
              Thank you for signing up! We're excited to have you on board.
            </p>
            
            <p style="color: #4b5563; font-size: 16px; line-height: 1.6;">
              To complete your registration and start uploading photos, please verify your email address by clicking the button below:
            </p>
            
            <div style="text-align: center; margin: 40px 0;">
              <a href="${verificationUrl}" style="background-color: #4f46e5; color: white; padding: 16px 32px; text-decoration: none; border-radius: 8px; font-size: 16px; font-weight: 600; display: inline-block;">
                Verify Email Address
              </a>
            </div>
            
            <p style="color: #6b7280; font-size: 14px; line-height: 1.6;">
              Or copy and paste this link into your browser:
            </p>
            
            <p style="background-color: #f3f4f6; padding: 12px; border-radius: 6px; font-size: 14px; color: #4b5563; word-break: break-all;">
              ${verificationUrl}
            </p>
            
            <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
              <p style="color: #6b7280; font-size: 14px; line-height: 1.6;">
                <strong>What's next?</strong>
              </p>
              <ul style="color: #6b7280; font-size: 14px; line-height: 1.8;">
                <li>Create your first job</li>
                <li>Upload and process photos</li>
                <li>Share delivery links with clients</li>
                <li>Get paid automatically</li>
              </ul>
            </div>
          </div>
          
          <div style="background-color: #f9fafb; padding: 30px 20px; text-align: center; border-top: 1px solid #e5e7eb;">
            <p style="color: #6b7280; font-size: 12px; margin: 0 0 10px 0;">
              This link will expire in 24 hours.
            </p>
            <p style="color: #9ca3af; font-size: 12px; margin: 0;">
              If you didn't create an account with PropertyDrop, you can safely ignore this email.
            </p>
            <p style="color: #9ca3af; font-size: 12px; margin-top: 20px;">
              © 2025 PropertyDrop. All rights reserved.
            </p>
          </div>
        </div>
      </body>
    </html>
  `;
}

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
      from: "PropertyDrop <no-reply@property-drop.com>",
      to: parsed.data.email,
      subject: "Verify your PropertyDrop account",
      html: generateVerificationEmailHTML(parsed.data.name, verificationUrl),
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

