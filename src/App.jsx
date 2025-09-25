import React from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import Layout from "./pages/Layout.jsx";
import Dashboard from "./pages/dashboard/dashboard.jsx";
import Login from "./pages/auth/Login.jsx";
import CategoryList from "./pages/category/CategoryList.jsx";


function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="login" element={<Login />} />
                <Route path="/" element={<Layout />}>
                    <Route index element={<Dashboard />} />
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="category/list/:row/:page" element={<CategoryList/>} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}


export default App
