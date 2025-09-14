import React from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import Layout from "./pages/Layout.jsx";


function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />} />
            </Routes>
        </BrowserRouter>
    );
}


export default App
