import { EColors } from "@/shared/enums/colors.enum";
import { TPlayer } from "@/shared/types/player.type";

export const DPlayers: TPlayer[] = [
  {
    id: 1,
    name: "Gimmy",
    color: EColors.RED,
    workers: 0,
    buildings: 0,
    resources: {
      stone: 0,
      wood: 0,
      wheat: 0,
      fish: 0,
      coin: 0,
      point: 0,
    },
  },
  {
    id: 2,
    name: "Kate",
    color: EColors.PURPLE,
    workers: 0,
    buildings: 0,
    resources: {
      stone: 0,
      wood: 0,
      wheat: 0,
      fish: 0,
      coin: 0,
      point: 0,
    },
  },
];
