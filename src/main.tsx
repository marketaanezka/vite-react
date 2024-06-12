import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './styles/index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Login from './pages/login.tsx';
import AuthCallback from './pages/authcallback.tsx';
import ProtectedRoute from './components/protectedRoute.tsx';
import ProtectedPage from './pages/protectedPage.tsx';


export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "auth/callback",
    element: <AuthCallback />,
  },
  {
    path: "welcome",
    element: (
      <ProtectedRoute>
        <ProtectedPage />
      </ProtectedRoute>
    ),
  },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
