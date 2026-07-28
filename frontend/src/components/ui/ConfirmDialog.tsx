import { Modal } from "./Modal";

interface ConfirmDialogProps {
  isOpen: boolean;
  title: string;
  description: string;
  confirmText?: string;
  cancelText?: string;
  isPending?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export const ConfirmDialog = ({
  isOpen,
  title,
  description,
  confirmText = "Confirmar",
  cancelText = "Cancelar",
  isPending = false,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onCancel}>
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold text-text">{title}</h2>

          <p className="mt-2 text-sm text-gray-500">{description}</p>
        </div>

        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            disabled={isPending}
            className="rounded-lg border border-borda text-text px-4 py-2 transition hover:bg-gray-100"
          >
            {cancelText}
          </button>

          <button
            type="button"
            onClick={onConfirm}
            disabled={isPending}
            className="rounded-lg bg-red-600 px-4 py-2 text-white transition hover:bg-red-700 disabled:opacity-60"
          >
            {isPending ? "Removendo..." : confirmText}
          </button>
        </div>
      </div>
    </Modal>
  );
};
