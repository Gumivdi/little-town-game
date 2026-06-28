import { EBuildings } from "@/shared/enums/buildings.enum";
import { TGameStore } from "@/store/game";
import { TGameActionContext } from "@/store/game/types/actions.types";

export const createUseMarketItemAction =
  ({ set, get }: TGameActionContext<TGameStore>) =>
  (name: EBuildings) => {
    const state = get();

    const marketItemQuantity = state.market.find(
      (item) => item.name === name,
    )!.quantity;

    marketItemQuantity - 1 === 0
      ? state.removeFromMarket(name)
      : state.decreaseMarketItemQuantity(name);
  };
