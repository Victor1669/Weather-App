import { createRoot } from "react-dom/client";

import App from "./Components/App.jsx";

import "./Stylesheets/grid.css";
import "./Stylesheets/main.css";
import "./Stylesheets/aside.css";
import "./Stylesheets/index.css";

import "./Stylesheets/error.css";
import "./Stylesheets/search-bar.css";
import "./Stylesheets/header.css";
import "./Stylesheets/media-breakpoints.css";

createRoot(document.getElementById("root")).render(<App />);
