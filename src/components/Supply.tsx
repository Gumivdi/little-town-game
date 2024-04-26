import { useContext } from "react";
import { SupplyContext } from "@/context/supply.context";
import ResourceMapObject from "@/components/Resource/ResourceMapObject";
import Resource from "@/components/Resource/Resource";
import ResourceValue from "@/components/Resource/ResourceValue";

const Supply: React.FC = () => {
  const { supply } = useContext(SupplyContext);

  return (
    <section className="flex gap-2 items-center">
      <p>Bank: </p>
      <ResourceMapObject
        uniqueKey="supply"
        object={supply}
        fallback={(resource) => (
          <Resource size={8} type={resource}>
            <ResourceValue value={supply[resource]} />
          </Resource>
        )}
      />
    </section>
  );
};

export default Supply;
