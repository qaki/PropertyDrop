"use server";

import { auth } from "~/server/auth";
import { db } from "~/server/db";
import { hash, compare } from "bcryptjs";
import { revalidatePath } from "next/cache";

export async function updateProfile(formData: FormData) {
  try {
    const session = await auth();
    if (!session?.user) {
      return { success: false, error: "Not authenticated" };
    }

    const name = formData.get("name") as string;

    if (!name || name.trim().length < 2) {
      return { success: false, error: "Name must be at least 2 characters" };
    }

    await db.user.update({
      where: { id: session.user.id },
      data: { name: name.trim() },
    });

    revalidatePath("/settings");
    return { success: true, message: "Profile updated successfully" };
  } catch (error) {
    console.error("Profile update error:", error);
    return { success: false, error: "Failed to update profile" };
  }
}

export async function updatePassword(formData: FormData) {
  try {
    const session = await auth();
    if (!session?.user) {
      return { success: false, error: "Not authenticated" };
    }

    const currentPassword = formData.get("currentPassword") as string;
    const newPassword = formData.get("newPassword") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    if (!currentPassword || !newPassword || !confirmPassword) {
      return { success: false, error: "All fields are required" };
    }

    if (newPassword !== confirmPassword) {
      return { success: false, error: "New passwords don't match" };
    }

    if (newPassword.length < 6) {
      return { success: false, error: "Password must be at least 6 characters" };
    }

    // Get user with password
    const user = await db.user.findUnique({
      where: { id: session.user.id },
      select: { passwordHash: true },
    });

    if (!user?.passwordHash) {
      return { success: false, error: "Unable to verify current password" };
    }

    // Verify current password
    const isValid = await compare(currentPassword, user.passwordHash);
    
    if (!isValid) {
      return { success: false, error: "Current password is incorrect" };
    }

    // Hash and update new password
    const hashedPassword = await hash(newPassword, 10);
    await db.user.update({
      where: { id: session.user.id },
      data: { passwordHash: hashedPassword },
    });

    revalidatePath("/settings");
    return { success: true, message: "Password updated successfully" };
  } catch (error) {
    console.error("Password update error:", error);
    return { success: false, error: "Failed to update password" };
  }
}

