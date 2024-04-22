import { TMainProps } from "./Building.type";

const BuildingMain: React.FC<TMainProps> = ({ building }) => {
  const { name } = building;

  return (
    <div className="justify-self-center text-center">
      <h3 className="text-black">{name}</h3>
    </div>
  );
};

export default BuildingMain;
