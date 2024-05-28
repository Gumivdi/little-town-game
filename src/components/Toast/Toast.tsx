import { FC, ReactNode } from "react";
import { ERequestStatus } from "@/shared/enums/requestStatus.enum";
import ToastError from "./ToastError";
import ToastWarning from "./ToastWarning";
import ToastSuccess from "./ToastSuccess";
import ToastCloseButton from "./ToastCloseButton";

type TProps = {
  type: ERequestStatus;
  message: string;
};

const Toast: FC<TProps> = ({ type, message }) => {
  const toastStatus: Record<ERequestStatus, () => ReactNode> = {
    error: ToastError,
    warning: ToastWarning,
    success: ToastSuccess,
  };
  const ToastStatusIcon = toastStatus[type];

  return (
    <div
      className="absolute bottom-6 left-0 right-0 mx-auto flex items-center w-full max-w-xs p-4 text-white bg-gray-800 rounded-lg shadow"
      role="alert"
    >
      <ToastStatusIcon />
      <div className="ms-3 text-sm font-normal">{message}</div>
      <ToastCloseButton />
    </div>
  );
};

export default Toast;
