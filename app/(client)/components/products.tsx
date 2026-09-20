"use client";

import { cartAuthService } from "@/services/cart.service";
import { productService } from "@/services/product.service";
import { useCartStore } from "@/store/cart.store";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { useState } from "react";

import { useIsLoggedIn } from "@/hooks/useIsLoggedIn";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "sonner";
import {
  addItemToCart,
  applyCartPatch,
  rollbackCart,
  setItemQuantity,
  type ServerCartItem,
  type ServerCartProduct,
} from "@/lib/cart-cache";

function Products() {
  const {
    cart,
    addToCart: addToLocalCart,
    quantityPlus,
    quantityMinus,
  } = useCartStore();

  const queryClient = useQueryClient();
  const isLoggedIn = useIsLoggedIn();

  const [pendingProductId, setPendingProductId] = useState<string | null>(null);

  const { data, isError, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: () => productService.getAll(),
  });

  const { data: cartGet } = useQuery({
    queryKey: ["cart"],
    queryFn: () => cartAuthService.cartGet(),
    enabled: isLoggedIn,
    retry: false,
  });

  const addToServerMutation = useMutation({
    mutationFn: (product: ServerCartProduct) =>
      cartAuthService.createCart({
        items: [{ productId: product._id, quantity: 1 }],
      }),
    // Кэш правим сразу, чтобы количество не ждало ответа сервера.
    onMutate: async (product: ServerCartProduct) => {
      setPendingProductId(product._id);
      const previous = await applyCartPatch(
        queryClient,
        addItemToCart(product),
      );
      return { previous };
    },
    onError: (_err, _product, context) => {
      rollbackCart(queryClient, context?.previous);
      toast.error("Не удалось добавить товар");
    },
    onSettled: () => {
      setPendingProductId(null);
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });

  const updateToServerMutation = useMutation({
    mutationFn: ({ id, quantity }: { id: string; quantity: number }) =>
      cartAuthService.updateCart(id, quantity),
    onMutate: async ({ id, quantity }: { id: string; quantity: number }) => {
      const previous = await applyCartPatch(
        queryClient,
        setItemQuantity(id, quantity),
      );
      return { previous };
    },
    onError: (_err, _variables, context) => {
      rollbackCart(queryClient, context?.previous);
      toast.error("Не удалось изменить количество");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });

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

  const products: any[] = (data as any)?.products ?? [];

  return (
    <section className="mx-auto max-w-[1240px] px-4 py-14 sm:px-6 lg:py-[72px]">
      <h2 className="text-center font-display text-[32px] uppercase leading-none tracking-tight text-black lg:text-[38px]">
        Рекомендуем
      </h2>

      <div className="mt-10 grid grid-cols-2 gap-4 sm:gap-5 lg:mt-14 lg:grid-cols-4">
        {products.map((item: any) => {
          const localItem = cart.find((el) => el.id === item._id);
          const serverItem: ServerCartItem | undefined =
            cartGet?.cart?.items?.find(
              (el: ServerCartItem) => el.product?._id === item._id,
            );

          const quantity = isLoggedIn
            ? (serverItem?.quantity ?? 0)
            : (localItem?.quantity ?? 0);

          // При +/- количество меняется оптимистично, спиннер там не нужен.
          // Он остаётся только на первом добавлении, когда корзины ещё нет.
          const isMutating =
            isLoggedIn &&
            pendingProductId === item._id &&
            addToServerMutation.isPending &&
            quantity === 0;

          const changeQuantity = (next: number) => {
            if (isLoggedIn) {
              updateToServerMutation.mutate({ id: item._id, quantity: next });
            } else if (next > quantity) {
              quantityPlus(item._id);
            } else {
              quantityMinus(item._id);
            }
          };

          const handleAddToCart = () => {
            if (isLoggedIn) {
              addToServerMutation.mutate({
                _id: item._id,
                name: item.name,
                price: item.price,
                image: item.image,
              });
            } else {
              addToLocalCart(item._id, 1, item.name, item.price, item.image);
            }

            toast.success("Товар добавлен в корзину");
          };

          return (
            <article key={item._id}>
              <div className="aspect-square overflow-hidden rounded-[20px] bg-[#F0EEED]">
                <Link href={`/product/${item._id}`}>
                  <img
                    src={item.image}
                    alt={item.name}
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

              {isMutating ? (
                <div className="mt-3 flex min-h-[48px] w-full items-center justify-center rounded-full bg-black lg:mt-4">
                  <Spinner className="size-5 text-white" />
                </div>
              ) : quantity > 0 ? (
                <div className="mt-3 flex min-h-[48px] w-full items-center justify-between rounded-full bg-black px-5 text-white lg:mt-4">
                  <button
                    type="button"
                    className="cursor-pointer px-2 text-lg leading-none"
                    onClick={() => changeQuantity(quantity - 1)}
                  >
                    -
                  </button>

                  <b>{quantity}</b>

                  <button
                    type="button"
                    className="cursor-pointer px-2 text-lg leading-none"
                    onClick={() => changeQuantity(quantity + 1)}
                  >
                    +
                  </button>
                </div>
              ) : (
                <button
                  onClick={handleAddToCart}
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
