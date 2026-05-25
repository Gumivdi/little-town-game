import { expect, it } from "vitest";
import { ERequestStatus } from "@/shared/enums/requestStatus.enum";
import { createTestStore } from "./setup/create-test-store";

it("hideToast()", () => {
  const store = createTestStore();
  store.setState({
    toastType: ERequestStatus.ERROR,
    toastMessage: "Something went wrong",
  });

  store.getState().hideToast();

  expect(store.getState().toastType).toBeUndefined();
  expect(store.getState().toastMessage).toBe("");
});
