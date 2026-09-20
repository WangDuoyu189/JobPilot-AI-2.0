"use server";

import { cookies } from "next/headers";

export async function setSessionCookie(
  accessToken: string,
  uid: string,
  phone: string
) {
  const cookieStore = await cookies();

  cookieStore.set("cloudbase_session", accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });

  cookieStore.set("cloudbase_uid", uid, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });

  cookieStore.set("cloudbase_phone", phone, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });
}

export async function clearSessionCookie() {
  const cookieStore = await cookies();
  cookieStore.delete("cloudbase_session");
  cookieStore.delete("cloudbase_uid");
  cookieStore.delete("cloudbase_phone");
}
