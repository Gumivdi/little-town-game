import { EResources } from "@/shared/enums/resources.enum";

type TMaterial = EResources.WOOD | EResources.STONE;
type TFood = EResources.WHEAT | EResources.FISH;
type TValue = EResources.COIN | EResources.POINT;
type TAll = TMaterial | TFood | TValue;

export type TResourcesMaterial = Record<TMaterial, number>;
export type TResourcesValue = Record<TValue, number>;
export type TResourcesFood = Record<TFood, number>;
export type TResourcesAll = Record<TAll, number>;
