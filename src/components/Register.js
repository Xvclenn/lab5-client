import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [image, setImage] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:8000/api/register", {
                username,
                password,
                image,
            });
            navigate("/login");
        } catch (error) {
            console.error("Registration failed:", error);
            setError(error);
        }
    };

    return (
        <>
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
                <h2 className="text-2xl font-semibold mb-4">Бүртгүүлэх</h2>
                {error && <p className="text-red-500 mb-4">{error}</p>}{" "}
                <form
                    onSubmit={handleRegister}
                    className="bg-white shadow-md rounded px-8 py-6 w-96"
                >
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Хэрэглэгчийн нэр:
                        </label>
                        <input
                            type="text"
                            value={username}
                            placeholder="Хэрэглэгчийн нэр"
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Нууц үг:
                        </label>
                        <input
                            type="password"
                            value={password}
                            placeholder="Нууц үг"
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Зургийн URL:
                        </label>
                        <input
                            type="text"
                            value={image}
                            placeholder="Зургийн URL"
                            onChange={(e) => setImage(e.target.value)}
                            required
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <div className="flex justify-between">
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            Бүртгүүлэх
                        </button>
                        <button
                            onClick={() => navigate("/")}
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            Буцах
                        </button>
                    </div>
                </form>
                {/* Login Button */}
                <p className="mt-4">
                    <span className="text-gray-700">Бүртгэлтэй юу?</span>
                    <button
                        onClick={() => navigate("/login")}
                        className="text-blue-500 hover:underline ml-1"
                    >
                        Нэвтрэх
                    </button>
                </p>
            </div>
        </>
    );
};

export default Register;
