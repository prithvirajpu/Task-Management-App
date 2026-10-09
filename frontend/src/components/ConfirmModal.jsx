function ConfirmModal({
    isOpen,
    title,
    message,
    onConfirm,
    onCancel,
}) {
    if (!isOpen) {
        return null;
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
            <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl">

                <h2 className="text-lg font-semibold text-slate-900">
                    {title}
                </h2>

                <p className="mt-2 text-sm text-slate-500">
                    {message}
                </p>

                <div className="mt-6 flex justify-end gap-3">

                    <button
                        onClick={onCancel}
                        className="rounded-xl bg-slate-100 px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-200"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={onConfirm}
                        className="rounded-xl bg-[#FF5232] px-4 py-2 text-sm font-medium text-white hover:bg-[#e04427]"
                    >
                        Confirm
                    </button>

                </div>
            </div>
        </div>
    );
}

export default ConfirmModal;