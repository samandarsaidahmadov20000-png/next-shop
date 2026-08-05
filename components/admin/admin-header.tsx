"use client";

import { usePathname } from "next/navigation";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ArrowDown01Icon,
  Notification03Icon,
  Search01Icon,
  SidebarLeft01Icon,
} from "@hugeicons/core-free-icons";

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

  return (
    <header className="sticky top-0 z-30 flex h-[72px] items-center bg-white">
      <div className="flex w-60 shrink-0 items-center gap-4 pl-6 pr-3">
        <span className="text-2xl font-black tracking-tight text-gray-900">
          elec
        </span>

        <button
          type="button"
          onClick={onToggleSidebar}
          aria-label="Свернуть меню"
          className="ml-auto flex h-9 w-9 items-center justify-center rounded-lg bg-gray-100 text-gray-700 transition hover:bg-gray-200"
        >
          <HugeiconsIcon icon={SidebarLeft01Icon} className="h-5 w-5" />
        </button>
      </div>

      <div className="flex flex-1 items-center justify-between pl-8 pr-6">
        <h1 className="text-xl font-semibold text-gray-900">{heading}</h1>

        <div className="flex items-center gap-3">
          <button
            type="button"
            aria-label="Поиск"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-700 transition hover:bg-gray-200"
          >
            <HugeiconsIcon icon={Search01Icon} className="h-5 w-5" />
          </button>

          <button
            type="button"
            aria-label="Уведомления"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-700 transition hover:bg-gray-200"
          >
            <HugeiconsIcon icon={Notification03Icon} className="h-5 w-5" />
          </button>

          <button
            type="button"
            className="flex items-center gap-3 rounded-full py-1 pl-1 pr-2 transition hover:bg-gray-100"
          >
            {user.avatar ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={user.avatar}
                alt={user.name}
                className="h-10 w-10 rounded-full object-cover"
              />
            ) : (
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-200 text-sm font-semibold text-gray-700">
                {user.name.charAt(0)}
              </span>
            )}

            <span className="flex flex-col items-start leading-tight">
              <span className="text-sm font-semibold text-gray-900">
                {user.name}
              </span>
              <span className="text-xs text-gray-500">{user.role}</span>
            </span>

            <HugeiconsIcon
              icon={ArrowDown01Icon}
              className="h-4 w-4 text-gray-500"
            />
          </button>
        </div>
      </div>
    </header>
  );
}
