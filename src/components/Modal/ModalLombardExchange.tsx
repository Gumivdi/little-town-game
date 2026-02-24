import { useContext, useState } from "react";
import { ReactSVG } from "react-svg";
import classNames from "classnames";

import { PlayersContext } from "@/context/players.context";
import { SupplyContext } from "@/context/supply.context";
import { ToastContext } from "@/context/toast.context";
import { MapContext } from "@/context/map.context";
import { EResources } from "@/shared/enums/resources.enum";
import { ERequestStatus } from "@/shared/enums/requestStatus.enum";
import { TResources, TResourcesOnly } from "@/shared/types/resources.type";
import Resource from "@/components/Resource/Resource";
import ResourceValue from "@/components/Resource/ResourceValue";
import Tooltip from "@/components/Tooltip";
import ImgArrowLeftRightLine from "@/assets/arrow-left-right-line.svg";
import { DSettings } from "@/data/settings.data";

type TOperation = "+" | "-";
type ResourceStateSetter = React.Dispatch<React.SetStateAction<Partial<TResourcesOnly>>>;

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface IHandleResourceChangeParams {
  resource: TResources;
  operation: TOperation;
  setter: ResourceStateSetter;
  currentTotal: number;
  maxTotal: number;
}

const ModalLombardExchange: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const { currentPlayer, receiveResources, payResources, payToPlayer } = useContext(PlayersContext);
  const { supply, takeFromSupply, restoreToSupply } = useContext(SupplyContext);
  const { memorizedField: lombardField, map, disableMapField, setMemorizedField } = useContext(MapContext);
  const { showToast } = useContext(ToastContext);

  const [resourceToSell, setResourceToSell] = useState<Partial<TResourcesOnly>>(
    Object.fromEntries(Object.keys(supply).map((key) => [key, 0]))
  );
  const [resourceToBuy, setResourceToBuy] = useState<Partial<TResourcesOnly>>(
    Object.fromEntries(Object.keys(supply).map((key) => [key, 0]))
  );

  if (!isOpen) return null;

  const resources = Object.keys(supply) as TResources[];
  const totalToSell = Object.values(resourceToSell).reduce((a, b) => a + b, 0);
  const totalToBuy = Object.values(resourceToBuy).reduce((a, b) => a + b, 0);
  const helpTooltip = {
    direction: "left" as const,
    message: <>
      <p><strong>LMB</strong> - increase the amount</p>
      <p><strong>RMB</strong> - decrease the amount</p>
    </>,
  }

  const handleResourceChange = ({
    resource,
    operation,
    setter,
    currentTotal,
    maxTotal,
  }: IHandleResourceChangeParams) => {
    const calculation = (value: number) =>
      operation === "-" ? value - 1 : value + 1;

    if (operation === "-" && (setter === setResourceToSell ? resourceToSell[resource] === 0 : resourceToBuy[resource] === 0)) return;

    if (operation === "+" && currentTotal === maxTotal) {
      showToast(
        ERequestStatus.WARNING,
        `You can only ${setter === setResourceToSell ? "sell" : "buy"} up to ${maxTotal} resources`
      );
      return;
    };

    if (operation === "+" && setter === setResourceToBuy && supply[resource]! <= (resourceToBuy[resource] ?? 0)) {
      showToast(
        ERequestStatus.ERROR,
        `Not enough ${resource} in supply`
      );
      return;
    };
    
    if (operation === "+" && setter === setResourceToSell && currentPlayer!.resources[resource]! <= (resourceToSell[resource] ?? 0)) {
      showToast(
        ERequestStatus.ERROR,
        `Not enough ${resource} to sell`
      );
      return;
    }

    setter((prev) => {
      const currentAmount = prev[resource] ?? 0;
      return {
        ...prev,
        [resource]: calculation(currentAmount),
      };
    });
  };

  const handleSubmit = () => {
    if (!lombardField) return;

    const fieldOwner = lombardField && lombardField.owner !== null;
    const hasDifferentOwner = fieldOwner  && lombardField.owner !== currentPlayer.id;

    if (totalToSell + totalToBuy !== 4) {
      showToast(
        ERequestStatus.WARNING,
        "You must sell and buy 2 resources"
      );
      return;
    }
    
    if (hasDifferentOwner) {
      payToPlayer(DSettings.opponentBuildingFee, lombardField.owner!);
    }

    payResources(resourceToSell);
    receiveResources(resourceToBuy);
    restoreToSupply(resourceToSell);
    takeFromSupply(resourceToBuy);
    disableMapField(lombardField.id!);
    setMemorizedField(null);

    showToast(
      ERequestStatus.SUCCESS,
      `Exchange completed successfully!`
    );

    if (map.flat().find((field) => !field.disabled)) {

    } else {
      
    }

    onClose();
  };


  const handleSell = (e: React.MouseEvent<HTMLButtonElement>, resource: TResources, operation: TOperation) => {
    e.preventDefault();
    handleResourceChange({
      resource,
      operation,
      setter: setResourceToSell,
      currentTotal: totalToSell,
      maxTotal: 2,
    })
  }

  const handleBuy = (e: React.MouseEvent<HTMLButtonElement>, resource: TResources, operation: TOperation) => {
    e.preventDefault();
    handleResourceChange({
      resource,
      operation,
      setter: setResourceToBuy,
      currentTotal: totalToBuy,
      maxTotal: 2,
    })
  }

  const handleCancel = () => {
    onClose();
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-40"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg w-[350px] text-black p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between mb-4">
          <h2 className="text-xl font-semibold">Resources exchange</h2>
          <Tooltip {...helpTooltip} />
        </div>
        <div className="flex justify-between items-center">
          <div>
            <h3 className="mb-2 text-sm"><strong>Selling</strong> ({totalToSell}/2):</h3>
            <div className="grid grid-cols-2 gap-2">
              {resources.map((resource) => {
                if (resource === EResources.COIN) return null;
                return (
                    <button key={`${resource}-to-sell`} className={classNames("w-1/2", {"opacity-65": !resourceToSell[resource]})} onContextMenu={(e) => {handleSell(e, resource, "-")}} onClick={(e) => handleSell(e, resource, "+")}>
                      <Resource size={8} type={resource}>
                        <ResourceValue value={resourceToSell[resource]!} />
                      </Resource>
                    </button>
                );
              })}
            </div>
          </div>
          <ReactSVG className="size-5" color="white" src={ImgArrowLeftRightLine} />
          <div>
            <h3 className="mb-2 text-sm"><strong>Buying</strong> ({totalToBuy}/2):</h3>
            <div className="grid grid-cols-2 gap-2">
              {resources.map((resource) => {
                if (resource === EResources.COIN) return null;
                return (
                  <button key={`${resource}-to-buy`} className={classNames("w-1/2", {"opacity-65": !resourceToBuy[resource]})} onContextMenu={(e) => {handleBuy(e, resource, "-")}} onClick={(e) => handleBuy(e, resource, "+")}>
                    <Resource size={8} type={resource}>
                      <ResourceValue value={resourceToBuy[resource]!} />
                    </Resource>
                  </button>
                );
              })}
            </div>
          </div>
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
            className="w-1/2 px-4 py-2 bg-blue-500 text-white rounded-lg"
          >
            Exchange
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalLombardExchange;
