import Map from "@/components/Map/Map";
import BuildingsStore from "./components/BuildingsStore";

function App() {
  const classes = {
    main: "grid",
    sidebar: "grid grid-cols-2 gap-2 p-3 max-h-svh overflow-auto",
    map: "col-start-2 col-end-12",
  };

  return (
    <main className={classes.main}>
      <section
        className={classes.sidebar}
        style={{
          background: "repeating-linear-gradient(0deg, #512600, #1e1804 2rem)",
        }}
      >
        <BuildingsStore />
      </section>
      <Map className={classes.map} />
    </main>
  );
}

export default App;
