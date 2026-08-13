"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { categoryService } from "@/services/category.service";

function CategoryAdd() {
  const { register, handleSubmit, watch,reset } = useForm();

  const queryClient = useQueryClient();

  const categoryCreateMutation = useMutation({
    mutationFn: (data) => categoryService.categoryCreate(data),
    onSuccess: () => {
        queryClient.invalidateQueries({queryKey: ["categorya"]})
    }
  });

  function submitCategoryCreate(data: any) {


    categoryCreateMutation.mutate(data);
    
    console.log(data);
    
    reset()
  }

  return (
    <div>
      CategoryAdd
      <form onSubmit={handleSubmit(submitCategoryCreate)}>
        <Input {...register("name")} placeholder="name" />
        <Input {...register("description")} placeholder="description" />
        <Button type="submit">Add</Button>
      </form>
    </div>
  );
}

export default CategoryAdd;
