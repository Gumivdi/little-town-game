import { useContext } from "react";
import { EStatus } from "@/shared/enums/status.enum";
import { StatusContext } from "@/context/status.context";
import { MapContext } from "@/context/map.context";

const PlayerActions = () => {
  const { setStatus } = useContext(StatusContext);
  const { activateMapFields } = useContext(MapContext);

  const sendWorkerHandler = () => {
    setStatus(EStatus.SEND_WORKER);
    activateMapFields(EStatus.SEND_WORKER);
  };

  return (
    <>
      <button className="bg-black p-3 shrink-0" onClick={sendWorkerHandler}>
        Send worker
      </button>
      <button className="bg-black p-3 shrink-0">Build</button>
    </>
  );
};

export default PlayerActions;
