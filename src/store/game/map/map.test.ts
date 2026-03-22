import { create } from "zustand";
import { describe, it, expect } from "vitest";
import { DBuildings } from "@/data/buildings.data";
import { FORREST, GRASS, POND, ROCKS } from "@/data/fields.data";
import { TBuildArea } from "@/shared/types/map.type";
import { createMapSlice, IMapSlice } from ".";

const createTestStore = () =>
  create<IMapSlice>((...args) => ({
    ...createMapSlice(...args),
  }));

const F = FORREST;
const R = ROCKS;
const P = POND;
const G = GRASS;

describe("MapSlice", () => {
  describe("activateFreeGrass", () => {
    it("activate free grass fields", () => {
      const store = createTestStore();

      store.setState({
        map: [
          [
            { ...F, id: "0-0" },
            { ...G, id: "0-1" },
          ],
          [
            { ...G, id: "1-0", owner: 1, building: DBuildings[0] } as TBuildArea,
            { ...R, id: "1-1" },
          ]
        ],
      });

      store.getState().activateFreeGrass();
      const updated = store.getState().map;

      expect(updated[0][0].disabled).toBe(true);   // forrest
      expect(updated[0][1].disabled).toBe(false);  // grass
      expect(updated[1][0].disabled).toBe(true);   // owner
      expect(updated[1][1].disabled).toBe(true);   // rock
    });
  });

  describe("activateNeighboursForCollect", () => {
    it("activate neighbours for collect", () => {
      const store = createTestStore();

      store.setState({
        map: [
          [
            { ...G, id: "0-0" },
            { ...G, id: "0-1", owner: 1, building: DBuildings[0] } as TBuildArea,
          ],
          [
            { ...G, id: "1-0" },
            { ...F, id: "1-1" },
          ],
        ],
      });

      store.getState().activateNeighboursForCollect("0-0");
      const updated = store.getState().map;

      expect(updated[0][1].disabled).toBe(false); // building
      expect(updated[1][0].disabled).toBe(true);  // grass without building
      expect(updated[1][1].disabled).toBe(false); // forrest
    });
  });

  describe("cleanupWorkers", () => {
    it("remove workers from the map", () => {
      const store = createTestStore();

      store.setState({
        map: [
          [
            { ...G, id: "0-0", owner: 1 } as TBuildArea,
            { ...G, id: "0-1" },
          ],
          [
            { ...G, id: "1-0", owner: 2, building: DBuildings[0] } as TBuildArea,
            { ...P, id: "1-1" },
          ],
        ],
      });

      store.getState().cleanupWorkers();
      const updated = store.getState().map;

      expect((<TBuildArea>updated[0][0]).owner).toBeNull(); // owner should be removed
      expect((<TBuildArea>updated[0][1]).owner).toBeNull(); // empty grass
      expect((<TBuildArea>updated[1][0]).owner).toBe(2);    // building with owner
    });
  });

  describe("disableField", () => {
    it("set disabled to true for a specific field", () => {
      const store = createTestStore();

      store.setState({
        map: [
          [{ ...R, id: "0-0", disabled: false }],
        ],
      });

      store.getState().disableField("0-0");
      expect(store.getState().map[0][0].disabled).toBe(true);
    });
  });

  describe("disableFields", () => {
    it("disable all fields", () => {
      const store = createTestStore();

      store.setState({
        map: [
          [{ ...G, id: "0-0", disabled: false }],
          [{ ...R, id: "1-0", disabled: false }],
          [{ ...G, id: "1-0", owner: 2, building: DBuildings[0], disabled: false } as TBuildArea]
        ],
      });

      store.getState().disableFields();
      const updated = store.getState().map;

      expect(updated[0][0].disabled).toBe(true);
      expect(updated[1][0].disabled).toBe(true);
      expect(updated[2][0].disabled).toBe(true);
    });
  });

  describe("init", () => {
    it("sets id and disabled for each field", () => {
      const store = createTestStore();

      const map = [
        [{ ...G }],
        [{ ...R }],
      ];

      store.getState().init(map);
      const updated = store.getState().map;

      expect(updated[0][0].id).toBe("0-0-2-1");
      expect(updated[0][0].disabled).toBe(true);
      expect(updated[1][0].id).toBe("1-0-2-1");
    });
  });
});
