type TProps = {
  value: number;
};

const ResourceValue: React.FC<TProps> = ({ value }) => {
  return <p className="text-white font-bold">{value}</p>;
};

export default ResourceValue;
