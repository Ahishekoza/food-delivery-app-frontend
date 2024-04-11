import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import Auth0ProviderWithNavigate from "./auth/Auth0ProviderWithNavigate.jsx";
import { Toaster } from "./components/ui/sonner.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
    <Auth0ProviderWithNavigate>
        <App />
        <Toaster visibleToasts={1} position="top-center" richColors/>
    </Auth0ProviderWithNavigate>
    </BrowserRouter>
  </React.StrictMode>
);
