// src/main.jsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ApiProvider } from "../Context/ApiProvider.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./index.css";
import App from "./App.jsx";
import { ControlProvider } from "../toolbox/controls/controlContext" ;

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ControlProvider>
      <ApiProvider> {/* swap to <HashRouter> if you prefer */}
        <App />
      </ApiProvider>
    </ControlProvider>
  </StrictMode>
);
