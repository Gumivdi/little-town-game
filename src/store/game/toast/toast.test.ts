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
  describe("showToast()", () => {
    it("should show toast with given type and message", () => {
      const store = createTestStore();
      store
        .getState()
        .showToast(ERequestStatus.SUCCESS, "Operation successful");
      const { toastType, toastMessage } = store.getState();
      expect(toastType).toBe(ERequestStatus.SUCCESS);
      expect(toastMessage).toBe("Operation successful");
    });
  });

  describe("hideToast()", () => {
    it("should hide toast and reset type and message", () => {
      const store = createTestStore();
      store.setState({
        toastType: ERequestStatus.ERROR,
        toastMessage: "Something went wrong",
      });
      store.getState().hideToast();
      const { toastType, toastMessage } = store.getState();
      expect(toastType).toBeUndefined();
      expect(toastMessage).toBe("");
    });
  });
});
