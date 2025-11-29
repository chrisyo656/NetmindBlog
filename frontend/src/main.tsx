import { StrictMode } from 'react'
import './index.css'
import App from './App.tsx'
import ReactDOM from "react-dom/client";

import { BrowserRouter } from 'react-router-dom';
import { Provider } from './providers.tsx';

ReactDOM.createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Provider>
        <App />
      </Provider>
    </BrowserRouter>
  </StrictMode>,
);
