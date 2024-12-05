// UnauthorizedPage.js
import React from "react";
import { useNavigate } from "react-router-dom";

const UnauthorizedPage = () => {
    const navigate = useNavigate();
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h2 className="text-2xl font-semibold mb-4">
                Та энэ хуудас руу орох эрхгүй байна.
            </h2>
            <button onClick={() => navigate("/login")}>
                Дахин нэвтэрнэ үү.
            </button>
        </div>
    );
};

export default UnauthorizedPage;
