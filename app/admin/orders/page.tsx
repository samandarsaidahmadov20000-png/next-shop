"use client";

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
import { orderService } from "@/services/order.service";

import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import React, { useState } from "react";
import OrderStatusSelect from "./_components/order-status-select";
import Link from "next/link";

function Orders() {
  

  
  const { data, error, isError, isLoading } = useQuery({
    queryKey: ["orders"],
    queryFn: orderService.getAll,
  });


  
  
  // console.log(data?.order);
  



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

  // console.log(data.order[0].items[0]);

  const statusStyles: Record<string, string> = {
    pending:
      "bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400",
    paid: "bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400",
    shipped:
      "bg-indigo-50 text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-400",
    delivered:
      "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400",
  };

  return (
    <div className="rounded-2xl border border-border bg-card p-2 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3 px-3 py-3">
        <h1 className="text-base font-semibold tracking-tight">
          List of orders
        </h1>
      </div>

      <div className="overflow-hidden rounded-xl border border-border">
        <Table>
          <TableHeader className="[&_tr]:border-b-0">
            <TableRow className="border-b border-border bg-muted/60 hover:bg-muted/60">
              <TableHead className="h-11 px-4 text-xs font-medium tracking-wide text-muted-foreground uppercase">
                Order ID
              </TableHead>
              <TableHead className="h-11 px-4 text-xs font-medium tracking-wide text-muted-foreground uppercase">
                Total
              </TableHead>
              <TableHead className="h-11 px-4 text-xs font-medium tracking-wide text-muted-foreground uppercase">
                Status
              </TableHead>
              <TableHead className="h-11 px-4 text-xs font-medium tracking-wide text-muted-foreground uppercase">
                Length
              </TableHead>
              <TableHead className="h-11 px-4 text-right text-xs font-medium tracking-wide text-muted-foreground uppercase">
                Change status
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.order.map(function (orders, index) {
              return (
                <TableRow
                  key={orders?._id}
                  className="border-b border-border last:border-b-0 hover:bg-muted/40"
                >
                  <TableCell className="px-4 py-3.5 font-mono text-xs text-muted-foreground">
                    {orders?._id}
                  </TableCell>
                  <TableCell className="px-4 py-3.5 text-sm font-medium">
                    {orders?.totalPrice}
                  </TableCell>
                  <TableCell className="px-4 py-3.5">
                    <span
                      className={`inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium ${
                        statusStyles[orders?.status] ??
                        "bg-muted text-muted-foreground"
                      }`}
                    >
                      {orders?.status}
                    </span>
                  </TableCell>
                  <TableCell className="px-4 py-3.5 text-sm text-muted-foreground">
                    {orders?.items.length}
                  </TableCell>
                  <TableCell className="px-4 py-3.5">
                    <div className="flex justify-end">
                      <OrderStatusSelect
                        status={orders?.status}
                        orderId={orders?._id}
                      />
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
          <TableFooter className="bg-transparent">
            <TableRow className="border-0 hover:bg-transparent">
              {/* <TableCell colSpan={3}>Total</TableCell>
            <TableCell className="text-right">$2,500.00</TableCell> */}
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </div>
  );
}

export default Orders;
