import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { SupplyProvider } from "@/context/supply.context.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <SupplyProvider>
      <App />
    </SupplyProvider>
  </React.StrictMode>
);
