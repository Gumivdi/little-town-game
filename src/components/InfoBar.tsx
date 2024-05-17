import { FC, ReactNode, useContext } from "react";
import { StatusContext } from "@/context/status.context";
import { EStatus } from "@/shared/enums/status.enum";

const InfoBar: FC<{ children?: ReactNode }> = ({ children }) => {
  const { status } = useContext(StatusContext);

  const messages = {
    [EStatus.BUILD]: "Place the building in a free grass area",
    [EStatus.COLLECT]: "Collect resources and use available buildings",
    [EStatus.SELECT_ACTION]: 'Select action "Send worker" or "Build"',
    [EStatus.SELECT_BUILDING]: "Select the building which you want to build",
    [EStatus.SEND_WORKER]: "Place the worker in a free grass area",
  };

  return (
    <section className="w-full absolute top-0 bg-black/60 text-white p-3 flex gap-2 justify-between items-center z-10">
      <p className="text-center w-full">{messages[status]}</p>
      {children}
    </section>
  );
};

export default InfoBar;
