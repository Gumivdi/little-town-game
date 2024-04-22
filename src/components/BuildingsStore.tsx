import { DBuildings, DSpecialBuildings } from "@/data/buildings.data";
import Building from "@/components/Building/Building";

const BuildingsStore = () => {
  const basicBuildings = DBuildings.filter(
    (item) => !DSpecialBuildings.includes(item.name)
  );

  return basicBuildings.map((building) => {
    const { name } = building;
    const nameKey = name.replace(" ", "_").concat("-store");
    const costKey = nameKey.concat("-cost");

    return (
      <Building key={nameKey}>
        <Building.Header building={building} costKey={costKey} />
        <Building.Main building={building} />
        <Building.Footer building={building} nameKey={nameKey} />
      </Building>
    );
  });
};

export default BuildingsStore;
