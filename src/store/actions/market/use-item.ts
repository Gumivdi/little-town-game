import { EBuildings } from "@/shared/enums/buildings.enum";
import { useGameStore } from "@/store/game";

export const useItem = (name: EBuildings) => {
  const { market, decreaseMarketItemQuantity, removeFromMarket } =
    useGameStore.getState();

  const marketItemQuantity = market.find(
    (item) => item.name === name,
  )!.quantity;

  marketItemQuantity - 1 === 0
    ? removeFromMarket(name)
    : decreaseMarketItemQuantity(name);
};
