type TProps = {
  uniqueKey: string;
  counter: number;
  children: JSX.Element;
};

const ResourceMap: React.FC<TProps> = ({ uniqueKey, counter, children }) => {
  const classes = {
    div: "flex items-center gap-1",
  };

  return (
    <>
      {Array(counter)
        .fill(null)
        .map((_, index) => {
          const uniqueKeyModified = uniqueKey.concat(`-${index}`);
          return (
            <div key={uniqueKeyModified} className={classes.div}>
              {children}
            </div>
          );
        })}
    </>
  );
};

export default ResourceMap;
