import Map from "@/components/Map/Map";
import BuildingsStore from "@/components/BuildingsStore";
import Players from "@/components/Players";
import Supply from "@/components/Supply";
import DevelopmentActions from "@/components/DevelopmentActions";

function App() {
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
        <Supply />
        <Players />
        <div className={classes.store}>
          <BuildingsStore />
        </div>
      </section>
      <Map className={classes.map} />
    </main>
  );
}

export default App;
