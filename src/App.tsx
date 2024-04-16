import Map from "@/components/Map/Map";

function App() {
  const classes = {
    main: "grid",
    sidebar: "col-start-1 col-end-4",
    map: "col-start-4 col-end-12",
  };

  return (
    <main className={classes.main}>
      <section
        className={classes.sidebar}
        style={{
          background: "repeating-linear-gradient(0deg, #512600, #1e1804 2rem)",
        }}
      ></section>
      <Map className={classes.map} />
    </main>
  );
}

export default App;
