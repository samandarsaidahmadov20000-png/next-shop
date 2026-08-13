import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";

export function Modal({
  trigger,
  title,
  description,
  children,
}: {
  trigger?: React.ReactElement;
  title?: string;
  description?: string;
  children?: React.ReactNode;
}) {
  return (
    <Dialog>
      <DialogTrigger render={trigger} />
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>

        <div className="flex">
          <DialogClose render={<Button variant="outline">Cancel</Button>} />
          {/* <Button>confirm</Button> */}
          {children}
        </div>
      </DialogContent>
    </Dialog>
  );
}
