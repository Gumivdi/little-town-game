import { useState } from "react";

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ModalExchange: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const [rangeValue, setRangeValue] = useState(0);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg w-1/3"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4 border-b">
          <h2 className="text-xl font-semibold text-black">Make an exchange</h2>
        </div>
        <div className="p-4 flex items-center justify-between">
          <div className="size-6 bg-gray-400"></div>
          <div className="flex-1 ml-4">
            <input
              type="range"
              min="0"
              max={3}
              value={rangeValue}
              onChange={(e) => setRangeValue(Number(e.target.value))}
              className="w-full"
            />
            <div className="text-center mt-2 text-black">{rangeValue}</div>
          </div>
        </div>
        <div className="flex">
          <button
            onClick={onClose}
            className="w-1/2 p-4 text-center bg-gray-300 hover:bg-gray-400 rounded-bl-lg"
          >
            Cancel
          </button>
          <button
            onClick={() => alert("Confirmed")}
            className="w-1/2 p-4 text-center bg-blue-500 hover:bg-blue-600 text-white rounded-br-lg"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalExchange;
