import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import UserProvider from "./components/Provider/UserProvider.tsx";
import ThemeProvider from "./components/Provider/ThemeProvider.tsx";

createRoot(document.getElementById("root")!).render(
    <UserProvider>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </UserProvider>
);
