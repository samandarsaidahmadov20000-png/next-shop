"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { categoryService } from "@/services/category.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useForm } from "react-hook-form";

function CategoryUpdate() {
  const { id } = useParams();

  const queryClient = useQueryClient();
  const { register, handleSubmit, reset } = useForm();

  const categoryUpdateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) =>
      categoryService.categoryUpdate(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categorya"] });
      reset();
    },
  });

  function submitUpdateCategory(data: any) {
    // console.log(data);
    categoryUpdateMutation.mutate({ id: id as string, data });
  }



  return (
    <div>
      CategoryUpdate
      <form onSubmit={handleSubmit(submitUpdateCategory)}>
        <Input {...register("name")} placeholder="name" />
        <Input {...register("description")} placeholder="description" />
        <Button type="submit">save</Button>
      </form>
    </div>
  );
}

export default CategoryUpdate;
