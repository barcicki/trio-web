import React from 'react';
import ReactDOM from 'react-dom/client';
import { GameProvider } from '@/GameProvider.jsx';
import { App } from '@/App.jsx';

import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GameProvider name="game">
      <App />
    </GameProvider>
  </React.StrictMode>
);
