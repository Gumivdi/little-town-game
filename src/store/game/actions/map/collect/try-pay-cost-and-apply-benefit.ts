import { TGameStore } from "@/store/game";
import { TResourcesAll } from "@/shared/types/resources.type";
import { ERequestStatus } from "@/shared/enums/requestStatus.enum";
import { calculateResources } from "@/shared/helpers/calculateResources";
import { convertToResourceOnly } from "@/shared/helpers/convertToResourceOnly";
import { getAvailableResourcesFromSupply } from "@/shared/helpers/supply/get-available-resources-from-supply";
import { hasEnoughResources } from "@/shared/helpers/hasEnoughResources";

export const tryPayCostAndApplyBenefit = (
  state: TGameStore,
  cost: Partial<TResourcesAll>,
  benefit: Partial<TResourcesAll>,
): boolean => {
  const player = state.getCurrentPlayer();

  if (!hasEnoughResources(player.resources, cost)) {
    state.showToast(ERequestStatus.ERROR, `Not enough resources to use.`);
    return false;
  }

  state.setPlayerResources(
    player.id,
    calculateResources(player.resources, cost, (a, b) => a - b),
  );

  state.addToSupply(convertToResourceOnly(cost));

  const resourceBenefit = convertToResourceOnly(benefit);
  const availableFromSupply = getAvailableResourcesFromSupply(
    resourceBenefit,
    state.supplies,
  );

  state.removeFromSupply(availableFromSupply);

  const points = benefit.point ?? 0;

  state.setPlayerResources(
    player.id,
    calculateResources(
      state.getPlayer(player.id).resources,
      { ...availableFromSupply, point: points },
      (a, b) => a + b,
    ),
  );

  return true;
};
