import type { PropsWithChildren } from "react";
import { createPortal } from "react-dom";

type ModalProps = PropsWithChildren<{
  isOpen: boolean;
  onClose: () => void;
  maxWidth?: string;
}>;

export function Modal({
  isOpen,
  onClose,
  children,
  maxWidth = "max-w-2xl",
}: ModalProps) {
  if (!isOpen) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={onClose}
    >
      <div
        className={`w-full ${maxWidth} rounded-xl bg-white p-8 shadow-2xl`}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>,
    document.body,
  );
}
