"use client";

import CustomDropdown from "@/components/dropdown";
import { useIsLoggedIn } from "@/hooks/useIsLoggedIn";
import { cartAuthService } from "@/services/cart.service";
import { categoryService } from "@/services/category.service";

import { productService } from "@/services/product.service";
import { useCartStore } from "@/store/cart.store";
import { useQuery } from "@tanstack/react-query";
import {
  ChevronDown,
  Menu,
  Search,
  ShoppingCart,
  UserRound,
  X,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

function Header() {
  const { cart } = useCartStore();

  const { totalQuantity } = useCartStore();

  const isLoggedIn = useIsLoggedIn();

  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  // const inputRef = useRef(null);
  const [isFocused, setIsFocused] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setIsFocused(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  const { data, isFetching } = useQuery({
    queryKey: ["products", debouncedSearch],
    queryFn: () => productService.getAll(debouncedSearch),
    enabled: debouncedSearch.trim().length > 0,
  });

  const { data: category } = useQuery({
    queryKey: ["category"],
    queryFn: () => categoryService.getAll(),
  });
  
  // Корзина с сервера нужна только авторизованному, иначе /cart вернёт 401.
  const { data: cartTotal } = useQuery({
    queryKey: ["cart"],
    queryFn: () => cartAuthService.cartGet(),
    enabled: isLoggedIn,
    retry: false,
  });

  // Гость считает по localStorage, авторизованный — по серверной корзине.
  const total = isLoggedIn ? (cartTotal?.totalCount ?? 0) : totalQuantity();


  


  // console.log(category?.categories);

  const categoryItems = category?.categories?.map((cat: any) => ({
    name: cat.name,
    onClick: () => router.push(`/category/${cat._id}`),
  }));

  return (
    <div className="bg-white">
      {/* Top promo banner */}
      <div className="relative bg-black px-10 py-2.5 text-center">
        <p className="text-xs text-white sm:text-sm">
          Sign up and get 20% off to your first order.{" "}
          <a
            href="/register"
            className="font-medium underline underline-offset-2"
          >
            Sign Up Now
          </a>
        </p>
        <button
          type="button"
          aria-label="Close"
          className="absolute right-4 top-1/2 hidden -translate-y-1/2 cursor-pointer text-white/80 transition hover:text-white md:block"
        >
          <X className="h-5 w-5" strokeWidth={1.5} />
        </button>
      </div>

      {/* Navbar */}
      <header className="border-b border-black/5 bg-white">
        <div className="mx-auto flex h-16 max-w-[1240px] items-center gap-4 px-4 sm:px-6 lg:h-[86px] lg:gap-10">
          <button
            type="button"
            aria-label="Menu"
            className="cursor-pointer text-black lg:hidden"
          >
            <Menu className="h-6 w-6" strokeWidth={1.75} />
          </button>
          <a
            href="/"
            className="shrink-0 font-display text-2xl uppercase leading-none tracking-tight text-black sm:text-[32px]"
          >
            Shop.co
          </a>

          <CustomDropdown
            trigger={
              <button
                type="button"
                className="group hidden h-11 cursor-pointer items-center gap-2 rounded-full bg-black px-5 text-base font-medium text-white transition-colors hover:bg-black/80 active:bg-black/90 data-[popup-open]:bg-black/80 lg:flex"
              >
                <span className="flex h-4 w-4 flex-col justify-between">
                  <span className="block h-[2px] w-full rounded-full bg-white" />
                  <span className="block h-[2px] w-full rounded-full bg-white" />
                  <span className="block h-[2px] w-full rounded-full bg-white" />
                </span>
                Каталог
                <ChevronDown
                  className="h-4 w-4 transition-transform duration-200 group-data-[popup-open]:rotate-180"
                  strokeWidth={2}
                />
              </button>
            }
            items={categoryItems}
          />
          <nav className="hidden items-center gap-6 lg:flex">
            <a
              href="/shop"
              className="flex items-center gap-1 text-base text-black transition hover:opacity-60"
            >
              Shop
              <ChevronDown className="h-4 w-4" strokeWidth={2} />
            </a>
            <a
              href="/sale"
              className="text-base text-black transition hover:opacity-60"
            >
              On Sale
            </a>
            <a
              href="/new-arrivals"
              className="whitespace-nowrap text-base text-black transition hover:opacity-60"
            >
              New Arrivals
            </a>
            <a
              href="/brands"
              className="text-base text-black transition hover:opacity-60"
            >
              Brands
            </a>
          </nav>
          <div ref={searchRef} className="relative hidden flex-1 md:block">
            <Search
              className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-black/40"
              strokeWidth={2}
            />
            <input
              onChange={(e) => setSearch(e.target.value)}
              value={search}
              onFocus={() => setIsFocused(true)}
              // onBlur={() => setIsFocused(false)}
              // ref={inputRef}
              type="search"
              placeholder="Search for products..."
              className="h-12 w-full rounded-full bg-[#F0F0F0] pl-12 pr-4 text-base text-black outline-none placeholder:text-black/40"
            />

            {isFocused && !isFetching && (
              <div className="absolute w-[100%] z-10 min-h-[300px] bg-white shadow-2xl rounded-3xl p-[10px]">
                {data?.products?.map((item: any) => (
                  <p className="text-black" key={item._id}>
                    {item?.name}
                  </p>
                ))}
              </div>
            )}
          </div>
          <div className="ml-auto flex items-center gap-3 lg:ml-0">
            <a
              href="/search"
              aria-label="Search"
              className="text-black transition hover:opacity-60 md:hidden"
            >
              <Search className="h-6 w-6" strokeWidth={1.75} />
            </a>
            <a
              href="/cart"
              aria-label="Cart"
              className="text-black transition hover:opacity-60"
            >
              <ShoppingCart className="h-6 w-6" strokeWidth={1.75} />

              <p>{total}</p>
            </a>
            <a
              href="/login"
              aria-label="Account"
              className="flex h-6 w-6 items-center justify-center rounded-full border-[1.75px] border-black text-black transition hover:opacity-60"
            >
              <UserRound className="h-3.5 w-3.5" strokeWidth={2.25} />
            </a>
          </div>
        </div>
      </header>
    </div>
  );
}

export default Header;
