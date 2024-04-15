import { TMap } from "@/shared/types/map.type";
import { FORREST, GRASS, ROCKS, POND } from "./fields.data";

const F = FORREST;
const R = ROCKS;
const P = POND;
const G = GRASS;

export const DMaps: TMap[] = [
  [
    [F, G, G, R, R, G, P, G, F],
    [G, G, F, G, G, G, G, G, G],
    [F, G, G, G, G, G, G, G, P],
    [G, G, G, G, G, G, G, G, F],
    [P, G, G, G, F, G, G, G, G],
    [P, G, G, R, G, G, P, G, R],
  ],
  [
    [R, G, F, R, G, P, G, R, R],
    [G, G, G, G, G, G, G, G, G],
    [P, G, G, G, G, G, G, G, G],
    [F, G, G, G, G, G, G, G, P],
    [G, G, G, G, G, G, F, G, G],
    [G, F, F, G, P, P, G, G, F],
  ],
];
