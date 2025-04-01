import { Dialog, DialogBackdrop, DialogPanel, Button } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/20/solid";
import { ReactNode } from "react";

interface ModalComponentProps {
  children?: ReactNode;
  open: boolean;
  onClose: () => void;
  modalWidth: string;
}

const ModalComponent = ({
  children,
  open,
  onClose,
  modalWidth,
}: ModalComponentProps) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      className="relative z-50 h-screen overflow-auto md:h-[600px]"
    >
      <DialogBackdrop className="fixed inset-0 bg-white md:bg-gray-900/90 transition-opacity" />

      <article className="flex items-end justify-center text-center sm:items-center sm:p-0 fixed md:top-12  inset-0 z-10 w-full overflow-y-auto h-full">
        <DialogPanel
          className={`relative transform overflow-hidden rounded-lg md:px-4 text-left transition-all sm:translate-y-0 sm:scale-95 h-full ${modalWidth === "1/3" ? `w-full md:w-1/3` : modalWidth === "1/6" ? `w-full md:w-3/6` : `w-full`}`}
        >
          <Button
            onClick={onClose}
            className="rounded-md pt-2 px-2 md:pt-2 text-sm font-medium focus:outline-none w-full flex justify-end md:mb-4"
            aria-label="Close modal"
          >
            <XMarkIcon className="h-6 w-6 md:fill-primary" />
          </Button>
          {children}
        </DialogPanel>
      </article>
    </Dialog>
  );
};

export default ModalComponent;
