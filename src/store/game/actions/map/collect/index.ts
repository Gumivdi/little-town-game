import { TGameActionContext } from "@/store/game/types/actions.types";
import { TFieldID } from "@/shared/types/map.type";
import { ETerrains } from "@/shared/enums/terrains.enum";
import { useBuilding } from "./use-building";
import { collectFromField } from "./collect-from-field";
import { handleEndOfCollectPhase } from "./handle-end-of-collect-phase";
import { TGameStore } from "@/store/game";

export const createCollectAction =
  ({ set, get }: TGameActionContext<TGameStore>) =>
  (fieldId: TFieldID) => {
    const state = get();
    const field = state.getFieldById(fieldId);

    if (!field) throw new Error(`Field with id ${fieldId} not found`);

    field.type === ETerrains.GRASS
      ? useBuilding(state, fieldId)
      : collectFromField(state, fieldId);

    handleEndOfCollectPhase(state);
  };
