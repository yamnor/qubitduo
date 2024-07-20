import React from 'react';

const Modal = ({ onClose, children }: { onClose: () => void; children: React.ReactNode }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
    <div className="bg-white rounded-lg p-4 max-w-md w-full relative">
      <button
        className="absolute top-0 right-0 p-2"
        onClick={onClose}
      >
        ✖
      </button>
      {children}
    </div>
  </div>
);

export default Modal;
