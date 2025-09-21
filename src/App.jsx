import React from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import Layout from "./pages/Layout.jsx";
import Dashboard from "./pages/dashboard/dashboard.jsx";
import Login from "./pages/auth/Login.jsx";


function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Dashboard />} />
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="login" element={<Login />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}


export default App
