import { FC, ReactNode, createContext, useState } from "react";
import { EStatus } from "@/shared/enums/status.enum";

type TContext = {
  status: EStatus;
  round: number;
  setStatus: (status: EStatus) => void;
  setRound: (num: number) => void;
};

export const StatusContext = createContext<TContext>({
  status: EStatus.SELECT_ACTION,
  round: 1,
  setStatus: () => {},
  setRound: () => {},
});

export const StatusProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [status, setStatus] = useState(EStatus.SELECT_ACTION);
  const [round, setRound] = useState(1);

  const context = {
    status,
    round,
    setStatus,
    setRound,
  };

  return (
    <StatusContext.Provider value={context}>{children}</StatusContext.Provider>
  );
};
