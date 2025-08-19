"use client";

import { useIsMobile } from "@/hooks/use-mobile";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/client/ui/drawer";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/client/ui/dialog";

type DialogDrawerProps = {
  title: string;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  trigger: React.ReactNode;
  body: React.ReactNode;
};

function DialogDrawer({
  title,
  isOpen,
  onOpenChange,
  trigger,
  body,
}: DialogDrawerProps) {
  const isMobile = useIsMobile();

  if (isMobile)
    return (
      <Drawer open={isOpen} onOpenChange={onOpenChange}>
        <DrawerTrigger asChild>{trigger}</DrawerTrigger>
        <DrawerContent className="p-5">
          <DrawerHeader>
            <DrawerTitle>{title}</DrawerTitle>
          </DrawerHeader>
          {body}
        </DrawerContent>
      </Drawer>
    );
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="max-h-[calc(100vh-100px)] overflow-hidden grid grid-rows-[auto_1fr] gap-0 p-0 ">
        <DialogHeader className="px-5 py-5 shadow-xs shrink-0">
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        {body}
      </DialogContent>
    </Dialog>
  );
}

export { DialogDrawer };
