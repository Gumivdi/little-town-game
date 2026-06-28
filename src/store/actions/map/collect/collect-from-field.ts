import { TGameStore } from "@/store/game";
import { TFieldID } from "@/shared/types/map.type";
import { ERequestStatus } from "@/shared/enums/requestStatus.enum";
import { getResourceName } from "@/shared/helpers/map/get-field-resource";

export const collectFromField = (state: TGameStore, fieldId: TFieldID) => {
  const field = state.getFieldById(fieldId);
  if (!field) throw new Error(`Field with id ${fieldId} not found`);

  const resourceName = getResourceName(field.type);
  const currentPlayer = state.getCurrentPlayer();

  if (state.supplies[resourceName] > 0) {
    state.removeFromSupply({ [resourceName]: 1 });
    state.setPlayerResources(currentPlayer.id, {
      [resourceName]: currentPlayer.resources[resourceName] + 1,
    });
    state.disableField(fieldId);
    state.showToast(ERequestStatus.SUCCESS, `Collected 1 ${resourceName}`);
    return;
  }

  state.showToast(
    ERequestStatus.ERROR,
    `No more ${resourceName} left to collect`,
  );
};
