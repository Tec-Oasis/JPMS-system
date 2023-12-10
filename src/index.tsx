import React from "react";
import { createRoot } from "react-dom/client";

import App from "./App";
import "./i18n";
import { DirectionProvider } from "./contexts/DirectionContext";

const container = document.getElementById("root") as HTMLElement;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <React.Suspense fallback="loading">
      <DirectionProvider>
        <App />
      </DirectionProvider>
    </React.Suspense>
  </React.StrictMode>
);
