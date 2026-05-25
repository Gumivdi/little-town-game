import { StateCreator } from "zustand";
import { ERequestStatus } from "@/shared/enums/requestStatus.enum";

export interface IToastSlice {
  toastMessage: string;
  toastType?: ERequestStatus;

  // --- METHODS ---
  hideToast: () => void;
  showToast: (type: ERequestStatus, message: string) => void;
}

export type TToastSliceCreator<T extends object> = StateCreator<
  T,
  [],
  [],
  IToastSlice
>;
