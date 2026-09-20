"use client";

import cloudbase from "@cloudbase/js-sdk";

const envId =
  process.env.NEXT_PUBLIC_CLOUDBASE_ENV_ID ||
  "jobpilot-prod-d5gawdy5ife107d47";

export const app = cloudbase.init({
  env: envId,
  region: "ap-shanghai",
});

export const auth = app.auth({
  persistence: "local",
});
