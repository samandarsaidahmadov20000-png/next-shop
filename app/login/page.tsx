"use client";

import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { authService } from "@/services/auth.service";
import { jwtDecode } from "jwt-decode";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { authStore } from "@/store/authStore";

const loginSchema = z.object({
  email: z.string().min(3, "Too short").max(50, "Too long"),
  password: z.string().min(5, "Too short").max(50, "Too long"),
});

type Inputs = z.infer<typeof loginSchema>;

function Login() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const { login } = authStore();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const result = await authService.login(data);
      localStorage.setItem("token", result.token);
      login();
      console.log("LOGIN SUCCESS");
      const decoded = jwtDecode<{ id: string; role: string }>(result.token);

      if (decoded.role == "admin") {
        router.push("/admin");
      } else {
        router.push("/");
      }
    } catch (error) {
      console.log("mistake", error);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-sm rounded-2xl bg-white p-8 shadow-sm">
        <div className="mb-6 flex flex-col items-center text-center">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-blue-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-7 w-7 text-white"
            >
              <path d="M12 12c2.7 0 4.9-2.2 4.9-4.9S14.7 2.2 12 2.2 7.1 4.4 7.1 7.1 9.3 12 12 12Zm0 2.4c-3.3 0-9.8 1.6-9.8 4.9v2.5h19.6v-2.5c0-3.3-6.5-4.9-9.8-4.9Z" />
            </svg>
          </div>
          <h1 className="text-xl font-bold text-gray-900">
            Login to your account
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Enter your details to login
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="mb-1.5 block text-sm font-medium text-gray-900"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              {...register("email", { required: "Email обязателен" })}
              placeholder="Enter your email address"
              className="w-full rounded-lg bg-gray-100 px-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.email && (
              <span className="mt-1 block text-xs text-red-500">
                {errors.email.message}
              </span>
            )}
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-1.5 block text-sm font-medium text-gray-900"
            >
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                {...register("password", { required: "Пароль обязателен" })}
                placeholder="Enter your password"
                className="w-full rounded-lg bg-gray-100 px-4 py-2.5 pr-11 text-sm text-gray-900 placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    className="h-5 w-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.5 12S5.5 5 12 5s9.5 7 9.5 7-3 7-9.5 7-9.5-7-9.5-7Z"
                    />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    className="h-5 w-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 3l18 18M10.6 10.7a2 2 0 0 0 2.7 2.7M6.6 6.7C4.4 8.2 2.5 12 2.5 12s3 7 9.5 7c1.8 0 3.3-.5 4.6-1.3M9.9 5.2c.7-.1 1.4-.2 2.1-.2 6.5 0 9.5 7 9.5 7-.5 1.2-1.2 2.5-2.2 3.7"
                    />
                  </svg>
                )}
              </button>
            </div>
            {errors.password && (
              <span className="mt-1 block text-xs text-red-500">
                {errors.password.message}
              </span>
            )}
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-black py-2.5 text-sm font-medium text-white transition hover:bg-gray-800"
          >
            Login
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          <Link
            href="/register"
            className="hover:text-gray-900 hover:underline"
          >
            пройти регистрацию
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
