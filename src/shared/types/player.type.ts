import { EColors } from "@/shared/enums/colors.enum";
import { TResourcesAll } from "@/shared/types/resources.type";

export type TPlayer = {
  id: number;
  name: string;
  color: EColors;
  workers: number;
  buildings: number;
  resources: TResourcesAll;
};
