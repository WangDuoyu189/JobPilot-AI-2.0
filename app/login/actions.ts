"use server";

import { cookies } from "next/headers";

export async function setSessionCookie(
  accessToken: string,
  refreshToken: string,
  uid: string,
  phone: string
) {
  const cookieStore = await cookies();
  const common = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
  };

  cookieStore.set("cloudbase_session", accessToken, {
    ...common,
    maxAge: 60 * 60,
  });

  cookieStore.set("cloudbase_refresh", refreshToken, {
    ...common,
    maxAge: 60 * 60 * 24 * 30,
  });

  cookieStore.set("cloudbase_uid", uid, {
    ...common,
    maxAge: 60 * 60 * 24 * 30,
  });

  cookieStore.set("cloudbase_phone", phone, {
    ...common,
    maxAge: 60 * 60 * 24 * 30,
  });
}

export async function clearSessionCookie() {
  const cookieStore = await cookies();
  cookieStore.delete("cloudbase_session");
  cookieStore.delete("cloudbase_refresh");
  cookieStore.delete("cloudbase_uid");
  cookieStore.delete("cloudbase_phone");
}
