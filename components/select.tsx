import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function ReusableSelect({
  options,
  placeholder,
  onChange,
  defaultValue,
}: {
  options: { name: string; _id: string }[];
  placeholder?: string;
  onChange: (value: string) => void;
  defaultValue?: string;
}) {
  const items = options.map((opt) => ({ value: opt._id, label: opt.name }));



  


  return (
    <Select
      onValueChange={(value: unknown) => onChange((value as string) ?? "")}
      items={items}
    >
      <SelectTrigger>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {options.map((opt) => (
            <SelectItem key={opt._id} value={opt._id}>
              {opt.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

export default ReusableSelect;
