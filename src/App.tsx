import { useContext } from "react";
import { PlayersContext } from "@/context/players.context";
import { ToastContext } from "@/context/toast.context";
import { StatusContext } from "@/context/status.context";
import { EStatus } from "@/shared/enums/status.enum";
import BuildingsStore from "@/components/BuildingsStore";
import Players from "@/components/Players";
import Supply from "@/components/Supply";
import DevelopmentActions from "@/components/DevelopmentActions";
import MapArea from "@/components/MapArea";
import Toast from "@/components/Toast/Toast";
import RoundCounter from "@/components/RoundCounter";
import ModalExchange from "@/components/Modal/ModalExchange";
import ModalLombardExchange from "@/components/Modal/ModalLombardExchange";

function App() {
  const { players } = useContext(PlayersContext);
  const { status, setStatus } = useContext(StatusContext);
  const { type: toastType, message: toastMessage } = useContext(ToastContext);

  const developmentMode = true;
  const classes = {
    main: "grid grid-cols-[430px_1fr] h-svh",
    sidebar: "grid gap-4 p-3 max-h-svh",
    map: "",
    store: "grid grid-cols-2 gap-2 overflow-auto pl-3 -mx-3",
  };

  const modalDisplayManagement = () => {
    switch (status) {
      case EStatus.EXCHANGE:
        return <ModalExchange isOpen={true} onClose={() => setStatus(EStatus.SELECT_ACTION)} />;
      case EStatus.LOMBARD_EXCHANGE:
        return <ModalLombardExchange isOpen={true} onClose={() => setStatus(EStatus.COLLECT)} />;
      default:
        return null;
    }
  }
  

  return (
    <main className={classes.main}>
      <section
        className={classes.sidebar}
        style={{
          background: "repeating-linear-gradient(0deg, #512600, #1e1804 2rem)",
        }}
      >
        {developmentMode && <DevelopmentActions />}
        {!!players.length && (
          <>
            <div className="flex justify-between items-center">
              <Supply />
              <RoundCounter />
            </div>
            <Players />
            <div className={classes.store}>
              <BuildingsStore />
            </div>
          </>
        )}
      </section>
      <MapArea className={classes.map} />
      {!!toastType && <Toast type={toastType} message={toastMessage} />}
      
      {modalDisplayManagement()}
    </main>
  );
}

export default App;
