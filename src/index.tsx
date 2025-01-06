// В этом файле мы подключаем React и Redux и предоставляем всё
// дерево состояний объектов в качестве глобального состояния, 
// сохраняя указанное состояние в файле store.ts в локальном хранилище
import React from "react";
import ReactDOM from "react-dom/client";
import { PersistGate } from "redux-persist/integration/react";
import { persistor } from "./redux/store.ts";
import "./index.css";
import App from "./App.tsx";
import { store } from "./redux/store.ts";
import { Provider } from "react-redux";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

// мы предоставляем состояние как глобальное и сохраняющееся заданное состояние
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
