import React from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import Layout from "./pages/Layout.jsx";
import Dashboard from "./pages/dashboard/dashboard.jsx";
import Login from "./pages/auth/Login.jsx";
import CategoryList from "./pages/category/CategoryList.jsx";
import AdminList from "./pages/admin/AdminList.jsx";
import UserList from "./pages/users/UserList.jsx";
import Profile from "./pages/profile/Profile.jsx";
import ListSubCategory from "./pages/subCategory/ListSubCategory.jsx";
import ListProduct from "./pages/product/ListProduct.jsx";
import AddProduct from "./pages/product/AddProduct.jsx";
import BrandList from "./pages/brand/BrandList.jsx";
import ArticleList from "./pages/article/ArticleList.jsx";
import AddArticle from "./pages/article/AddArticle.jsx";
import SliderList from "./pages/slider/SliderList.jsx";
import FaqList from "./pages/faq/FaqList.jsx";
import CouponList from "./pages/coupon/CouponList.jsx";
import CouponAdd from "./pages/coupon/CouponAdd.jsx";


function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="login" element={<Login />} />
                <Route path="/" element={<Layout />}>
                    <Route index element={<Dashboard />} />
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="category/list/:row/:page" element={<CategoryList/>} />
                    <Route path="category/sub/list/:row/:page" element={<ListSubCategory/>} />
                    <Route path="product/list/:row/:page" element={<ListProduct/>} />
                    <Route path="product/add/:id" element={<AddProduct />} />
                    <Route path="article/add/:id" element={<AddArticle />} />
                    <Route path="article/add" element={<AddArticle />} />
                    <Route path="coupon/add/:id" element={<CouponAdd />} />
                    <Route path="coupon/add" element={<CouponAdd />} />
                    <Route path="admin/list/:row/:page" element={<AdminList />} />
                    <Route path="coupon/list/:row/:page" element={<CouponList />} />
                    <Route path="slider/list/:row/:page" element={<SliderList />} />
                    <Route path="faq/list/:row/:page" element={<FaqList />} />
                    <Route path="brand/list/:row/:page" element={<BrandList />} />
                    <Route path="article/list/:row/:page" element={<ArticleList />} />
                    <Route path="user/list/:row/:page" element={<UserList />} />
                    <Route path="/profile" element={<Profile />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}


export default App
