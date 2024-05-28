import { useContext } from "react";
import { PlayersContext } from "@/context/players.context";
import { ToastContext } from "@/context/toast.context";
import BuildingsStore from "@/components/BuildingsStore";
import Players from "@/components/Players";
import Supply from "@/components/Supply";
import DevelopmentActions from "@/components/DevelopmentActions";
import MapArea from "@/components/MapArea";
import Toast from "@/components/Toast/Toast";

function App() {
  const { players } = useContext(PlayersContext);
  const { type: toastType, message: toastMessage } = useContext(ToastContext);

  const developmentMode = true;
  const classes = {
    main: "grid",
    sidebar: "grid gap-4 p-3 max-h-svh",
    map: "col-start-2 col-end-12",
    store: "grid grid-cols-2 gap-2 overflow-auto px-3 -mx-3",
  };

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
            <Supply />
            <Players />
            <div className={classes.store}>
              <BuildingsStore />
            </div>
          </>
        )}
      </section>
      <MapArea className={classes.map} />
      {!!toastType && <Toast type={toastType} message={toastMessage} />}
    </main>
  );
}

export default App;
