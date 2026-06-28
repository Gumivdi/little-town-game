import { TGameStore } from "@/store/game";
import { EGameStatus } from "@/shared/enums/game-status.enum";

export const handleEndOfCollectPhase = (state: TGameStore) => {
  const areAllFieldsDisabled = state.map
    .flat()
    .every((field) => field.disabled);

  if (areAllFieldsDisabled) {
    state.setNextPlayer();
    state.setGameStatus(EGameStatus.SELECT_ACTION);
  }
};
