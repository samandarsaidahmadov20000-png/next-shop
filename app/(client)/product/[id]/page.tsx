"use client";

import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { productService } from "@/services/product.service";

function ProductDetail() {
  const { id } = useParams();

  const { data: product } = useQuery({
    queryKey: ["product", id],
    queryFn: () => productService.getById(id as string),
  });

  return (
    <div className="mx-auto max-w-[1240px] px-4 pb-16 sm:px-6">
      {/* Breadcrumb */}
      <nav className="flex flex-wrap items-center gap-2 py-5 text-base text-black/60">
        <a href="/" className="transition hover:text-black">
          Home
        </a>
        <svg
          className="h-4 w-4 shrink-0"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m9 18 6-6-6-6" />
        </svg>
        <a href="/shop" className="transition hover:text-black">
          Shop
        </a>
        <svg
          className="h-4 w-4 shrink-0"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m9 18 6-6-6-6" />
        </svg>
        <a href="/shop" className="transition hover:text-black">
          Men
        </a>
        <svg
          className="h-4 w-4 shrink-0"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m9 18 6-6-6-6" />
        </svg>
        <span className="text-black">
          {product?.category?.name ?? "T-shirts"}
        </span>
      </nav>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-10">
        {/* Gallery */}
        <div className="flex flex-col-reverse gap-3 sm:flex-row lg:gap-3.5">
          <div className="flex shrink-0 gap-3 sm:flex-col lg:gap-3.5">
            <div className="h-[106px] w-full overflow-hidden rounded-[20px] border-2 border-black bg-[#F0EEED] sm:h-[167px] sm:w-[152px] lg:h-[167px]">
              <img
                src={product?.image}
                alt={product?.name}
                className="h-full w-full object-contain"
              />
            </div>
            <div className="h-[106px] w-full overflow-hidden rounded-[20px] border-2 border-transparent bg-[#F0EEED] sm:h-[167px] sm:w-[152px]">
              <img
                src={product?.image}
                alt={product?.name}
                className="h-full w-full object-contain"
              />
            </div>
            <div className="h-[106px] w-full overflow-hidden rounded-[20px] border-2 border-transparent bg-[#F0EEED] sm:h-[167px] sm:w-[152px]">
              <img
                src={product?.image}
                alt={product?.name}
                className="h-full w-full object-contain"
              />
            </div>
          </div>

          <div className="flex-1 overflow-hidden rounded-[20px] bg-[#F0EEED]">
            <img
              src={product?.image}
              alt={product?.name}
              className="h-[290px] w-full object-contain sm:h-[440px] lg:h-[530px]"
            />
          </div>
        </div>

        {/* Info */}
        <div>
          <h1 className="font-display text-[28px] uppercase leading-[1.05] tracking-tight text-black sm:text-[40px]">
            {product?.name}
          </h1>

          {/* Rating */}
          <div className="mt-3 flex items-center gap-4">
            <div className="flex items-center gap-1">
              <svg className="h-5 w-5 fill-[#FFC633]" viewBox="0 0 24 24">
                <path d="m12 2 3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14l-5-4.87 6.91-1.01L12 2Z" />
              </svg>
              <svg className="h-5 w-5 fill-[#FFC633]" viewBox="0 0 24 24">
                <path d="m12 2 3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14l-5-4.87 6.91-1.01L12 2Z" />
              </svg>
              <svg className="h-5 w-5 fill-[#FFC633]" viewBox="0 0 24 24">
                <path d="m12 2 3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14l-5-4.87 6.91-1.01L12 2Z" />
              </svg>
              <svg className="h-5 w-5 fill-[#FFC633]" viewBox="0 0 24 24">
                <path d="m12 2 3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14l-5-4.87 6.91-1.01L12 2Z" />
              </svg>
              <svg className="h-5 w-5" viewBox="0 0 24 24">
                <defs>
                  <linearGradient id="halfStar">
                    <stop offset="50%" stopColor="#FFC633" />
                    <stop offset="50%" stopColor="#FFC633" stopOpacity="0.25" />
                  </linearGradient>
                </defs>
                <path
                  fill="url(#halfStar)"
                  d="m12 2 3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14l-5-4.87 6.91-1.01L12 2Z"
                />
              </svg>
            </div>
            <p className="text-sm text-black sm:text-base">
              4.5<span className="text-black/60">/5</span>
            </p>
          </div>

          {/* Price */}
          <div className="mt-3 flex flex-wrap items-center gap-3">
            <span className="font-display text-[28px] leading-none text-black sm:text-[32px]">
              ${product?.price}
            </span>
            <span className="font-display text-[28px] leading-none text-black/30 line-through sm:text-[32px]">
              $300
            </span>
            <span className="rounded-full bg-[#FF3333]/10 px-3.5 py-1.5 text-sm text-[#FF3333] sm:text-base">
              -40%
            </span>
          </div>

          {/* Description */}
          <p className="mt-5 text-sm leading-[22px] text-black/60 sm:text-base">
            {product?.description}
          </p>

          <hr className="my-6 border-black/10" />

          {/* Colors */}
          <div>
            <p className="text-sm text-black/60 sm:text-base">Select Colors</p>
            <div className="mt-4 flex items-center gap-4">
              <span className="flex h-[37px] w-[37px] items-center justify-center rounded-full bg-[#4F4631]">
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
              <span className="h-[37px] w-[37px] rounded-full bg-[#314F4A]" />
              <span className="h-[37px] w-[37px] rounded-full bg-[#31344F]" />
            </div>
          </div>

          <hr className="my-6 border-black/10" />

          {/* Sizes */}
          <div>
            <p className="text-sm text-black/60 sm:text-base">Choose Size</p>
            <div className="mt-4 flex flex-wrap items-center gap-2 sm:gap-3">
              <span className="rounded-full bg-[#F0F0F0] px-5 py-3 text-sm text-black/60 sm:px-6 sm:text-base">
                Small
              </span>
              <span className="rounded-full bg-[#F0F0F0] px-5 py-3 text-sm text-black/60 sm:px-6 sm:text-base">
                Medium
              </span>
              <span className="rounded-full bg-black px-5 py-3 text-sm text-white sm:px-6 sm:text-base">
                Large
              </span>
              <span className="rounded-full bg-[#F0F0F0] px-5 py-3 text-sm text-black/60 sm:px-6 sm:text-base">
                X-Large
              </span>
            </div>
          </div>

          <hr className="my-6 border-black/10" />

          {/* Quantity + cart */}
          <div className="flex items-center gap-3 sm:gap-5">
            <div className="flex h-12 w-[110px] shrink-0 items-center justify-between rounded-full bg-[#F0F0F0] px-4 sm:h-[52px] sm:w-[170px] sm:px-6">
              <span className="cursor-pointer text-2xl leading-none text-black select-none">
                −
              </span>
              <span className="text-sm text-black sm:text-base">1</span>
              <span className="cursor-pointer text-2xl leading-none text-black select-none">
                +
              </span>
            </div>
            <a
              href="/cart"
              className="flex h-12 flex-1 items-center justify-center rounded-full bg-black px-8 text-sm text-white transition hover:opacity-80 sm:h-[52px] sm:text-base"
            >
              Add to Cart
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
