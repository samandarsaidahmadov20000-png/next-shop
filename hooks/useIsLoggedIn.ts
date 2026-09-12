"use client";

import { authStore } from "@/store/authStore";

export function useIsLoggedIn() {
  const { isLoggedIn } = authStore();

  return isLoggedIn;
}