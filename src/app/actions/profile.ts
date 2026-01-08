"use server";

import { auth } from "~/server/auth";
import { db } from "~/server/db";
import { revalidatePath } from "next/cache";

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
