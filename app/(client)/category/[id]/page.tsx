"use client";

import { productService } from "@/services/product.service";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useParams } from "next/navigation";
import React from "react";

function CategoryPage() {
  const { id } = useParams();
  const { data } = useQuery({
    queryKey: ["products", "category", id],
    queryFn: () => productService.getAll("", 1, id as string),
  });

  return (
    <div className="mx-auto max-w-[1240px] px-4 py-5 sm:px-6">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-black/60">
        <Link href="/" className="hover:text-black">
          Home
        </Link>
        <svg
          className="h-3.5 w-3.5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m9 18 6-6-6-6" />
        </svg>
        <span className="text-black">Casual</span>
      </nav>

      <div className="mt-6 flex items-start gap-5">
        {/* Filters */}
        <aside className="hidden w-[295px] shrink-0 rounded-[20px] border border-black/10 p-5 lg:block lg:p-6">
          <div className="flex items-center justify-between border-b border-black/10 pb-5">
            <h2 className="text-xl font-bold text-black">Filters</h2>
            <svg
              className="h-6 w-6 text-black/40"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <path d="M3 6h18M7 12h10M10 18h4" />
            </svg>
          </div>

          <ul className="border-b border-black/10 py-5">
            {["T-shirts", "Shorts", "Shirts", "Hoodie", "Jeans"].map((item) => (
              <li key={item}>
                <button
                  type="button"
                  className="flex w-full cursor-pointer items-center justify-between py-2 text-base text-black/60 transition-colors hover:text-black"
                >
                  {item}
                  <svg
                    className="h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="m9 18 6-6-6-6" />
                  </svg>
                </button>
              </li>
            ))}
          </ul>

          {/* Price */}
          <div className="border-b border-black/10 py-5">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-black">Price</h3>
              <svg
                className="h-4 w-4 text-black"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m18 15-6-6-6 6" />
              </svg>
            </div>
            <div className="relative mt-6 h-1.5 rounded-full bg-black/10">
              <div className="absolute left-[15%] right-[15%] h-1.5 rounded-full bg-black" />
              <span className="absolute left-[15%] top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-black" />
              <span className="absolute right-[15%] top-1/2 h-4 w-4 translate-x-1/2 -translate-y-1/2 rounded-full bg-black" />
            </div>
            <div className="mt-4 flex items-center justify-between text-sm font-medium text-black">
              <span>$50</span>
              <span>$200</span>
            </div>
          </div>

          {/* Colors */}
          <div className="border-b border-black/10 py-5">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-black">Colors</h3>
              <svg
                className="h-4 w-4 text-black"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m18 15-6-6-6 6" />
              </svg>
            </div>
            <div className="mt-5 grid grid-cols-5 gap-3">
              <span className="h-[37px] w-[37px] rounded-full border border-black/20 bg-[#00C12B]" />
              <span className="h-[37px] w-[37px] rounded-full border border-black/20 bg-[#F50606]" />
              <span className="h-[37px] w-[37px] rounded-full border border-black/20 bg-[#F5DD06]" />
              <span className="h-[37px] w-[37px] rounded-full border border-black/20 bg-[#F57906]" />
              <span className="h-[37px] w-[37px] rounded-full border border-black/20 bg-[#06CAF5]" />
              <span className="flex h-[37px] w-[37px] items-center justify-center rounded-full border border-black/20 bg-[#063AF5]">
                <svg
                  className="h-4 w-4 text-white"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20 6 9 17l-5-5" />
                </svg>
              </span>
              <span className="h-[37px] w-[37px] rounded-full border border-black/20 bg-[#7D06F5]" />
              <span className="h-[37px] w-[37px] rounded-full border border-black/20 bg-[#F506A4]" />
              <span className="h-[37px] w-[37px] rounded-full border border-black/20 bg-white" />
              <span className="h-[37px] w-[37px] rounded-full border border-black/20 bg-black" />
            </div>
          </div>

          {/* Size */}
          <div className="border-b border-black/10 py-5">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-black">Size</h3>
              <svg
                className="h-4 w-4 text-black"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m18 15-6-6-6 6" />
              </svg>
            </div>
            <div className="mt-5 flex flex-wrap gap-2">
              {[
                "XX-Small",
                "X-Small",
                "Small",
                "Medium",
                "Large",
                "X-Large",
                "XX-Large",
                "3X-Large",
                "4X-Large",
              ].map((size) => (
                <button
                  key={size}
                  type="button"
                  className={`cursor-pointer rounded-full px-5 py-2.5 text-sm transition-colors ${
                    size === "Large"
                      ? "bg-black text-white"
                      : "bg-[#F0F0F0] text-black/60 hover:bg-black/10"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Dress Style */}
          <div className="py-5">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-black">Dress Style</h3>
              <svg
                className="h-4 w-4 text-black"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m18 15-6-6-6 6" />
              </svg>
            </div>
            <ul className="mt-5">
              {["Casual", "Formal", "Party", "Gym"].map((item) => (
                <li key={item}>
                  <button
                    type="button"
                    className="flex w-full cursor-pointer items-center justify-between py-2 text-base text-black/60 transition-colors hover:text-black"
                  >
                    {item}
                    <svg
                      className="h-4 w-4"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="m9 18 6-6-6-6" />
                    </svg>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <button
            type="button"
            className="w-full cursor-pointer rounded-full bg-black py-4 text-sm font-medium text-white transition-colors hover:bg-black/80"
          >
            Apply Filter
          </button>
        </aside>

        {/* Products */}
        <section className="flex-1">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <h1 className="text-[32px] font-bold leading-none text-black">
              Casual
            </h1>
            <div className="flex items-center gap-1 text-sm text-black/60">
              <span>
                Showing 1-{data?.products?.length ?? 0} of{" "}
                {data?.products?.length ?? 0} Products
              </span>
              <span className="hidden sm:inline">Sort by:</span>
              <button
                type="button"
                className="hidden cursor-pointer items-center gap-1 font-medium text-black sm:flex"
              >
                Most Popular
                <svg
                  className="h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </button>
            </div>
          </div>

          <div className="mt-5 grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-3">
            {data?.products?.map((item: any) => (
              <article key={item._id}>
                <Link href={`/product/${item._id}`}>
                  <div className="aspect-square overflow-hidden rounded-[20px] bg-[#F0EEED]">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                </Link>
                <h3 className="mt-3 truncate text-base font-bold text-black lg:mt-4 lg:text-xl">
                  {item.name}
                </h3>
                <div className="mt-1.5 flex items-center gap-2">
                  <span className="flex items-center gap-0.5">
                    <svg
                      className="h-4 w-4 fill-[#FFC633] text-[#FFC633]"
                      viewBox="0 0 24 24"
                    >
                      <path d="m12 2 3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2Z" />
                    </svg>
                    <svg
                      className="h-4 w-4 fill-[#FFC633] text-[#FFC633]"
                      viewBox="0 0 24 24"
                    >
                      <path d="m12 2 3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2Z" />
                    </svg>
                    <svg
                      className="h-4 w-4 fill-[#FFC633] text-[#FFC633]"
                      viewBox="0 0 24 24"
                    >
                      <path d="m12 2 3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2Z" />
                    </svg>
                    <svg
                      className="h-4 w-4 fill-[#FFC633] text-[#FFC633]"
                      viewBox="0 0 24 24"
                    >
                      <path d="m12 2 3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2Z" />
                    </svg>
                    <svg
                      className="h-4 w-4 fill-[#FFC633] text-[#FFC633]"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2v15.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2Z" />
                    </svg>
                  </span>
                  <span className="text-xs text-black lg:text-sm">
                    4.5<span className="text-black/60">/5</span>
                  </span>
                </div>
                <div className="mt-1.5 flex items-center gap-2.5">
                  <p className="text-xl font-bold text-black lg:text-2xl">
                    ${item.price}
                  </p>
                </div>
              </article>
            ))}
          </div>

          {/* Pagination */}
          <div className="mt-8 flex items-center justify-between border-t border-black/10 pt-5">
            <button
              type="button"
              className="flex cursor-pointer items-center gap-2 rounded-lg border border-black/10 px-3.5 py-2 text-sm font-medium text-black transition-colors hover:bg-black/5"
            >
              <svg
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M19 12H5m7-7-7 7 7 7" />
              </svg>
              Previous
            </button>

            <div className="flex items-center gap-0.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-black/[0.06] text-sm font-medium text-black">
                1
              </span>
              <span className="flex h-9 w-9 items-center justify-center rounded-lg text-sm font-medium text-black/50">
                2
              </span>
              <span className="flex h-9 w-9 items-center justify-center rounded-lg text-sm font-medium text-black/50">
                3
              </span>
            </div>

            <button
              type="button"
              className="flex cursor-pointer items-center gap-2 rounded-lg border border-black/10 px-3.5 py-2 text-sm font-medium text-black transition-colors hover:bg-black/5"
            >
              Next
              <svg
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14m-7-7 7 7-7 7" />
              </svg>
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}

export default CategoryPage;
