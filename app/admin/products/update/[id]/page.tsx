"use client";

import React from "react";
import { useParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { categoryService } from "@/services/category.service";
import { Controller, useForm } from "react-hook-form";
import ReusableSelect from "@/components/select";
import { Button } from "@/components/ui/button";
import { productService } from "@/services/product.service";
import Link from "next/link";

function ProductUpdate() {
  const { id } = useParams();

  const { data, error, isError, isLoading } = useQuery({
    queryKey: ["categorya"],
    queryFn: categoryService.getAll,
  });
  const queryClient = useQueryClient();
  const { control, register, handleSubmit, reset } = useForm();

  const productUpdateMutation = useMutation({
    mutationFn: ({ id, formData }: { id: string; formData: any }) =>
      productService.productUpdate(id, formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      reset();
    },
  });

  function submitCreateProduct(data: any) {
    const formData = new FormData();

    formData.append("name", data.productName);
    formData.append("description", data.description);
    formData.append("price", data.price);
    formData.append("stock", data.stock);
    formData.append("category", data.category);
    formData.append("image", data.image[0]);

    productUpdateMutation.mutate({ id: id as string, formData });

    console.log(formData);
  }

  if (isLoading) return <div>Загрузка...</div>;
  if (isError) return <div>Ошибка загрузки</div>;

  return (
    <div>
      <Link href="/admin/products">back</Link>
      <form onSubmit={handleSubmit(submitCreateProduct)}>
        <Input {...register("productName")} placeholder="Productname" />
        <Input {...register("description")} placeholder="description" />
        <Input {...register("price")} placeholder="price" />
        <Input {...register("stock")} placeholder="stock" />
        <Controller
          name="category"
          control={control}
          render={({ field }) => (
            <ReusableSelect
              options={data.categories}
              onChange={field.onChange}
              placeholder="Выберите категорию"
            />
          )}
        />
        <Input type="file" {...register("image")} />
        <Button type="submit">add</Button>
      </form>
      ProductUpdate
    </div>
  );
}

export default ProductUpdate;
