"use server";

import { auth } from "~/server/auth";
import { db } from "~/server/db";
import { revalidatePath } from "next/cache";
import bcrypt from "bcryptjs";

export async function updateProfile(formData: FormData) {
  const session = await auth();
  if (!session?.user?.id) {
    return { success: false, error: "Not authenticated" };
  }

  const name = formData.get("name") as string;

  if (!name || name.trim().length === 0) {
    return { success: false, error: "Name is required" };
  }

  try {
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

export async function updateProfilePhoto(photoUrl: string) {
  const session = await auth();
  if (!session?.user?.id) {
    return { success: false, error: "Not authenticated" };
  }

  if (!photoUrl) {
    return { success: false, error: "Photo URL is required" };
  }

  try {
    await db.user.update({
      where: { id: session.user.id },
      data: { image: photoUrl },
    });

    revalidatePath("/settings");
    revalidatePath("/jobs");
    return { success: true, message: "Profile photo updated successfully" };
  } catch (error) {
    console.error("Profile photo update error:", error);
    return { success: false, error: "Failed to update profile photo" };
  }
}

export async function updateBranding(formData: FormData) {
  const session = await auth();
  if (!session?.user?.id) {
    return { success: false, error: "Not authenticated" };
  }

  const companyName = formData.get("companyName") as string;
  const companyLogo = formData.get("companyLogo") as string;

  try {
    await db.user.update({
      where: { id: session.user.id },
      data: {
        companyName: companyName || null,
        companyLogo: companyLogo || null,
      },
    });

    revalidatePath("/settings");
    return { success: true, message: "Branding updated successfully" };
  } catch (error) {
    console.error("Branding update error:", error);
    return { success: false, error: "Failed to update branding" };
  }
}

export async function updatePassword(formData: FormData): Promise<{ success: boolean; message?: string; error?: string }> {
  const session = await auth();
  if (!session?.user?.id) {
    return { success: false, error: "Not authenticated" };
  }

  const currentPassword = formData.get("currentPassword") as string;
  const newPassword = formData.get("newPassword") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  // Validate inputs
  if (!currentPassword || !newPassword || !confirmPassword) {
    return { success: false, error: "All fields are required" };
  }

  if (newPassword !== confirmPassword) {
    return { success: false, error: "New passwords do not match" };
  }

  if (newPassword.length < 8) {
    return { success: false, error: "Password must be at least 8 characters long" };
  }

  try {
    // Get user from database
    const user = await db.user.findUnique({
      where: { id: session.user.id },
      select: { passwordHash: true },
    });

    if (!user?.passwordHash) {
      return { 
        success: false, 
        error: "Cannot change password. You're signed in with a social provider (Google, GitHub, etc.)." 
      };
    }

    // Verify current password
    const isCurrentPasswordValid = await bcrypt.compare(currentPassword, user.passwordHash);
    if (!isCurrentPasswordValid) {
      return { success: false, error: "Current password is incorrect" };
    }

    // Check if new password is same as current password
    const isSamePassword = await bcrypt.compare(newPassword, user.passwordHash);
    if (isSamePassword) {
      return { success: false, error: "New password must be different from your current password" };
    }

    // Hash new password
    const newPasswordHash = await bcrypt.hash(newPassword, 10);

    // Update password in database
    await db.user.update({
      where: { id: session.user.id },
      data: { passwordHash: newPasswordHash },
    });

    return { success: true, message: "Password updated successfully" };
    
  } catch (error) {
    console.error("Password update error:", error);
    return { success: false, error: "Failed to update password. Please try again." };
  }
}
