import { useContext } from "react";
import { ToastContext } from "@/context/toast.context";

const ToastCloseButton = () => {
  const { hideToast } = useContext(ToastContext);

  return (
    <button
      type="button"
      className="ms-auto -mx-1.5 -my-1.5 text-gray-400  rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5  inline-flex items-center justify-center h-8 w-8  hover:text-white bg-gray-800 hover:bg-gray-700"
      data-dismiss-target="#toast-default"
      aria-label="Close"
      onClick={hideToast}
    >
      <span className="sr-only">Close</span>
      <svg
        className="w-3 h-3"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 14 14"
      >
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
        />
      </svg>
    </button>
  );
};

export default ToastCloseButton;
