import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
// @ts-ignore
import "./style.css";

createRoot(document.querySelector("#app")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
