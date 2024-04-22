import { ReactNode } from "react";
import { TBuilding } from "@/shared/types/building.type";

export type TProps = {
  children: ReactNode;
};

export type TMainProps = {
  building: TBuilding;
};

export type THeaderProps = TMainProps & {
  costKey: string;
};

export type TFooterProps = TMainProps & {
  nameKey: string;
};

export type TCompoundComponents = {
  Header: React.FC<THeaderProps>;
  Main: React.FC<TMainProps>;
  Footer: React.FC<TFooterProps>;
};
