import { TGameStore } from "@/store/game";
import { TFieldID } from "@/shared/types/map.type";
import { ERequestStatus } from "@/shared/enums/requestStatus.enum";
import { calculateResources } from "@/shared/helpers/calculateResources";
import { DAdvancedUsageBuildings } from "@/data/buildings.data";
import { tryPayCostAndApplyBenefit } from "./try-pay-cost-and-apply-benefit";
import { isBuildArea } from "@/store/game/slices/map/map.guards";

export const useBuilding = (state: TGameStore, fieldId: TFieldID) => {
  const field = state.getFieldById(fieldId);
  if (!field) throw new Error(`Field with id ${fieldId} not found`);
  if (!isBuildArea(field) || field.owner === null) return;
  if (field.building && DAdvancedUsageBuildings.includes(field.building.name))
    return;

  const currentPlayer = state.getCurrentPlayer();
  const isBuildingOwner = field.owner === currentPlayer.id;
  const building = field.building;
  const cost = building?.action?.require ?? {};
  const benefit = building?.action?.benefit ?? {};

  if (isBuildingOwner) {
    if (tryPayCostAndApplyBenefit(state, cost, benefit)) {
      state.disableField(fieldId);
      state.showToast(ERequestStatus.SUCCESS, `Building used successfully`);
    }
    return;
  }

  const ownerPlayer = state.getPlayer(field.owner);
  const usageFee = { coin: 1 };
  const totalCost = calculateResources(cost, usageFee, (a, b) => a + b);

  if (tryPayCostAndApplyBenefit(state, totalCost, benefit)) {
    state.setPlayerResources(
      field.owner,
      calculateResources(ownerPlayer.resources, usageFee, (a, b) => a + b),
    );
    state.disableField(fieldId);
    state.showToast(ERequestStatus.SUCCESS, `Building used successfully`);
  }
};
