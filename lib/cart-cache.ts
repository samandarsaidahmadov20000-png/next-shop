import type { QueryClient } from "@tanstack/react-query";

export const CART_QUERY_KEY = ["cart"];

export type ServerCartProduct = {
  _id: string;
  name: string;
  price: number;
  image: string;
};

export type ServerCartItem = {
  product: ServerCartProduct;
  quantity: number;
};

export type ServerCart = {
  cart?: { items: ServerCartItem[] } | null;
  totalCount?: number;
  totalSum?: number;
};

type ItemsPatch = (items: ServerCartItem[]) => ServerCartItem[];

// Сразу правим кэш ["cart"], чтобы количество менялось без ожидания ответа
// сервера. Возвращает снимок для отката в onError.
export async function applyCartPatch(
  queryClient: QueryClient,
  patch: ItemsPatch,
): Promise<ServerCart | undefined> {
  await queryClient.cancelQueries({ queryKey: CART_QUERY_KEY });

  const previous = queryClient.getQueryData<ServerCart>(CART_QUERY_KEY);

  queryClient.setQueryData<ServerCart>(CART_QUERY_KEY, (old) => {
    if (!old?.cart?.items) return old;

    const items = patch(old.cart.items).filter((item) => item.quantity > 0);

    let totalCount = 0;
    let totalSum = 0;
    for (const item of items) {
      totalCount += item.quantity;
      totalSum += (item.product?.price ?? 0) * item.quantity;
    }

    return { ...old, cart: { ...old.cart, items }, totalCount, totalSum };
  });

  return previous;
}

export function rollbackCart(
  queryClient: QueryClient,
  previous: ServerCart | undefined,
) {
  if (previous !== undefined) {
    queryClient.setQueryData(CART_QUERY_KEY, previous);
  }
}

export const setItemQuantity =
  (productId: string, quantity: number): ItemsPatch =>
  (items) =>
    items.map((item) =>
      item.product?._id === productId ? { ...item, quantity } : item,
    );

export const addItemToCart =
  (product: ServerCartProduct, quantity = 1): ItemsPatch =>
  (items) => {
    const existing = items.find((item) => item.product?._id === product._id);

    if (existing) {
      return items.map((item) =>
        item.product?._id === product._id
          ? { ...item, quantity: item.quantity + quantity }
          : item,
      );
    }

    return [...items, { product, quantity }];
  };

export const removeItemFromCart =
  (productId: string): ItemsPatch =>
  (items) =>
    items.filter((item) => item.product?._id !== productId);
