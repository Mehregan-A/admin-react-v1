"use client";

import React, {useEffect, useState} from 'react';
import {LuRefreshCcw} from "react-icons/lu";

import {useDispatch} from "react-redux";
import {getAsyncCaptcha} from "../../feature/redux/LoginSlice.jsx";

const CaptchaLogIn = ({data,isLoading_captcha}) => {

    const dispatch = useDispatch();

    const getCaptcha = () => {
        dispatch(getAsyncCaptcha());
    };

    return (
        <div className="flex items-center justify-center gap-3">
            <div className="overflow-hidden rounded-lg border w-[150px] h-12 flex items-center justify-center bg-gray-100 dark:bg-dark-card">
                {isLoading_captcha ? (
                    <div className="w-4 h-4 border-2 border-primary-gold border-t-transparent rounded-full animate-spin" />
                ) : (
                    data && (
                        <img width={150} height={50} src={data.image} alt="captcha" className="h-12"/>
                    )
                )}
            </div>

            <button
                type="button"
                onClick={getCaptcha}
                disabled={isLoading_captcha}
                className="goldGradient cursor-pointer p-3 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                title="تغییر کد"
            >
                <LuRefreshCcw
                    className={`text-primary-light ${isLoading_captcha ? "animate-spin" : ""}`}
                />
            </button>
        </div>
    );
};

export default CaptchaLogIn;