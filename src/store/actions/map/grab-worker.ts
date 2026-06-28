import { EGameStatus } from "@/shared/enums/game-status.enum";
import { TGameStore } from "@/store/game";
import { TGameActionContext } from "@/store/game/types/actions.types";

export const createGrabWorkerAction =
  ({ set, get }: TGameActionContext<TGameStore>) =>
  () => {
    const state = get();

    state.setGameStatus(EGameStatus.SEND_WORKER);
    state.enableEmptyGrassFields();
  };
