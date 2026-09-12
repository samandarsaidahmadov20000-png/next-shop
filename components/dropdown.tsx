import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type DropdownItem = {
  name: string;
  onClick?: () => void;
  disabled?: boolean;
};

type CustomDropdownProps = {
  trigger: React.ReactElement;
  items: DropdownItem[];
};

function CustomDropdown({ trigger, items }: CustomDropdownProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger render={trigger} />

      <DropdownMenuContent
        sideOffset={10}
        className="w-[600px] max-w-[calc(100vw-32px)] rounded-[20px] border border-black/10 bg-white p-4 shadow-[0_24px_60px_-15px_rgba(0,0,0,0.25)] ring-0"
      >
        <div className="flex items-center justify-between border-b border-black/10 px-1 pb-3">
          <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-black/40">
            Категории
          </p>
          <p className="text-[11px] font-medium text-black/40">
            {items?.length ?? 0}
          </p>
        </div>

        <div className="mt-2 grid max-h-[340px] grid-cols-2 gap-x-2 gap-y-0.5 overflow-y-auto pr-1 sm:grid-cols-3">
          {items?.map((item, index) => (
            <DropdownMenuItem
              key={index}
              onClick={item.onClick}
              disabled={item.disabled}
              className="group cursor-pointer rounded-xl px-3 py-2.5 text-[15px] font-medium text-black transition-colors focus:bg-[#F0F0F0] focus:text-black data-disabled:opacity-40"
            >
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-black/20 transition-colors group-focus:bg-black" />
              <span className="truncate">{item?.name}</span>
              <svg
                className="ml-auto h-4 w-4 shrink-0 -translate-x-1 text-black/40 opacity-0 transition-all group-focus:translate-x-0 group-focus:opacity-100"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m9 18 6-6-6-6" />
              </svg>
            </DropdownMenuItem>
          ))}
        </div>

        {!items?.length && (
          <p className="px-3 py-10 text-center text-sm text-black/40">
            Категории не найдены
          </p>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default CustomDropdown;
