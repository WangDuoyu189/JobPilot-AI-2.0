"use client";

import cloudbase from "@cloudbase/js-sdk";

const envId =
  process.env.NEXT_PUBLIC_CLOUDBASE_ENV_ID ||
  "jobpilot-prod-d5gawdy5ife107d47";

const accessKey = process.env.NEXT_PUBLIC_CLOUDBASE_ACCESS_KEY || "";

export const app = cloudbase.init({
  env: envId,
  region: "ap-shanghai",
  ...(accessKey ? { accessKey } : {}),
});

// CloudBase JS SDK v3 exposes auth as a property, not app.auth().
export const auth = app.auth;
