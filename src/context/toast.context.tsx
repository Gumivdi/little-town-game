import { FC, ReactNode, createContext, useEffect, useState } from "react";
import { ERequestStatus } from "@/shared/enums/requestStatus.enum";

type TContext = {
  type?: ERequestStatus;
  message: string;
  showToast: (type: ERequestStatus, message: string) => void;
  hideToast: () => void;
};

export const ToastContext = createContext<TContext>({
  type: undefined,
  message: "",
  showToast: () => {},
  hideToast: () => {},
});

export const ToastProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [type, setType] = useState<ERequestStatus | undefined>(undefined);
  const [message, setMessage] = useState("");
  const [timeoutId, setTimeoutId] = useState<number | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutId) {
        window.clearTimeout(timeoutId);
      }
    };
  }, [timeoutId]);

  const showToast = (toastType: ERequestStatus, toastMessage: string) => {
    const toastTimer = 5000;
    const timeout = window.setTimeout(() => {
      hideToast();
    }, toastTimer);

    setTimeoutId(timeout);
    setType(toastType);
    setMessage(toastMessage);
  };

  const hideToast = () => {
    setType(undefined);
    setMessage("");
  };

  const context = {
    type,
    message,
    showToast,
    hideToast,
  };

  return (
    <ToastContext.Provider value={context}>{children}</ToastContext.Provider>
  );
};
