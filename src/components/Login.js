import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = ({ setUser }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [validationError, setValidationError] = useState(""); // Validation error state
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(""); // Clear any previous errors
        setValidationError(""); // Clear validation errors

        // Validate form fields
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

            setUser(response.data); // Set user data to global state (if required)
            localStorage.setItem("user", JSON.stringify(response.data)); // Save user info to localStorage
            navigate("/"); // Navigate to home page on successful login
        } catch (error) {
            console.error("Login failed:", error);

            // Check for specific error response from the backend
            if (error.response && error.response.data) {
                setError(
                    error.response.data.error || "Нэвтрэхэд алдаа гарлаа."
                );
            } else {
                setError("Нэвтрэхэд алдаа гарлаа.");
            }
        } finally {
            setLoading(false); // Stop loading state after login attempt
        }
    };

    return (
        <>
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
                <h2 className="text-2xl font-semibold mb-4">Нэвтрэх</h2>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                {validationError && (
                    <p className="text-red-500 mb-4">{validationError}</p>
                )}{" "}
                {/* Display validation error */}
                <form
                    onSubmit={handleLogin}
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
                            // required
                            className={`${
                                !validationError
                                    ? "border-gray-300"
                                    : "border-red-500"
                            } shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
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
                            // required
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
                            className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
                                loading ? "opacity-50 cursor-not-allowed" : ""
                            }`}
                        >
                            {loading ? "Нэвтэрж байна" : "Нэвтрэх"}
                        </button>
                        <button
                            onClick={() => navigate("/")}
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            Буцах
                        </button>
                    </div>
                </form>
                {/* Register Button */}
                <p className="mt-4">
                    <span className="text-gray-700">
                        Хэрэв бүртгүүлээгүй бол?
                    </span>
                    <button
                        onClick={() => navigate("/register")}
                        className="text-blue-500 hover:underline ml-1"
                    >
                        Бүртгүүлэх
                    </button>
                </p>
            </div>
        </>
    );
};

export default Login;
