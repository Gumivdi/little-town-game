import { EResources } from "@/shared/enums/resources.enum";

export type TMaterial = EResources.WOOD | EResources.STONE;
export type TFood = EResources.WHEAT | EResources.FISH;
export type TValue = EResources.COIN;
export type TScore = EResources.POINT;
export type TResources = TMaterial | TFood | TValue;
export type TAll = TResources | TScore;

export type TResourcesMaterial = Record<TMaterial, number>;
export type TResourcesValue = Record<TValue, number>;
export type TResourcesFood = Record<TFood, number>;
export type TResourcesOnly = Record<TResources, number>;
export type TResourcesAll = Record<TAll, number>;
