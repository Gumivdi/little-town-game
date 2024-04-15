import { TSetup } from "@/shared/types/setup.type";

const TWO_PLAYERS: TSetup = {
  workers: 5,
  buildings: 7,
  resources: {
    coin: 3,
  },
};

const THREE_PLAYERS: TSetup = {
  workers: 4,
  buildings: 6,
  resources: {
    coin: 3,
  },
};

const FOUR_PLAYERS: TSetup = {
  workers: 3,
  buildings: 6,
  resources: {
    coin: 3,
  },
};

export const DSetup = [TWO_PLAYERS, THREE_PLAYERS, FOUR_PLAYERS];
