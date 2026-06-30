import { expect, it } from "vitest";
import { ERequestStatus } from "@/shared/enums/requestStatus.enum";
import { createGameTestStore } from "../../setup/create-game-test-store";

it("hideToast()", () => {
  const store = createGameTestStore();
  store.setState({
    toastType: ERequestStatus.ERROR,
    toastMessage: "Something went wrong",
  });

  store.getState().hideToast();

  expect(store.getState().toastType).toBeUndefined();
  expect(store.getState().toastMessage).toBe("");
});
