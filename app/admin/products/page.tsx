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
import React from "react";

function Products() {
  const { data, error, isError, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: orderService.getAll,
  });

  if (isLoading) return <div>Загрузка...</div>;
  if (isError) return <div>Ошибка загрузки</div>;

  console.log(data);

  return (
    <div>
      Products
      <Table>
        {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Image</TableHead>
            <TableHead className="w-[100px]">Categorya</TableHead>
            <TableHead>product Name</TableHead>
            <TableHead>Description</TableHead>
            <TableHead className="">Price</TableHead>
            <TableHead className="text-right">Stock</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((invoice) => (
            <TableRow key={invoice._id}>
              <TableCell className="font-medium">
                <Image
                  src={invoice.image}
                  width={500}
                  height={500}
                  alt="Picture of the author"
                />
              </TableCell>
              <TableCell className="font-medium">
                {invoice.category.name}
              </TableCell>
              <TableCell>{invoice.name}</TableCell>
              <TableCell>{invoice.description}</TableCell>
              <TableCell>{invoice.price}</TableCell>
              <TableCell className="text-right">{invoice.stock}</TableCell>
              <TableCell className="text-right">
                <Button className={"bg-red-700 cursor-pointer"}>Delete</Button>
                <Button className={"bg-amber-600 cursor-pointer"}>
                  Update
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            {/* <TableCell colSpan={3}>Total</TableCell>
            <TableCell className="text-right">$2,500.00</TableCell> */}
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
}

export default Products;
