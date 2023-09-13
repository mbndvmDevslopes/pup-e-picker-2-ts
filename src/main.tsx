import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./App.css";
import "./index.css";
import { Toaster } from "react-hot-toast";
import { App } from "./App";
import { DogProvider } from './providers/dog-context';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <DogProvider>
      <Toaster />
      <App />
    </DogProvider>
  </React.StrictMode>
);
