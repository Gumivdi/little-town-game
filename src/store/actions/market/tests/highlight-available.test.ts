import { expect, it } from "vitest";
import { useGameStore } from "@/store/game";
import { DPlayers } from "@/data/players.data";
import { EBuildings } from "@/shared/enums/buildings.enum";
import { highlightAvailableMarket } from "..";

it("should return names of buildings that player can afford to build", () => {
  const { setMarket, setPlayers, setPlayerResources } = useGameStore.getState();

  setPlayers(DPlayers);

  setPlayerResources(1, {
    wood: 1,
    stone: 1,
  });

  setMarket([
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
  ]);

  highlightAvailableMarket();

  expect(useGameStore.getState().availableMarket).toEqual([
    EBuildings.WHEAT_FIELD,
    EBuildings.FISHERMAN,
  ]);
});
