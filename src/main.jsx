import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { BrowserRouter } from "react-router-dom";

import App from "./App.jsx";
import "./index.css";
import { initTheme } from "./utils/theme";
import { store, persistor } from "../redux/store.jsx";
import { Toaster } from "react-hot-toast";

initTheme();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <App />
          <Toaster position="top-right" />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </StrictMode>
);
