import { ContextProvider } from './context/ContexProvider'
import { RouterProvider } from 'react-router-dom'
import React from 'react'
import ReactDOM from 'react-dom/client'

import './index.css'
import AppRoutes from './routes'

const rootElement = document.getElementById('root');
ReactDOM.createRoot(rootElement).render(
  <ContextProvider>
    <AppRoutes />
    {/* <RouterProvider router={router} /> */}
  </ContextProvider>,
);
 