// Reusable Confirmation Dialog Modal (Lectures 61–66)
import Modal from "./Modal";

export function ConfirmationDialog({
  isOpen,
  onClose,
  onConfirm,
  title = "Confirm Action",
  message = "Are you sure you want to proceed with this action?",
  confirmText = "Confirm",
  cancelText = "Cancel",
  isDanger = false,
  children = null
}) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      size="sm"
      footer={
        <>
          <button type="button" className="btn btn-outline" onClick={onClose}>
            {cancelText}
          </button>
          <button
            type="button"
            className={isDanger ? "btn btn-red" : "btn"}
            onClick={() => {
              onConfirm();
              onClose();
            }}
          >
            {confirmText}
          </button>
        </>
      }
    >
      <p style={{ color: "#607d8b", lineHeight: 1.6, fontSize: "0.95rem" }}>{message}</p>
      {children}
    </Modal>
  );
}

export default ConfirmationDialog;
