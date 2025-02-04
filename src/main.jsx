import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import { UserDataProvider } from "../src/context/UserData.jsx";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <UserDataProvider>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </UserDataProvider>
    </StrictMode>
);
