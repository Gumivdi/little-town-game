import classNames from "classnames";
import { ReactSVG } from "react-svg";

import { ETerrains } from "@/shared/enums/terrains.enum";
import { TField } from "@/shared/types/map.type";

import ImgForrest from "@/assets/map/forrest.svg";
import ImgPond from "@/assets/map/pond.svg";
import ImgRocks from "@/assets/map/rocks.svg";

const fieldImages: Record<ETerrains, string | null> = {
  forrest: ImgForrest,
  pond: ImgPond,
  rocks: ImgRocks,
  grass: null,
};

const classes = {
  button:
    "border grow border-green-800 bg-gradient-to-t from-green-600 to-green-700",
};

const MapField: React.FC<{ field: TField }> = ({ field }) => {
  const isGrass = field.type === ETerrains.GRASS;

  const getFieldImage = (type: ETerrains) =>
    isGrass ? null : <ReactSVG src={fieldImages[type]!} />;

  return (
    <button
      disabled={!isGrass}
      className={classNames(classes.button, {
        "hover:from-green-500 hover:to-green-600": isGrass,
      })}
    >
      {getFieldImage(field.type)}
    </button>
  );
};

export default MapField;
