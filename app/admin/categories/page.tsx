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
import { categoryService } from "@/services/category.service";

import { useQuery } from "@tanstack/react-query";

function Categories() {
  const { data, error, isError, isLoading } = useQuery({
    queryKey: ["categorya"],
    queryFn: categoryService.getAll,
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
            <TableHead className="w-[100px]">Categorya</TableHead>

            <TableHead>Description</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.categories.map((invoice) => (
            <TableRow key={invoice._id}>
              <TableCell className="font-medium">{invoice.name}</TableCell>

              <TableCell>{invoice.description}</TableCell>

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

export default Categories;
