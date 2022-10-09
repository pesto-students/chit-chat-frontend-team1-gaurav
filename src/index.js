import React from "react";
import ReactDOM from "react-dom/client";
import * as Sentry from "@sentry/react";
import { Integrations  } from "@sentry/tracing";
import './index.css';
import App from './App';
import ErrorBoundary from './Common/ErrorBoundary';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./Redux/store";

Sentry.init({
  dsn: "https://b8e899d9f3bb485c8818e1f45a4e0e27@o1368837.ingest.sentry.io/6671716",
  integrations: [new Integrations.BrowserTracing()],

  // We recommend adjusting this value in production, or using tracesSampler
  // for finer control
  tracesSampleRate: 1.0,
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
    <BrowserRouter>
    <ErrorBoundary>
    <Provider store={store}>
      <App />
    </Provider>
    </ErrorBoundary>
    </BrowserRouter>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
