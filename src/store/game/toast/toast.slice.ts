import { IToastSlice, TToastSliceCreator } from "./toast.types";

export const createToastSlice: TToastSliceCreator<IToastSlice> = (
  set,
  get,
) => ({
  type: undefined,
  message: "",

  show: (type, message) => {
    set({ type, message });
  },

  hide: () => {
    set({ type: undefined, message: "" });
  },
});
