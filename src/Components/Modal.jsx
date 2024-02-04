import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import { createPortal } from "react-dom";

const Modal = ({ onClose, isOpen, children }) => {
  return createPortal(
    <>
      {isOpen && (
        <div className="grid place-items-center backdrop-blur h-screen w-screen absolute z-40 top-0">
          <div className="m-auto z-50 relative min-h-[200px] max-w-[100%] bg-white p-4">
            <div className="flex justify-end">
              <AiOutlineClose onClick={onClose} className="text-2xl self-end" />
            </div>
            {children}
          </div>
        </div>
      )}
    </>,
    document.getElementById("modal-root")
  );
};

export default Modal;
