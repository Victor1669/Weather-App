import { createRoot } from "react-dom/client";

import App from "./Components/App.jsx";

import "./Stylesheets/aside.css";
import "./Stylesheets/main.css";
import "./Stylesheets/search-bar.css";
import "./Stylesheets/header.css";
import "./Stylesheets/fonts.css";
import "./Stylesheets/index.css";

createRoot(document.getElementById("root")).render(<App />);
