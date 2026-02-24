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
  EBuildings.RESIDENCE,
  EBuildings.WATCHTOWER,
];

export const DWithoutBenefitBuildings = [EBuildings.STATUE];

export const DBuildings: TBuilding[] = [
   {
    name: EBuildings.WHEAT_FIELD,
    quantity: 5,
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
    name: EBuildings.BAKERY,
    quantity: 1,
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
    quantity: 1,
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
    quantity: 1,
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
    quantity: 1,
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
    quantity: 1,
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
    quantity: 1,
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
    quantity: 1,
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
    quantity: 1,
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
    quantity: 1,
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
    quantity: 1,
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
    quantity: 1,
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
    quantity: 1,
    point: 5,
    cost: {
      wood: 3,
    },
    action: {
      require: {},
      benefit: {}
    }
  },

  {
    name: EBuildings.MARKET,
    quantity: 1,
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
    quantity: 1,
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
    quantity: 1,
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
    quantity: 1,
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
    quantity: 1,
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
    quantity: 1,
    point: 10,
    cost: {
      stone: 4,
    },
  },

  {
    name: EBuildings.STORE,
    quantity: 1,
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
    quantity: 1,
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
    quantity: 1,
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
    quantity: 1,
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
    quantity: 1,
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
    quantity: 1,
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
    quantity: 1,
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
