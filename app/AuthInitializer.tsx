"use client";

import { authStore } from "@/store/authStore";
import React, { useEffect } from "react";

function AuthInitializer() {
const { initialize } = authStore();

  useEffect(() => {
    initialize()
  }, []);

  return null
}

export default AuthInitializer;