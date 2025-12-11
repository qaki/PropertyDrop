import { Paddle, Environment } from "@paddle/paddle-node-sdk";
import { env } from "~/env";

// Initialize Paddle client
export const paddle = new Paddle(env.PADDLE_API_KEY, {
  environment: env.PADDLE_ENVIRONMENT === "production" 
    ? Environment.production 
    : Environment.sandbox,
});

