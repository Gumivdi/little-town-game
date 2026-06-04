import { useGameStore } from "@/store/game";

export const highlightAvailable = () => {
  const { market, getPlayerResources, setAvailableMarket } =
    useGameStore.getState();

  const playerResources = getPlayerResources();

  setAvailableMarket(
    market
      .filter((building) =>
        Object.entries(building.cost).every(
          ([resource, cost]) =>
            cost <= playerResources[resource as keyof typeof playerResources],
        ),
      )
      .map((building) => building.name),
  );
};
