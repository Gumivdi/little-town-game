import { TCompoundComponents, TProps } from "./Building.type";
import BuildingHeader from "./BuildingHeader";
import BuildingMain from "./BuildingMain";
import BuildingFooter from "./BuildingFooter";

const Building: React.FC<TProps> & TCompoundComponents = ({ children }) => (
  <div className="bg-gray-300 flex flex-col items-center justify-between gap-4 p-2">
    {children}
  </div>
);

Building.Header = BuildingHeader;
Building.Main = BuildingMain;
Building.Footer = BuildingFooter;

export default Building;
