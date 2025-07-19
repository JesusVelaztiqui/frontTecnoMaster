import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.scss";
import AppRoutes from "./utils/Routes";

import '@fortawesome/fontawesome-free/css/all.min.css';


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AppRoutes />
  </StrictMode>
);
