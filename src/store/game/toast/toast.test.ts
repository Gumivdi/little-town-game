import { create } from "zustand";
import { describe, expect, it } from "vitest";
import { ERequestStatus } from "@/shared/enums/requestStatus.enum";
import { IToastSlice } from "./toast.types";
import { createToastSlice } from "./toast.slice";

const createTestStore = () =>
  create<IToastSlice>((...args) => ({
    ...createToastSlice(...args),
  }));

describe("ToastSlice", () => {
  describe("show()", () => {
    it("should show toast with given type and message", () => {
      const store = createTestStore();
      store.getState().show(ERequestStatus.SUCCESS, "Operation successful");
      const { type, message } = store.getState();
      expect(type).toBe(ERequestStatus.SUCCESS);
      expect(message).toBe("Operation successful");
    });
  });

  describe("hide()", () => {
    it("should hide toast and reset type and message", () => {
      const store = createTestStore();
      store.setState({
        type: ERequestStatus.ERROR,
        message: "Something went wrong",
      });
      store.getState().hide();
      const { type, message } = store.getState();
      expect(type).toBeUndefined();
      expect(message).toBe("");
    });
  });
});
