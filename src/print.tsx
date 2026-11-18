import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import PrintCV from "./components/PrintCV";
import cvData from "./data/cv.json";
import type { CV } from "./types";
import "./styles/print.css";

const cv: CV = cvData;

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <PrintCV cv={cv} />
  </StrictMode>
);
