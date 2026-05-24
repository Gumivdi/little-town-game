import { IToastSlice, TToastSliceCreator } from "./toast.types";

export const createToastSlice: TToastSliceCreator<IToastSlice> = (
  set,
  get,
) => ({
  toastType: undefined,
  toastMessage: "",

  // --- METHODS ---
  showToast: (toastType, toastMessage) => set({ toastType, toastMessage }),
  hideToast: () => set({ toastType: undefined, toastMessage: "" }),
});
