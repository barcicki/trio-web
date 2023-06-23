import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ToastPlaceholder } from '@/components/ToastPlaceholder.jsx';
import { routes } from '@/routes.jsx';

import './index.css';

const router = createBrowserRouter(routes);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
    <ToastPlaceholder/>
  </React.StrictMode>
);
