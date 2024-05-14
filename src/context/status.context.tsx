import { FC, ReactNode, createContext, useState } from "react";
import { EStatus } from "@/shared/enums/status.enum";

type TContext = {
  status: EStatus;
  setStatus: (status: EStatus) => void;
};

export const StatusContext = createContext<TContext>({
  status: EStatus.SELECT_ACTION,
  setStatus: () => {},
});

export const StatusProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [status, setStatus] = useState(EStatus.SELECT_ACTION);

  const context = {
    status,
    setStatus,
  };

  return (
    <StatusContext.Provider value={context}>{children}</StatusContext.Provider>
  );
};
