import { EResources } from "@/shared/enums/resources.enum";

type TMaterial = EResources.WOOD | EResources.STONE;
type TFood = EResources.WHEAT | EResources.FISH;
type TValue = EResources.COIN;
type TScore = EResources.POINT;
type TResources = TMaterial | TFood | TValue;
type TAll = TResources | TScore;

export type TResourcesMaterial = Record<TMaterial, number>;
export type TResourcesValue = Record<TValue, number>;
export type TResourcesFood = Record<TFood, number>;
export type TResourcesOnly = Record<TResources, number>;
export type TResourcesAll = Record<TAll, number>;
