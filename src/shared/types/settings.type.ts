import { TResourcesOnly } from "./resources.type";

export type TSettings = {
  rounds: number;
  opponentBuildingFee: Partial<TResourcesOnly>;
};
