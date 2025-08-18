"use client"

import { Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { BadToast, GoodToast } from "./toasts";
import { DialogDrawer } from "@/components/admin/shared/dialog-drawer";
import { useState } from "react";

function Delete({
  onDelete,
  successMessage,
  failMessage
}: {
  onDelete: () => Promise<void> | void;
  successMessage: string;
  failMessage: string
}) {
  const [open, setOpen] = useState<boolean>(false);

  async function handleClick() {
    try {
      await onDelete();
      toast(
        <GoodToast text={successMessage} />,
        { position: "top-center" }
      );
    } catch {
      toast(
        <BadToast text={failMessage} />,
        { position: "top-center" }
      );
    }
  }

  return (
    <DialogDrawer
      isOpen={open}
      onOpenChange={(open) => setOpen(open)}
      trigger={
        <Button
          size="icon"
          className="w-7 h-7 rounded-full"
          variant="destructive"
        >
          <Trash2 />
        </Button>
      }
      title={"Are you sure you want to delete?"}
      body={
        <div className="flex gap-2 w-full mx-auto py-3 px-5">
          <Button
            onClick={() => setOpen(false)}
            variant={"outline"}
             className="w-1/2"
            >
              Cancel
            </Button>
          <Button
            onClick={handleClick}
            variant={"destructive"}
            className="w-1/2"
          >
            Delete
          </Button>
        </div>
      }
    />
  );
};

export { Delete };
