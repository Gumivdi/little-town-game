import { DMaps } from "@/data/maps.data";
import MapField from "./MapField";

const classes = {
  ul: "h-svh grid auto-rows-fr",
  li: "w-full flex",
};

const Map: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ ...args }) => {
  const selectedMap = 0;

  return (
    <section {...args}>
      <ul className={classes.ul}>
        {DMaps[selectedMap].map((row, rowIndex) => (
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
