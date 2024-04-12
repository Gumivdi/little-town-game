import { TResourcesAll } from "./resources.type";

export type TPlayer = {
  id: number;
  name: string;
  workers: number;
  buildings: number;
  resources: TResourcesAll;
};
