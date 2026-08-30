"use client";

import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";

import { jwtDecode } from "jwt-decode";
import Link from "next/link";
import AdminHeader from "@/components/admin/admin-header";

const navItems = [
  {
    href: "/admin",
    label: "Дашборд",
    icon: (
      <path d="M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1v-9.5Z" />
    ),
  },
  {
    href: "/admin/products",
    label: "Товары",
    icon: <path d="M21 8 12 3 3 8v8l9 5 9-5V8ZM3 8l9 5 9-5M12 13v8" />,
  },
  {
    href: "/admin/categories",
    label: "Категории",
    icon: <path d="M4 6h16M4 12h16M4 18h10" />,
  },
  {
    href: "/admin/orders",
    label: "Заказы",
    icon: (
      <path d="M3 4h2l2.4 12.2a2 2 0 0 0 2 1.8h7.2a2 2 0 0 0 2-1.6L20 8H6M9 21a1 1 0 1 0 0-2 1 1 0 0 0 0 2Zm8 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" />
    ),
  },

  {
    href: "/admin/message",
    label: "сообщения ",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="1em"
        height="1em"
        viewBox="0 0 24 24"
      >
        <title xmlns="">message</title>
        <path
          fill="none"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M8 9h8m-8 4h6m4-9a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3h-5l-5 3v-3H6a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3z"
        />
      </svg>
    ),
  },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login");
      return;
    }
    const decoded = jwtDecode<{ id: string; role: string }>(token);

    if (decoded.role !== "admin") {
      router.push("/");
      return;
    }
  }, []);

  const isActive = (href: string) =>
    href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);

  return (
    <div className="min-h-screen bg-background">
      <AdminHeader />
      <div className="flex min-h-[calc(100vh-72px)]">
        <aside className="sticky top-18 flex border h-[calc(100vh-72px)] w-60 shrink-0 flex-col bg-card px-3 py-6">
          <nav className="flex flex-col gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                  isActive(item.href)
                    ? "bg-black text-white"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5 shrink-0"
                >
                  {item.icon}
                </svg>
                {item.label}
              </Link>
            ))}
          </nav>

          <button className="mt-auto rounded-lg px-3 py-2.5 text-left text-sm font-medium text-gray-600 transition hover:bg-gray-100 hover:text-gray-900">
            logout
          </button>
        </aside>
        <main className="flex-1 bg-background p-8">{children}</main>
      </div>
    </div>
  );
}
