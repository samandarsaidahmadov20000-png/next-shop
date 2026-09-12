import { Sparkle } from "lucide-react";
import React from "react";

function Hero() {
  return (
    <section className="bg-[#F2F0F1]">
      <div className="mx-auto grid max-w-[1240px] items-end gap-8 px-4 sm:px-6 lg:grid-cols-2 lg:gap-6">
        <div className="pt-10 pb-2 lg:pt-24 lg:pb-24">
          <h1 className="font-display text-[36px] uppercase leading-[1.05] tracking-tight text-black sm:text-[48px] lg:text-[64px]">
            Find clothes
            <br />
            that matches
            <br />
            your style
          </h1>

          <p className="mt-5 max-w-[545px] text-sm leading-relaxed text-black/60 lg:text-base">
            Browse through our diverse range of meticulously crafted garments,
            designed to bring out your individuality and cater to your sense of
            style.
          </p>

          <a
            href="/shop"
            className="mt-8 inline-flex w-full items-center justify-center rounded-full bg-black px-14 py-4 text-sm font-medium text-white transition hover:opacity-85 sm:w-auto lg:text-base"
          >
            Shop Now
          </a>

          <div className="mt-8 flex flex-wrap items-center gap-y-6 lg:mt-12">
            <div className="w-1/2 pr-6 sm:w-auto">
              <p className="font-display text-[32px] leading-none text-black lg:text-[40px]">
                200+
              </p>
              <p className="mt-1.5 text-xs text-black/60 lg:text-base">
                International Brands
              </p>
            </div>

            <div className="w-1/2 border-l border-black/10 pr-6 pl-6 sm:w-auto">
              <p className="font-display text-[32px] leading-none text-black lg:text-[40px]">
                2,000+
              </p>
              <p className="mt-1.5 text-xs text-black/60 lg:text-base">
                High-Quality Products
              </p>
            </div>

            <div className="w-full border-black/10 pt-2 sm:w-auto sm:border-l sm:pt-0 sm:pl-6">
              <p className="font-display text-[32px] leading-none text-black lg:text-[40px]">
                30,000+
              </p>
              <p className="mt-1.5 text-xs text-black/60 lg:text-base">
                Happy Customers
              </p>
            </div>
          </div>
        </div>

        <div className="relative h-[300px] overflow-hidden sm:h-[420px] lg:h-[663px]">
          <img
            src="/header-hero.png"
            alt="Two models wearing denim jackets"
            className="h-full w-full object-cover object-[86%_bottom]"
          />
          <Sparkle
            className="absolute top-[12%] right-1 z-10 h-12 w-12 fill-black text-black sm:h-16 sm:w-16 lg:top-[16%] lg:right-0 lg:h-[104px] lg:w-[104px]"
            strokeWidth={0}
          />
          <Sparkle
            className="absolute top-[44%] left-1 z-10 h-8 w-8 fill-black text-black sm:h-10 sm:w-10 lg:left-0 lg:h-[76px] lg:w-[76px]"
            strokeWidth={0}
          />
        </div>
      </div>
    </section>
  );
}

export default Hero;
