"use server";

import { createPresignedPost } from "@aws-sdk/s3-presigned-post";
import { s3 } from "~/lib/s3";
import { env } from "~/env";
import { auth } from "~/server/auth";

export async function getPresignedUrl(filename: string, contentType: string) {
  const session = await auth();
  if (!session?.user?.id) return { success: false, error: "Unauthorized" };

  const key = `uploads/${session.user.id}/${Date.now()}-${filename}`;

  try {
    const { url, fields } = await createPresignedPost(s3, {
      Bucket: env.AWS_BUCKET_NAME,
      Key: key,
      Conditions: [
        ["content-length-range", 0, 104857600], // 100MB
        ["starts-with", "$key", `uploads/${session.user.id}/`],
        ["starts-with", "$Content-Type", "image/"], 
      ],
      Fields: {
        "Content-Type": contentType,
      },
      Expires: 600,
    });

    return { success: true, data: { url, fields, key } };
  } catch (error) {
    console.error("S3 Sign Error:", error);
    return { success: false, error: "Failed to sign URL" };
  }
}

