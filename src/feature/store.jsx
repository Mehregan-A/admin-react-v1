import {configureStore} from "@reduxjs/toolkit";
import ThemeSlice from "./redux/ThemeSlice.jsx";
import LoginSlice from "./redux/LoginSlice.jsx";
import CategorySlice from "./redux/CategorySlice.jsx";
import AttributeSlice from "./redux/AttributeSlice.jsx";
import AdminSlice from "./redux/AdminSlice.jsx";
import UserSlice from "./redux/UserSlice.jsx";
import ProfileSlice from "./redux/ProfileSlice.jsx";
import CategorySubSlice from "./redux/CategorySubSlice.jsx";
import ProductSlice from "./redux/ProductSlice.jsx";
import BrandSlice from "./redux/BrandSlice.jsx";
import ArticleSlice from "./redux/ArticleSlice.jsx";
import SliderSlice from "./redux/SliderSlice.jsx";
import FaqSlice from "./redux/FaqSlice.jsx";
import CouponSlice from "./redux/CouponSlice.jsx";
import PaymentSlice from "./redux/PaymentSlice.jsx";
import SettingSlice from "./redux/SettingSlice.jsx";
import SmsSlice from "./redux/SmsSlice.jsx";
import OrderSlice from "./redux/OrderSlice.jsx";
import ShippingMethodSlice from "./redux/ShippingMethodSlice.jsx";
import SeoSiteSlice from "./redux/SeoSiteSlice.jsx";
import AttributeValueSlice from "./redux/AttributeValueSlice.jsx";
import VariantAttributeSlice from "./redux/VariantAttributeSlice.jsx";
import VariantAttributeValueSlice from "./redux/VariantAttributeValueSlice.jsx";



export const store = configureStore({
    reducer: {
        theme: ThemeSlice,
        login: LoginSlice,
        category:CategorySlice,
        attribute:AttributeSlice,
        admin:AdminSlice,
        user:UserSlice,
        profile:ProfileSlice,
        subcategory:CategorySubSlice,
        product:ProductSlice,
        brand:BrandSlice,
        article:ArticleSlice,
        slider:SliderSlice,
        faq:FaqSlice,
        coupon:CouponSlice,
        payment:PaymentSlice,
        setting:SettingSlice,
        sms:SmsSlice,
        order:OrderSlice,
        shippingMethod:ShippingMethodSlice,
        seo:SeoSiteSlice,
        attributeVal:AttributeValueSlice,
        variantAttribute:VariantAttributeSlice,
        variantAttributeValue:VariantAttributeValueSlice,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false})
})