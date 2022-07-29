import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";

const root = createRoot(document.getElementById("content-js-div"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
