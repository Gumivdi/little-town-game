import { useContext, useState } from "react";
import { PlayersContext } from "@/context/players.context";
import { SupplyContext } from "@/context/supply.context";
import { ToastContext } from "@/context/toast.context";
import { EResources } from "@/shared/enums/resources.enum";
import { ERequestStatus } from "@/shared/enums/requestStatus.enum";
import { TResources, TResourcesOnly } from "@/shared/types/resources.type";
import Resource from "@/components/Resource/Resource";

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ModalExchange: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const { currentPlayer, receiveResources, payResources } = useContext(PlayersContext);
  const { supply, takeFromSupply, restoreToSupply } = useContext(SupplyContext);
  const { showToast } = useContext(ToastContext);

  const [resourceAmounts, setResourceAmounts] = useState<Partial<TResourcesOnly>>(
    Object.fromEntries(Object.keys(supply).map((key) => [key, 0]))
  );

  if (!isOpen) return null;

  const resources = Object.keys(supply) as TResources[];
  const resourceCost = 3;

  const calculateMaxResourceAmount = (resourceName: TResources) => {
    const available = supply[resourceName] ?? 0;
    const maxAffordableAmount = Math.floor(currentPlayer.resources.coin / resourceCost);
    return Math.min(available, maxAffordableAmount);
  }

  const calculateCost = (resources: Partial<TResourcesOnly>, cost = resourceCost) => Object.values(resources).reduce(
    (total, amount) => total + amount,
    0
  ) * cost;

  const handleSliderChange = (resourceName: EResources, value: number) => {
    setResourceAmounts((prevState) => {
      const updatedResources = { ...prevState, [resourceName]: value };
      const notEnoughCoins = calculateCost(updatedResources) > currentPlayer.resources.coin;
      return notEnoughCoins ? prevState : updatedResources;
    });
  };

  const handleSubmit = () => {
    const totalCost = calculateCost(resourceAmounts);
    payResources({ coin: totalCost });
    receiveResources(resourceAmounts);
    restoreToSupply({ coin: totalCost });
    takeFromSupply(resourceAmounts);

    showToast(
      ERequestStatus.SUCCESS,
      `Exchange completed successfully!`
    );

    onClose();
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-40"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg w-1/3 text-black p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-semibold mb-4">Resources exchange</h2>
        <div className="mb-4">
          <p className="text-sm mb-4 flex gap-1 items-center">
            Each resource cost {resourceCost} <Resource size={4} type={EResources.COIN} />.
          </p>
        </div>
        {resources.map((resource) => {
          if (resource === EResources.COIN) return null;

          const coinsSpent = calculateCost(resourceAmounts);
          const coinsLeft = currentPlayer.resources.coin - coinsSpent;
          const isInsufficientCoins = coinsLeft < resourceCost && resourceAmounts[resource] === 0;
          const isResourceUnavailable = supply[resource] === 0;
          const isDisabled = isInsufficientCoins || isResourceUnavailable;

          const inputProps = {
            type: "range",
            min: 0,
            max: calculateMaxResourceAmount(resource),
            step: 1,
            disabled: isDisabled,
            value: resourceAmounts[resource],
            onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
              handleSliderChange(resource, parseInt(e.target.value)),
            className: "w-full opacity-100 disabled:opacity-5",
          };

          return (
            <div key={resource} className="mb-4">
              <div className="flex justify-between items-center">
                <Resource size={4} type={resource} />
                <span>{resourceAmounts[resource]}/{supply[resource]} pieces</span>
              </div>
              <input {...inputProps} />
            </div>
          );
        })}
        <div className="flex justify-between items-center">
          <p className="flex gap-1 items-center">
            Coins to spent:{" "}
            {calculateCost(resourceAmounts)}
            <Resource size={4} type={EResources.COIN} />
          </p>
          <p className="flex gap-1 items-center">
            Coins left:{" "}
            {currentPlayer.resources.coin - calculateCost(resourceAmounts)}
            <Resource size={4} type={EResources.COIN} />
          </p>
        </div>
        <div className="mt-6 flex justify-end space-x-4">
          <button
            onClick={handleCancel}
            className="w-1/2 px-4 py-2 bg-red-600 text-white rounded-lg"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={calculateCost(resourceAmounts) === 0}
            className="w-1/2 px-4 py-2 bg-blue-500 text-white rounded-lg disabled:opacity-50"
          >
            Exchange
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalExchange;
