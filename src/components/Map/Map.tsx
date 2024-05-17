import { useContext } from "react";
import { MapContext } from "@/context/map.context";
import MapField from "./MapField";

const classes = {
  ul: "h-svh grid grid-row-fr",
  li: "w-full grid grid-cols-9",
};

const Map: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ ...args }) => {
  const { map } = useContext(MapContext);

  return (
    <section {...args}>
      <ul className={classes.ul}>
        {map.map((row, rowIndex) => (
          <li className={classes.li} key={`row-${rowIndex}`}>
            {row.map((field, fieldIndex) => (
              <MapField key={`field-${rowIndex}-${fieldIndex}`} field={field} />
            ))}
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Map;
