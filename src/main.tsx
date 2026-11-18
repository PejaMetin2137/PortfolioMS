import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Site from "./components/Site";
import cvData from "./data/cv.json";
import type { CV } from "./types";
import "./styles/site.css";

const cv: CV = cvData;

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Site cv={cv} />
  </StrictMode>
);
