import { serve } from "inngest/next";
import { inngest } from "~/server/inngest/client";
import { processImage } from "~/server/inngest/functions/image-processing";

export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [
    processImage,
  ],
});
