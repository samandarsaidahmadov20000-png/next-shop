"use client";

import { useIsLoggedIn } from "@/hooks/useIsLoggedIn";
import { orderService } from "@/services/order.service";
import { useCartStore } from "@/store/cart.store";
import { useMutation } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";

import { useRouter } from "next/navigation";

function Cart() {
  const { cart, addToCart, quantityPlus, quantityMinus, removeItem, totalSum } =
    useCartStore();

  const router = useRouter();

  // console.log(totalSum);

  // console.log(cart);

  const isLoggedIn = useIsLoggedIn();
  const orderServerMutation = useMutation({
    mutationFn: () => orderService.createOrder(),
  });

  function orderCreate() {
    if (isLoggedIn) {
      orderServerMutation.mutate();
    } else {
      router.push("/login");
    }

    console.log("success");
  }

  return (
    <section className="mx-auto max-w-[1240px] px-4 py-5 sm:px-6 lg:py-6">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-black/60">
        <a href="/" className="hover:text-black">
          Home
        </a>
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
        <span className="text-black">Cart</span>
      </nav>

      <h1 className="mt-5 font-display text-[32px] uppercase leading-none tracking-tight text-black lg:mt-6 lg:text-[40px]">
        Your cart
      </h1>

      <div className="mt-5 flex flex-col gap-5 lg:mt-6 lg:flex-row lg:items-start">
        <div className="w-full rounded-[20px] border border-black/10 px-4 py-1 lg:px-6">
          {cart.length == 0 ? (
            <div>
              <h1 className="text-[60px] text-[#000]">Продуктов нет</h1>
              <Link href="/" className="text-[#000]">
                добавить товар
              </Link>
            </div>
          ) : (
            cart.map((item) => {
              return (
                <>
                  <div
                    className="flex gap-3.5 border-b border-black/10 py-4 lg:gap-4 lg:py-5"
                    key={item.id}
                  >
                    <div className="h-[99px] w-[99px] shrink-0 overflow-hidden rounded-[9px] bg-[#F0EEED] lg:h-[124px] lg:w-[124px]">
                      <Image
                        src={item.image}
                        width={500}
                        height={500}
                        alt="Picture of the author"
                      />
                    </div>

                    <div className="flex flex-1 flex-col justify-between">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <h3 className="text-base font-bold leading-tight text-black lg:text-xl">
                            Gradient Graphic T-shirt
                          </h3>
                          <p className="mt-1 text-xs text-black lg:mt-2 lg:text-sm">
                            Size: <span className="text-black/60">Large</span>
                          </p>
                          <p className="mt-0.5 text-xs text-black lg:mt-1 lg:text-sm">
                            Color: <span className="text-black/60">White</span>
                          </p>
                        </div>

                        <button
                          type="button"
                          className="text-[#FF3333] transition hover:opacity-70"
                          onClick={() => removeItem(item.id)}
                        >
                          <svg
                            className="h-5 w-5 lg:h-6 lg:w-6"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M3 6h18" />
                            <path d="M8 6V4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2" />
                            <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                            <path d="M10 11v6" />
                            <path d="M14 11v6" />
                          </svg>
                        </button>
                      </div>

                      <div className="mt-2 flex items-end justify-between gap-3">
                        <p className="text-xl font-bold text-black lg:text-2xl">
                          ${item.price}
                        </p>

                        <div className="flex h-8 w-[105px] items-center justify-between rounded-full bg-[#F0F0F0] px-3.5 lg:h-11 lg:w-[126px] lg:px-5">
                          <button
                            type="button"
                            className="text-black transition hover:opacity-60"
                            onClick={() => quantityMinus(item.id)}
                          >
                            <svg
                              className="h-4 w-4 lg:h-5 lg:w-5"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                            >
                              <path d="M5 12h14" />
                            </svg>
                          </button>
                          <span className="text-sm font-medium text-black lg:text-base">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => quantityPlus(item.id)}
                            type="button"
                            className="text-black transition hover:opacity-60"
                          >
                            <svg
                              className="h-4 w-4 lg:h-5 lg:w-5"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                            >
                              <path d="M12 5v14" />
                              <path d="M5 12h14" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              );
            })
          )}
        </div>

        {/* Order summary */}
        <div className="w-full rounded-[20px] border border-black/10 p-5 lg:w-[505px] lg:shrink-0 lg:p-6">
          <h2 className="text-xl font-bold text-black lg:text-2xl">
            Order Summary
          </h2>

          <div className="my-5 h-px w-full bg-black/10" />

          <div className="flex items-center justify-between">
            <span className="text-base text-black lg:text-xl">Total</span>
            <span className="text-xl font-bold text-black lg:text-2xl">
              ${totalSum()}
            </span>
          </div>

          <button
            onClick={orderCreate}
            className="mt-5 flex h-[54px] w-full items-center justify-center gap-3 rounded-full bg-black text-sm font-medium text-white transition hover:opacity-85 lg:h-[60px] lg:text-base"
          >
            Оформит заказ
            <svg
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}

export default Cart;
