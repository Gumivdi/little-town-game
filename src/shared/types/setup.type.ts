import { TResourcesAll } from "./resources.type";

export type TSetup = {
  workers: number;
  buildings: number;
  resources: Partial<TResourcesAll>;
};
