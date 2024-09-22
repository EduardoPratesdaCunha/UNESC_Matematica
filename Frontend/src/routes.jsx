import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Clean from './components/Layouts/Clean';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Index from "./Pages/Simulate/index";
import Auth from "./components/Layouts/Auth";
import Create from "./Pages/Simulate/create/index";
import Edit from "./Pages/Simulate/edit/index";
import Register from "./Pages/Register";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<Home />} />

        <Route path="/" element={<Clean />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        <Route path="simulate" element={<Auth />}>
          <Route path="index" element={<Index />} />
          <Route path="create" element={<Create />} />
          <Route path="edit/:id" element={<Edit />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}


