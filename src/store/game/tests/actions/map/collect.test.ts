import { describe, expect, it } from "vitest";
import { FORREST, POND, ROCKS } from "@/data/fields.data";
import { DPlayers } from "@/data/players.data";
import { EBuildings } from "@/shared/enums/buildings.enum";
import { getBuilding } from "@/shared/helpers/buildings/get-building";
import { TMap } from "@/shared/types/map.type";
import { createBuildArea } from "@/store/game/tests/slices/map/setup/create-build-area";
import { ERequestStatus } from "@/shared/enums/requestStatus.enum";
import { createGameTestStore } from "@/store/game/tests/setup/create-game-test-store";
import { isBuildArea } from "@/store/game/slices/map/map.guards";

describe("collect()", () => {
  const generateMap: () => TMap = () => [
    [
      createBuildArea({ id: "0-0-3-3", disabled: true }),
      createBuildArea({
        id: "0-1-3-3",
        owner: 1,
        building: getBuilding(EBuildings.QUARRY),
        disabled: false,
      }),
      createBuildArea({
        id: "0-2-3-3",
        owner: 2,
        building: getBuilding(EBuildings.STATUE),
        disabled: true,
      }),
    ],
    [
      { ...FORREST, id: "1-0-3-3", disabled: false },
      createBuildArea({ id: "1-1-3-3", disabled: true }),
      { ...ROCKS, id: "1-2-3-3", disabled: false },
    ],
    [
      createBuildArea({
        id: "2-0-3-3",
        owner: 2,
        building: getBuilding(EBuildings.WHEAT_FIELD),
        disabled: false,
      }),
      createBuildArea({ id: "2-1-3-3", owner: 2, disabled: true }),
      { ...POND, id: "2-2-3-3", disabled: false },
    ],
  ];

  it("Collect a resource", () => {
    const store = createGameTestStore();
    const fieldId = "1-0-3-3";

    store.getState().setPlayers(DPlayers);
    store.getState().setMap(generateMap());
    store.getState().collect(fieldId);

    const state = store.getState();
    expect(state.supplies.wood).toBe(14);
    expect(state.getCurrentPlayer().resources.wood).toBe(1);
    expect(state.getFieldById(fieldId)?.disabled).toBe(true);
    expect(state.toastType).toBe(ERequestStatus.SUCCESS);
  });

  it("Collect a resource without enough supplices in pole", () => {
    const store = createGameTestStore();
    const fieldId = "1-0-3-3";

    store.getState().setPlayers(DPlayers);
    store.getState().setMap(generateMap());
    store.getState().removeFromSupply({ wood: 15 });
    store.getState().collect(fieldId);

    const state = store.getState();
    expect(state.supplies.wood).toBe(0);
    expect(state.getCurrentPlayer().resources.wood).toBe(0);
    expect(state.getFieldById(fieldId)?.disabled).toBe(false);
    expect(state.toastType).toBe(ERequestStatus.ERROR);
  });

  it("Use own QARRY building", () => {
    const store = createGameTestStore();
    const fieldId = "0-1-3-3";

    store.getState().setPlayers(DPlayers);
    store.getState().setMap(generateMap());
    store
      .getState()
      .setPlayerResources(store.getState().getCurrentPlayer().id, { coin: 3 });
    store.getState().collect(fieldId);

    const state = store.getState();
    expect(state.supplies.stone).toBe(13);
    expect(state.getCurrentPlayer().resources.coin).toBe(1);
    expect(state.getFieldById(fieldId)?.disabled).toBe(true);
    expect(state.toastType).toBe(ERequestStatus.SUCCESS);
  });

  it("Use own QARRY building without enough supplices in pole", () => {
    const store = createGameTestStore();
    const fieldId = "0-1-3-3";

    store.getState().setPlayers(DPlayers);
    store.getState().setMap(generateMap());
    store
      .getState()
      .setPlayerResources(store.getState().getCurrentPlayer().id, {
        coin: 3,
      });
    store.getState().removeFromSupply({ stone: 14 });
    store.getState().collect(fieldId);

    const state = store.getState();
    expect(state.supplies.stone).toBe(0);
    expect(state.getCurrentPlayer().resources.coin).toBe(1);
    expect(state.getCurrentPlayer().resources.stone).toBe(1);
    expect(state.getFieldById(fieldId)?.disabled).toBe(true);
    expect(state.toastType).toBe(ERequestStatus.SUCCESS);
  });

  it("Use opponent WHEAT_FIELD building", () => {
    const store = createGameTestStore();
    const fieldId = "2-0-3-3";

    store.getState().setPlayers(DPlayers);
    store.getState().setMap(generateMap());

    const field = store.getState().getFieldById(fieldId);
    if (!field || !isBuildArea(field) || field.owner === null) {
      throw new Error("Wrong field to test");
    }

    store
      .getState()
      .setPlayerResources(store.getState().getCurrentPlayer().id, { coin: 1 });
    store.getState().collect(fieldId);

    const state = store.getState();
    expect(state.supplies.wheat).toBe(14);
    expect(state.getCurrentPlayer().resources.coin).toBe(0);
    expect(state.getCurrentPlayer().resources.wheat).toBe(1);
    expect(state.getPlayer(field.owner).resources.coin).toBe(1);
    expect(state.getFieldById(fieldId)?.disabled).toBe(true);
    expect(state.toastType).toBe(ERequestStatus.SUCCESS);
  });

  it("Use opponent building without possibility to pay the fee", () => {
    const store = createGameTestStore();
    const fieldId = "2-0-3-3";

    store.getState().setPlayers(DPlayers);
    store.getState().setMap(generateMap());
    store.getState().collect(fieldId);

    const state = store.getState();
    expect(state.getFieldById(fieldId)?.disabled).toBe(false);
    expect(state.toastType).toBe(ERequestStatus.ERROR);
  });
});
