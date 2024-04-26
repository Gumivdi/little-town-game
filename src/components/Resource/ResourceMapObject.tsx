import { Fragment } from "react/jsx-runtime";

type TProps<T> = {
  uniqueKey: string;
  object: Partial<T>;
  fallback: (resource: keyof T) => JSX.Element;
};

function ResourceMapObject<T>({ uniqueKey, object, fallback }: TProps<T>) {
  return (
    <>
      {Object.keys(object).map((itemKey, index) => {
        const resourceKey = itemKey as keyof T;
        const uniqueKeyModified = uniqueKey.concat(
          `-${String(resourceKey)}-${index}`
        );

        return (
          <Fragment key={uniqueKeyModified}>{fallback(resourceKey)}</Fragment>
        );
      })}
    </>
  );
}

export default ResourceMapObject;
