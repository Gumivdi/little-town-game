import { StateCreator } from "zustand";
import { ERequestStatus } from "@/shared/enums/requestStatus.enum";

export interface IToastSlice {
  toastType?: ERequestStatus;
  toastMessage: string;
  showToast: (type: ERequestStatus, message: string) => void;
  hideToast: () => void;
}

export type TToastSliceCreator<T extends object> = StateCreator<
  T,
  [],
  [],
  IToastSlice
>;
