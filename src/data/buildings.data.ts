import { EBuildings } from "@/shared/enums/buildings.enum";
import { EStage } from "@/shared/enums/stage.enum";
import { TBuilding } from "@/shared/types/building.type";

export const DBuildingsRecommended = [
  EBuildings.WORKSHOP,
  EBuildings.BAKERY,
  EBuildings.QUARRY,
  EBuildings.STORE,
  EBuildings.WAREHOUSE,
  EBuildings.CHURCH,
  EBuildings.BARN,
  EBuildings.GOLDMINE,
  EBuildings.LOMBARD,
  EBuildings.WELL,
  EBuildings.STATUE,
  EBuildings.CASTLE,
];

export const DSpecialBuildings = [
  EBuildings.CASTLE,
  EBuildings.CATHEDRAL,
  EBuildings.LOMBARD,
  EBuildings.CASTLE,
  EBuildings.RESIDENCE,
  EBuildings.WATCHTOWER,
];

export const DBuildings: TBuilding[] = [
  {
    name: EBuildings.BAKERY,
    point: 4,
    cost: {
      wood: 2,
    },
    action: {
      require: {
        wheat: 1,
      },
      benefit: {
        coin: 4,
      },
    },
  },

  {
    name: EBuildings.BARN,
    point: 6,
    cost: {
      wood: 4,
    },
    action: {
      require: {
        wheat: 2,
      },
      benefit: {
        point: 5,
      },
    },
  },

  {
    name: EBuildings.BOOKSTORE,
    point: 8,
    cost: {
      stone: 4,
    },
    action: {
      benefit: {
        coin: 3,
      },
    },
  },

  {
    name: EBuildings.BREWERY,
    point: 4,
    cost: {
      wood: 2,
    },
    action: {
      require: {
        wheat: 1,
      },
      benefit: {
        point: 3,
      },
    },
  },

  {
    name: EBuildings.CARPENTER,
    point: 4,
    cost: {
      wood: 2,
    },
    action: {
      require: {
        coin: 1,
      },
      benefit: {
        wood: 3,
      },
    },
  },

  {
    name: EBuildings.CASTLE,
    point: 0,
    cost: {
      stone: 6,
    },
    special: {
      stage: EStage.END_OF_GAME,
      score: (buildings) => buildings * 4,
    },
  },

  {
    name: EBuildings.CATHEDRAL,
    point: 11,
    cost: {
      stone: 6,
    },
    special: {
      stage: EStage.END_OF_ROUND,
      score: (workers) => workers * 1,
    },
  },

  {
    name: EBuildings.CHURCH,
    point: 8,
    cost: {
      stone: 4,
    },
    action: {
      require: {
        coin: 3,
      },
      benefit: {
        point: 5,
      },
    },
  },

  {
    name: EBuildings.FISHERMAN,
    point: 4,
    cost: {
      wood: 1,
      stone: 1,
    },
    action: {
      require: {
        fish: 1,
      },
      benefit: {
        coin: 3,
      },
    },
  },

  {
    name: EBuildings.FOUNTAIN,
    point: 5,
    cost: {
      stone: 2,
    },
    action: {
      require: {
        coin: 1,
      },
      benefit: {
        point: 3,
      },
    },
  },

  {
    name: EBuildings.GOLDMINE,
    point: 4,
    cost: {
      wood: 1,
      stone: 1,
    },
    action: {
      benefit: {
        coin: 2,
      },
    },
  },

  {
    name: EBuildings.LOMBARD,
    point: 5,
    cost: {
      wood: 3,
    },
    special: {
      stage: EStage.ACTION,
      score() {
        // TODO -> Exchange 2 cubic resources into 2 different of your choice
      },
    },
  },

  {
    name: EBuildings.MARKET,
    point: 6,
    cost: {
      wood: 4,
    },
    action: {
      require: {
        stone: 1,
        wood: 1,
        wheat: 1,
        fish: 1,
      },
      benefit: {
        point: 7,
      },
    },
  },

  {
    name: EBuildings.PIER,
    point: 5,
    cost: {
      wood: 3,
    },
    action: {
      benefit: {
        fish: 2,
      },
    },
  },

  {
    name: EBuildings.QUARRY,
    point: 5,
    cost: {
      wood: 3,
    },
    action: {
      require: {
        coin: 2,
      },
      benefit: {
        stone: 2,
      },
    },
  },

  {
    name: EBuildings.RESIDENCE,
    point: 2,
    cost: {
      coin: 6,
    },
    special: {
      stage: EStage.END_OF_ROUND,
      score() {
        // TODO -> optionally use buildings around
      },
    },
  },

  {
    name: EBuildings.RESTAURANT,
    point: 7,
    cost: {
      stone: 2,
      wood: 2,
    },
    action: {
      require: {
        wheat: 1,
        fish: 1,
      },
      benefit: {
        point: 4,
      },
    },
  },

  {
    name: EBuildings.STATUE,
    point: 10,
    cost: {
      stone: 4,
    },
  },

  {
    name: EBuildings.STORE,
    point: 4,
    cost: {
      wood: 2,
    },
    action: {
      require: {
        coin: 1,
      },
      benefit: {
        wheat: 1,
        fish: 1,
      },
    },
  },

  {
    name: EBuildings.TAVERN,
    point: 7,
    cost: {
      stone: 2,
      wheat: 2,
    },
    action: {
      benefit: {
        point: 3,
      },
    },
  },

  {
    name: EBuildings.WAREHOUSE,
    point: 8,
    cost: {
      stone: 4,
    },
    action: {
      require: {
        stone: 2,
      },
      benefit: {
        point: 5,
      },
    },
  },

  {
    name: EBuildings.WATCHTOWER,
    point: 0,
    cost: {
      wood: 3,
      stone: 3,
    },
    special: {
      stage: EStage.END_OF_GAME,
      score: (freeSpaces) => freeSpaces * 2,
    },
  },

  {
    name: EBuildings.WELL,
    point: 4,
    cost: {
      wood: 1,
      stone: 1,
    },
    action: {
      benefit: {
        point: 2,
      },
    },
  },

  {
    name: EBuildings.WHEAT_FIELD,
    point: 3,
    cost: {
      wood: 1,
    },
    action: {
      benefit: {
        wheat: 1,
      },
    },
  },

  {
    name: EBuildings.WORKSHOP,
    point: 5,
    cost: {
      stone: 2,
    },
    action: {
      require: {
        wood: 2,
      },
      benefit: {
        point: 3,
      },
    },
  },
];
