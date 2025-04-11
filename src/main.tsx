import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import Pomodoro from "./Pomodoro.tsx";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Settings from "./Settings.tsx";
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/pomodoro" element={<Pomodoro />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
);
