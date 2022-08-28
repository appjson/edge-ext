import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App-edge-ext";

const root = createRoot(document.getElementById("content-js-div-edge-ext"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
