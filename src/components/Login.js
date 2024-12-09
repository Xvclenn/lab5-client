//components/Login.js
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = ({ setUser }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [validationError, setValidationError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setValidationError("");

        if (!username || !password) {
            setValidationError("Хэрэглэгчийн нэр болон нууц үг оруулна уу.");
            setLoading(false);
            return;
        }

        try {
            const response = await axios.post(
                "http://localhost:8000/api/auth/login",
                {
                    username,
                    password,
                }
            );

            const { token, user } = response.data;

            localStorage.setItem("token", token);

            localStorage.setItem("user", JSON.stringify(user));

            setUser(response.data);
            localStorage.setItem("user", JSON.stringify(response.data));
            navigate("/");
        } catch (error) {
            console.error("Login failed:", error);

            if (error.response && error.response.data) {
                setError(
                    error.response.data.error || "Нэвтрэхэд алдаа гарлаа."
                );
            } else {
                setError("Нэвтрэхэд алдаа гарлаа.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className="flex flex-col items-center justify-center min-h-screen bg-[#FDF7F4]">
                <h2 className="text-2xl font-semibold mb-4">Нэвтрэх</h2>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                {validationError && (
                    <p className="text-red-500 mb-4">{validationError}</p>
                )}{" "}
                <form
                    onSubmit={handleLogin}
                    className="bg-[#997C70] shadow-md rounded px-8 py-6 w-96"
                >
                    <div className="mb-4">
                        <label className="block text-[#fffbfb] text-sm font-bold mb-2">
                            Хэрэглэгчийн нэр:
                        </label>
                        <input
                            type="text"
                            value={username}
                            placeholder="Хэрэглэгчийн нэр"
                            onChange={(e) => setUsername(e.target.value)}
                            className={`${
                                !validationError
                                    ? "border-gray-300"
                                    : "border-red-500"
                            } shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-[#fffbfb] text-sm font-bold mb-2">
                            Нууц үг:
                        </label>
                        <input
                            type="password"
                            value={password}
                            placeholder="Нууц үг"
                            onChange={(e) => setPassword(e.target.value)}
                            className={`${
                                !validationError
                                    ? "border-gray-300"
                                    : "border-red-500"
                            } shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                        />
                    </div>
                    <div className="flex justify-between">
                        <button
                            type="submit"
                            disabled={loading}
                            className={`bg-[#4c6e3b] text-[#FDF7F4] px-4 py-2 rounded hover:bg-[#3e622d] transition ${
                                loading ? "opacity-50 cursor-not-allowed" : ""
                            }`}
                        >
                            {loading ? "Нэвтэрж байна" : "Нэвтрэх"}
                        </button>
                        <button
                            onClick={() => navigate("/")}
                            className="bg-[#83685f] text-[#FDF7F4] px-4 py-2 rounded hover:bg-[#685752] transition"
                        >
                            Буцах
                        </button>
                    </div>
                </form>
                <p className="mt-4">
                    <span className="text-gray-700">
                        Хэрэв бүртгүүлээгүй бол?
                    </span>
                    <button
                        onClick={() => navigate("/register")}
                        className="text-[#4c6e3b] hover:underline ml-1"
                    >
                        Бүртгүүлэх
                    </button>
                </p>
            </div>
        </>
    );
};

export default Login;
