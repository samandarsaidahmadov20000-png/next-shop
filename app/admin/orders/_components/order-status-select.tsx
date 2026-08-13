"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { orderService } from "@/services/order.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";

function OrderStatusSelect({ orderId, status }: { orderId: string, status: string }) {
  const queryClient = useQueryClient();
  

  
  const statusUpadetMutation = useMutation({
    mutationFn: (status: string) => orderService.orderStatusUpadete(orderId, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });

  function selectStatus(value: any) {
    statusUpadetMutation.mutate(value);
  }

  return (
    <Select onValueChange={selectStatus} defaultValue={status}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="change status" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value={"pending"}>pending</SelectItem>
          <SelectItem value={"paid"}>paid</SelectItem>
          <SelectItem value={"shipped"}>shipped</SelectItem>
          <SelectItem value={"delivered"}>delivered</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

export default OrderStatusSelect;
