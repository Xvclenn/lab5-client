import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = ({ user }) => {
    const navigate = useNavigate();
    return (
        <nav className="bg-[#A59D84] p-5 shadow-lg sticky top-0">
            <div className="flex px-10 justify-between w-full items-center">
                <Link
                    to="/"
                    className="text-[#FDF7F4] uppercase italic text-2xl font-bold"
                >
                    Лаборатори
                </Link>

                {!user ? (
                    <div className="flex justify-center space-x-4">
                        <button
                            onClick={() => navigate("/login")}
                            className="bg-[#83685f] text-[#FDF7F4] px-4 py-2 rounded hover:bg-[#685752] transition"
                        >
                            Нэвтрэх
                        </button>
                        <button
                            onClick={() => navigate("/register")}
                            className="bg-[#66a657] text-[#FDF7F4] px-4 py-2 rounded hover:bg-[#4c9c3a] transition"
                        >
                            Бүртгүүлэх
                        </button>
                    </div>
                ) : (
                    <div className="flex">
                        <p className="p-5 text-xl text-[#24170f]">
                            {user.user.username}.
                        </p>
                        <img
                            src={user.user.image}
                            alt="User"
                            className="mx-auto w-14 h-14 bg-white border-2 border-[#24170f] p-2 rounded-full shadow-md"
                        />
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
