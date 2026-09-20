"use client";

import cloudbase from "@cloudbase/js-sdk";

const envId =
  process.env.NEXT_PUBLIC_CLOUDBASE_ENV_ID ||
  "jobpilot-prod-d5gawdy5ife107d47";

let authClient: ReturnType<ReturnType<typeof cloudbase.init>["auth"]> | null = null;

export function getAuth() {
  if (typeof window === "undefined") {
    throw new Error("CloudBase Auth must be initialized in the browser.");
  }

  if (!authClient) {
    const app = cloudbase.init({
      env: envId,
      region: "ap-shanghai",
    });

    authClient = app.auth({
      persistence: "local",
    });
  }

  return authClient;
}
