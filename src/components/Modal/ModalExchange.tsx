import { useContext, useState } from "react";
import { PlayersContext } from "@/context/players.context";
import { SupplyContext } from "@/context/supply.context";
import { EResources } from "@/shared/enums/resources.enum";
import { ToastContext } from "@/context/toast.context";
import { ERequestStatus } from "@/shared/enums/requestStatus.enum";
import Resource from "@/components/Resource/Resource";

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ModalExchange: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const { currentPlayer } = useContext(PlayersContext);
  const { supply } = useContext(SupplyContext);
  const { showToast } = useContext(ToastContext);

  const [resourceAmounts, setResourceAmounts] = useState(
    Object.fromEntries(Object.keys(supply).map((key) => [key, 0]))
  );

  const resources = Object.keys(supply)
    .filter((key): key is EResources => key !== EResources.COIN)
    .map((key) => key as EResources);

  if (!isOpen) return null;

  const maxAffordableAmount = Math.floor(currentPlayer.resources.coin / 3);

  const handleSliderChange = (resourceName: EResources, value: number) => {
    setResourceAmounts((prevState) => {
      const updatedResources = { ...prevState, [resourceName]: value };
      const totalCoinsSpent = Object.values(updatedResources).reduce(
        (total, amount) => total + amount,
        0
      );

      if (totalCoinsSpent > currentPlayer.resources.coin / 3) {
        return prevState;
      }

      return updatedResources;
    });
  };

  const handleSubmit = () => {
    const totalCoinsSpent = Object.values(resourceAmounts).reduce(
      (total, amount) => total + amount,
      0
    );

    const totalCost = totalCoinsSpent * 3;

    if (totalCost > currentPlayer.resources.coin) {
      showToast(ERequestStatus.ERROR, "You don't have enough coins!");
      return;
    }

    showToast(
      ERequestStatus.SUCCESS,
      `Exchange completed successfully: ${resourceAmounts}`
    );

    onClose();
  };

  const handleCancel = () => {
    // setResourceAmounts(
    //   resources.reduce((acc, resource) => {
    //     acc[resource.name] = 0;
    //     return acc;
    //   }, {})
    // );
    onClose();
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg w-1/3 text-black p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-semibold mb-4">Resources exchange</h2>
        <div className="mb-4">
          <p className="text-sm mb-4 flex gap-1 items-center">
            Each resource cost 3 <Resource size={4} type={EResources.COIN} />.
          </p>
        </div>
        {resources.map((resource) => (
          <div key={resource} className="mb-4">
            <div className="flex justify-between items-center">
              <Resource size={4} type={resource} />
              <span>{resourceAmounts[resource]} pieces</span>
            </div>
            <input
              type="range"
              min="0"
              max={maxAffordableAmount}
              step="1"
              disabled={
                currentPlayer.resources.coin -
                  Object.values(resourceAmounts).reduce(
                    (total, amount) => total + amount,
                    0
                  ) *
                    3 <
                  3 && resourceAmounts[resource] === 0
              }
              value={resourceAmounts[resource]}
              onChange={(e) =>
                handleSliderChange(resource, parseInt(e.target.value))
              }
              className="w-full"
            />
          </div>
        ))}
        <div className="flex justify-between items-center">
          <p className="flex gap-1 items-center">
            Coins to spent:{" "}
            {Object.values(resourceAmounts).reduce(
              (total, amount) => total + amount,
              0
            ) * 3}
            <Resource size={4} type={EResources.COIN} />
          </p>
          <p className="flex gap-1 items-center">
            Coins left:{" "}
            {currentPlayer.resources.coin -
              Object.values(resourceAmounts).reduce(
                (total, amount) => total + amount,
                0
              ) *
                3}
            <Resource size={4} type={EResources.COIN} />
          </p>
        </div>
        <div className="mt-6 flex justify-end space-x-4">
          <button
            onClick={handleCancel}
            className="px-4 py-2 bg-red-600 text-white rounded-lg"
          >
            Cancel
          </button>
          <button
            onClick={handleCancel}
            className="px-4 py-2 bg-gray-300 text-black rounded-lg"
          >
            Reset
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg"
          >
            Exchange
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalExchange;
