import React from 'react';

interface ModalProps {
  message: string;
  onClose: () => void;
}

const AlertModal = ({ message, onClose }: ModalProps) => {
  return (
    <div
      className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center"
      role="presentation"
      onClick={onClose}
    >
      <div
        className="bg-white p-10 rounded-lg shadow-md text-center"
        role="presentation"
        onClick={(e) => e.stopPropagation()}
      >
        <p className="text-lg font-bold">{message}</p>
        <button
          type="button"
          onClick={onClose}
          className="mt-6 px-4 py-2 bg-primary text-white rounded"
        >
          닫기
        </button>
      </div>
    </div>
  );
};

export default AlertModal;
