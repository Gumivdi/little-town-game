import { EBuildings } from "@/shared/enums/buildings.enum";
import { EStage } from "@/shared/enums/stage.enum";
import { TResourcesAll } from "./resources.type";

type TBuildingAction = {
  require?: Partial<TResourcesAll>;
  benefit?: Partial<TResourcesAll>;
};

export type TBuildingBase = {
  name: EBuildings;
  point: number;
  cost: Partial<TResourcesAll>;
  action?: TBuildingAction;
};

export type TBuildingSpecial = TBuildingBase & {
  special: {
    stage: EStage;
    score: (condition: number) => number | void;
  };
};

export type TBuilding = TBuildingBase | TBuildingSpecial;
