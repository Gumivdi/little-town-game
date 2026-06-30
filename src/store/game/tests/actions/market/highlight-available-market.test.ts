import { expect, it } from "vitest";
import { DPlayers } from "@/data/players.data";
import { EBuildings } from "@/shared/enums/buildings.enum";
import { createGameTestStore } from "@/store/game/tests/setup/create-game-test-store";

const generateMarket = () => [
  {
    name: EBuildings.WHEAT_FIELD,
    quantity: 5,
    point: 3,
    cost: {
      wood: 1,
    },
  },
  {
    name: EBuildings.BARN,
    quantity: 1,
    point: 6,
    cost: {
      wood: 4,
    },
  },
  {
    name: EBuildings.FISHERMAN,
    quantity: 1,
    point: 4,
    cost: {
      wood: 1,
      stone: 1,
    },
  },
];

const generatePlayers = () =>
  DPlayers.map((player, index) =>
    index === 0
      ? { ...player, resources: { ...player.resources, stone: 1, wood: 1 } }
      : player,
  );

it("should return names of buildings that player can afford to build", () => {
  const store = createGameTestStore();

  store.setState({
    market: generateMarket(),
    players: generatePlayers(),
  });

  store.getState().highlightAvailableMarket();

  expect(store.getState().availableMarket).toEqual([
    EBuildings.WHEAT_FIELD,
    EBuildings.FISHERMAN,
  ]);
});
