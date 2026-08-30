"use client";

import { Modal } from "@/components/modal";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { productService } from "@/services/product.service";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function Products() {
  const { data, error, isError, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: productService.getAll,
  });

  const queryClient = useQueryClient();

  const productdeleteMutation = useMutation({
    mutationFn: (id: string) => productService.deleteProduct(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
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

  // console.log(data);

  function choiceData(id: string) {
    productdeleteMutation.mutate(id);
  }

  console.log(data);

  return (
    <div className="rounded-2xl border border-border bg-card p-2 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3 px-3 py-3">
        <h1 className="text-base font-semibold tracking-tight">
          List of products
        </h1>
        <Link
          href="/admin/products/add"
          className="inline-flex h-10 items-center gap-2 rounded-xl bg-foreground px-4 text-sm font-medium text-background transition hover:opacity-90"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            className="h-4 w-4"
          >
            <path d="M12 5v14M5 12h14" />
          </svg>
          Add new
        </Link>
      </div>

      <div className="overflow-hidden rounded-xl border border-border">
        <Table>
          <TableHeader className="[&_tr]:border-b-0">
            <TableRow className="border-b border-border bg-muted/60 hover:bg-muted/60">
              <TableHead className="h-11 w-[80px] px-4 text-xs font-medium tracking-wide text-muted-foreground uppercase">
                Image
              </TableHead>
              <TableHead className="h-11 px-4 text-xs font-medium tracking-wide text-muted-foreground uppercase">
                Categorya
              </TableHead>
              <TableHead className="h-11 px-4 text-xs font-medium tracking-wide text-muted-foreground uppercase">
                Product name
              </TableHead>
              <TableHead className="h-11 px-4 text-xs font-medium tracking-wide text-muted-foreground uppercase">
                Description
              </TableHead>
              <TableHead className="h-11 px-4 text-xs font-medium tracking-wide text-muted-foreground uppercase">
                Price
              </TableHead>
              <TableHead className="h-11 px-4 text-right text-xs font-medium tracking-wide text-muted-foreground uppercase">
                Stock
              </TableHead>
              <TableHead className="h-11 w-[110px] px-4 text-xs font-medium tracking-wide text-muted-foreground uppercase">
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.products?.map((invoice) => (
              <TableRow
                key={invoice._id}
                className="border-b border-border last:border-b-0 hover:bg-muted/40"
              >
                <TableCell className="px-4 py-3">
                  <Image
                    src={invoice.image}
                    width={500}
                    height={500}
                    alt="Picture of the author"
                    className="h-10 w-10 rounded-lg border border-border object-cover"
                  />
                </TableCell>
                <TableCell className="px-4 py-3.5 text-sm text-muted-foreground">
                  {invoice.category.name}
                </TableCell>
                <TableCell className="px-4 py-3.5 text-sm font-medium">
                  {invoice.name}
                </TableCell>
                <TableCell className="max-w-[280px] truncate px-4 py-3.5 text-sm text-muted-foreground">
                  {invoice.description}
                </TableCell>
                <TableCell className="px-4 py-3.5 text-sm font-medium">
                  {invoice.price}
                </TableCell>
                <TableCell className="px-4 py-3.5 text-right text-sm text-muted-foreground">
                  {invoice.stock}
                </TableCell>
                <TableCell className="px-4 py-3.5">
                  <div className="flex items-center justify-end gap-2">
                    <Link
                      href={`/admin/products/update/${invoice._id}`}
                      title="Update"
                      className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-border text-muted-foreground transition hover:bg-muted hover:text-foreground"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-3.5 w-3.5"
                      >
                        <path d="M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z" />
                      </svg>
                    </Link>

                    <Modal
                      title="Точно удалить"
                      trigger={
                        <Button
                          variant="destructive"
                          title="Удалить"
                          className="h-8 w-8 cursor-pointer rounded-lg border border-transparent bg-red-50 p-0 text-red-600 shadow-none hover:bg-red-100 dark:bg-red-500/10 dark:text-red-400 dark:hover:bg-red-500/20"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-3.5 w-3.5"
                          >
                            <path d="M3 6h18M8 6V4h8v2M6 6l1 14h10l1-14M10 11v6M14 11v6" />
                          </svg>
                        </Button>
                      }
                    >
                      <Button
                        onClick={() => choiceData(invoice._id)}
                        className="h-10 cursor-pointer rounded-xl bg-red-600 px-4 text-sm font-medium text-white hover:bg-red-700"
                      >
                        Delete
                      </Button>
                    </Modal>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default Products;
