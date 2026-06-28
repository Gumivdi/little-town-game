import { IToastSlice, TToastSliceCreator } from "./toast.types";

export const createToastSlice: TToastSliceCreator<IToastSlice> = (set, get) => {
  let timeoutId: ReturnType<typeof setTimeout> | undefined;

  return {
    toastType: undefined,
    toastMessage: "",

    // --- METHODS ---
    showToast: (toastType, toastMessage) => {
      set({ toastType, toastMessage });

      if (timeoutId) clearTimeout(timeoutId);

      timeoutId = setTimeout(() => {
        get().hideToast();
      }, 3000);
    },

    hideToast: () => {
      set({ toastType: undefined, toastMessage: "" });

      if (timeoutId) {
        clearTimeout(timeoutId);
        timeoutId = undefined;
      }
    },
  };
};
