import { expect, it } from "vitest";
import { ERequestStatus } from "@/shared/enums/requestStatus.enum";
import { createGameTestStore } from "../../setup/create-game-test-store";

it("showToast()", () => {
  const store = createGameTestStore();

  store.getState().showToast(ERequestStatus.SUCCESS, "Operation successful");

  expect(store.getState().toastType).toBe(ERequestStatus.SUCCESS);
  expect(store.getState().toastMessage).toBe("Operation successful");
});
