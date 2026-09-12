"use client";

import { cartAuthService } from "@/services/cart.service";
import { productService } from "@/services/product.service";
import { useCartStore } from "@/store/cart.store";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Star, StarHalf } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import { useIsLoggedIn } from "@/hooks/useIsLoggedIn";

function Products() {
  const {
    cart,
    addToCart: addToLocalCart,
    quantityPlus,
    quantityMinus,
  } = useCartStore();
  const queryClient = useQueryClient();

  const { data, error, isError, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: () => productService.getAll(),
  });
  
  const {data: cartGet} = useQuery({
    queryKey: ["cart"],
    queryFn: () => cartAuthService.cartGet(),
  })



// console.log(cartGet?.cart?.items);



  const addToServerMutation = useMutation({
    mutationFn: (product) =>
      cartAuthService.createCart({items: [{ productId: product._id, quantity: 1 }]}),
    onSuccess: () => queryClient.invalidateQueries(["cart"]),
  });

  const isLoggedIn = useIsLoggedIn();


  function handleAddToCart(product: any) {


    if (isLoggedIn) {
      addToServerMutation.mutate(product);
      



    } else {
      addToLocalCart(
        product._id,
        1,
        product.name,
        product.price,
        product.image,
      );
    }
  }

  if (isLoading)
    return (
      <div className="rounded-2xl border border-border bg-card p-6 text-sm text-muted-foreground">
        Загрузка...
      </div>
    );
  if (isError)
    return (
      <div className="rounded-2xl border border-border bg-card p-6 text-sm text-red-600">
        Ошибка загрузки
      </div>
    );

  // console.log(data);

  return (
    <section className="mx-auto max-w-[1240px] px-4 py-14 sm:px-6 lg:py-[72px]">
      <h2 className="text-center font-display text-[32px] uppercase leading-none tracking-tight text-black lg:text-[38px]">
        Рекомендуем
      </h2>

      <div className="mt-10 grid grid-cols-2 gap-4 sm:gap-5 lg:mt-14 lg:grid-cols-4">
        {data?.products?.map((item) => {
          const cartItem = cart.find((el) => el.id == item._id);
          const userCart = cartGet?.cart?.items?.find((elment) => elment.product._id == item._id) 
          
          console.log(userCart);
          

          return (
            <article key={item._id}>
              <div className="aspect-square overflow-hidden rounded-[20px] bg-[#F0EEED]">
                <Link href={`/product/${item._id}`}>
                  <img
                    src={item.image}
                    alt="Sleeve Striped T-shirt"
                    className="h-full w-full object-cover"
                  />
                </Link>
              </div>
              <h3 className="mt-3 truncate text-base font-bold text-black lg:mt-4 lg:text-xl">
                {item.name}
              </h3>

              <div className="mt-1.5 flex items-center gap-2.5">
                <p className="text-xl font-bold text-black lg:text-2xl">
                  ${item.price}
                </p>
              </div>

              {userCart && userCart.quantity > 0 || cartItem && cartItem?.quantity > 0 ? (
                <div className="w-[100%] min-h-[20px] bg-red-600 flex justify-between">
                  <button onClick={() => quantityMinus(cartItem.id)}>-</button>
                  <b>{userCart?.quantity ? userCart?.quantity : cartItem?.quantity }</b>
                  <button onClick={() => quantityPlus(cartItem.id)}>+</button>
                </div>
              ) : (
                <button
                  onClick={() => handleAddToCart(item)}
                  type="button"
                  className="mt-3 w-full cursor-pointer rounded-full bg-black px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-black/80 active:bg-black/90 lg:mt-4 lg:text-base"
                >
                  Добавить в корзину
                </button>
              )}
            </article>
          );
        })}
      </div>
    </section>
  );
}

export default Products;
