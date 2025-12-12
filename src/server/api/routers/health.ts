import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

/**
 * Simple health check router
 * Required to keep tRPC working even though we use Server Actions for mutations
 */
export const healthRouter = createTRPCRouter({
  check: publicProcedure.query(() => {
    return { status: "ok", timestamp: new Date().toISOString() };
  }),
});

