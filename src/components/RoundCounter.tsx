import { FC, useContext } from "react";
import { StatusContext } from "@/context/status.context";

const RoundCounter: FC = () => {
  const { round } = useContext(StatusContext);
  const rounds = 4;

  return (
    <div className="text-right">
      <h3>Round</h3>
      <p>
        <span>{round}</span>/<span>{rounds}</span>
      </p>
    </div>
  );
};

export default RoundCounter;
