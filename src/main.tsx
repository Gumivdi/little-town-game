import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

import { SupplyProvider } from "@/context/supply.context.tsx";
import { PlayersProvider } from "@/context/players.context.tsx";
import { MapProvider } from "@/context/map.context.tsx";
import { StatusProvider } from "@/context/status.context.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <StatusProvider>
      <SupplyProvider>
        <PlayersProvider>
          <MapProvider>
            <App />
          </MapProvider>
        </PlayersProvider>
      </SupplyProvider>
    </StatusProvider>
  </React.StrictMode>
);
