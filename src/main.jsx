import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ToastPlaceholder } from '@/components/ToastPlaceholder.jsx';
import { Provider } from 'react-redux';
import { routes } from '@/routes.jsx';
import { store } from '@/store.js';

import './index.css';

const router = createBrowserRouter(routes);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}/>
      <ToastPlaceholder/>
    </Provider>
  </React.StrictMode>
);
