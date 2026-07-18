import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

const { pathname, search, hash } = window.location;
if (!hash.startsWith("#/") && pathname !== "/") {
  const newUrl = `/${hash || ""}#${pathname}${search}`;
  window.history.replaceState(null, "", newUrl);
}

createRoot(document.getElementById("root")!).render(<App />);
