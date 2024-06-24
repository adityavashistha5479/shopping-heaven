import React from "react";

interface PopupProps {
  message: string;
  isVisible: boolean;
  onClose: () => void;
}

const Popup: React.FC<PopupProps> = ({ message, isVisible, onClose }) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        className="bg-gray-800 bg-opacity-50 absolute inset-0"
        onClick={onClose}
      ></div>
      <div className="dark:bg-gray-700 text-white p-8 rounded shadow-lg z-10">
        <p className="text-md">{message}</p>
      </div>
    </div>
  );
};

export default Popup;
