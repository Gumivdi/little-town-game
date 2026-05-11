import { create } from "zustand";
import { describe, it, expect } from "vitest";
import { ROCKS } from "@/data/fields.data";
import { TBuildArea } from "@/shared/types/map.type";
import { createBuildArea } from "@/store/tests/factories/map/createBuildArea";
import { createMapSlice, IMapSlice } from ".";

const createTestStore = () =>
  create<IMapSlice>((...args) => ({
    ...createMapSlice(...args),
  }));

const R = ROCKS;

describe("MapSlice", () => {
  describe("disableField()", () => {
    it("set disabled to true for a specific field", () => {
      const store = createTestStore();

      store.setState({
        map: [[{ ...R, id: "0-0", disabled: false }]],
      });

      store.getState().disableField("0-0");
      expect(store.getState().map[0][0].disabled).toBe(true);
    });
  });

  describe("enableField()", () => {
    it("set disabled to false for a specific field", () => {
      const store = createTestStore();

      store.setState({
        map: [[{ ...R, id: "0-0", disabled: true }]],
      });

      store.getState().enableField("0-0");
      expect(store.getState().map[0][0].disabled).toBe(false);
    });
  });

  describe("setFieldOwner()", () => {
    it("set owner for a specific field", () => {
      const store = createTestStore();

      store.setState({
        map: [[createBuildArea({ id: "0-0" })]],
      });

      store.getState().setFieldOwner("0-0", 1);
      expect((store.getState().map[0][0] as TBuildArea).owner).toBe(1);
    });
  });
});
