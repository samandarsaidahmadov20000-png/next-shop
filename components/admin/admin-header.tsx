"use client";

import { usePathname } from "next/navigation";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ArrowDown01Icon,
  Notification03Icon,
  Search01Icon,
  SidebarLeft01Icon,
} from "@hugeicons/core-free-icons";

import { useTheme } from "next-themes";
import ThemeToggle from "../themeToggle";
import { useEffect, useState } from "react";

const pageTitles: Record<string, string> = {
  "/admin": "Дашборд",
  "/admin/products": "Товары",
  "/admin/categories": "Категории",
  "/admin/orders": "Заказы",
};

type AdminHeaderProps = {
  title?: string;
  onToggleSidebar?: () => void;
  user?: {
    name: string;
    role: string;
    avatar?: string;
  };
};

export default function AdminHeader({
  title,
  onToggleSidebar,
  user = { name: "John Nolan", role: "Super admin" },
}: AdminHeaderProps) {
  const pathname = usePathname();
  const heading = title ?? pageTitles[pathname] ?? "Дашборд";
  const { theme, setTheme } = useTheme();


  return (
    <header className="sticky top-0 z-30 flex h-[72px] items-center bg-card border">
      <div className="flex w-60 shrink-0 items-center gap-4 pl-6 pr-3">
        <span className="text-2xl font-black tracking-tight text-foreground">
          elec
        </span>

        <button
          type="button"
          onClick={onToggleSidebar}
          aria-label="Свернуть меню"
          className="ml-auto flex h-9 w-9 items-center justify-center rounded-lg bg-card text-gray-700 transition hover:bg-gray-200"
        >
          <HugeiconsIcon icon={SidebarLeft01Icon} className="h-5 w-5" />
        </button>
      </div>

      <div className="flex flex-1 items-center justify-between pl-8 pr-6">
        <h1 className="text-xl font-semibold text-foreground">{heading}</h1>

        <div className="flex items-center gap-3">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
