// File: components/Modal.jsx
import React from 'react';

function Modal({ isOpen, closeModal, children }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-4 w-2/3 max-w-3xl">
        <button onClick={closeModal} className="absolute top-2 right-2 text-gray-500">
          close
        </button>
        <div>{children}</div>
      </div>
    </div>
  );
}

export default Modal;
