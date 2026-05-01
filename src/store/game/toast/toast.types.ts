import { StateCreator } from "zustand";
import { ERequestStatus } from "@/shared/enums/requestStatus.enum";

export interface IToastSlice {
  type?: ERequestStatus;
  message: string;
  show: (type: ERequestStatus, message: string) => void;
  hide: () => void;
}

export type TToastSliceCreator<T extends object> = StateCreator<
  T,
  [],
  [],
  IToastSlice
>;
