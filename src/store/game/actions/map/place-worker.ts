import { EGameStatus } from "@/shared/enums/game-status.enum";
import { TFieldID } from "@/shared/types/map.type";
import { TGameStore } from "@/store/game";
import { TGameActionContext } from "@/store/game/types/actions.types";

export const createPlaceWorkerAction =
  ({ set, get }: TGameActionContext<TGameStore>) =>
  (fieldId: TFieldID) => {
    const state = get();

    state.setFieldOwner(fieldId, state.getCurrentPlayer().id);
    state.decrementPlayerWorkers();
    state.setGameStatus(EGameStatus.COLLECT);
    state.enableCollectableFields(fieldId);
  };
