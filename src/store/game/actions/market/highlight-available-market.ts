import { TGameStore } from "@/store/game";
import { TGameActionContext } from "@/store/game/types/actions.types";

export const createHighlightAvailableMarketAction =
  ({ set, get }: TGameActionContext<TGameStore>) =>
  () => {
    const state = get();

    const playerResources = state.getCurrentPlayer().resources;

    state.setAvailableMarket(
      state.market
        .filter((building) =>
          Object.entries(building.cost).every(
            ([resource, cost]) =>
              cost <= playerResources[resource as keyof typeof playerResources],
          ),
        )
        .map((building) => building.name),
    );
  };
