import { Fragment } from "react/jsx-runtime";

import { EResources } from "@/shared/enums/resources.enum";
import { TResourcesAll } from "@/shared/types/resources.type";

type TProps = {
  uniqueKey: string;
  object: Partial<TResourcesAll>;
  fallback: (resource: EResources) => JSX.Element;
};

const ResourceMapObject: React.FC<TProps> = ({
  uniqueKey,
  object,
  fallback,
}) => (
  <>
    {Object.keys(object).map((itemKey, index) => {
      const resourceKey = itemKey as EResources;
      const uniqueKeyModified = uniqueKey.concat(`-${resourceKey}-${index}`);

      return (
        <Fragment key={uniqueKeyModified}>{fallback(resourceKey)}</Fragment>
      );
    })}
  </>
);

export default ResourceMapObject;
