import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Register = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [image, setImage] = useState(
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
    );
    const [error, setError] = useState("");
    const [validationError, setValidationError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [requirements, setRequirements] = useState({
        length: false,
        uppercase: false,
        lowercase: false,
        number: false,
        specialChar: false,
    });
    const navigate = useNavigate();

    const checkPasswordRequirements = (password) => {
        setRequirements({
            length: password.length >= 6,
            uppercase: /[A-Z]/.test(password),
            lowercase: /[a-z]/.test(password),
            number: /\d/.test(password),
            specialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
        });
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setError("");

        if (!validateForm()) {
            return;
        }

        try {
            await axios.post("http://localhost:8000/api/auth/register", {
                username,
                password,
                image,
            });
            navigate("/login");
        } catch (error) {
            console.error("Registration failed:", error);
            if (error.response && error.response.data) {
                setError(
                    error.response.data.error ||
                        "An error occurred during registration."
                );
            } else {
                setError("An error occurred during registration.");
            }
        }
    };

    const validateForm = () => {
        setValidationError("");

        if (!username) {
            setValidationError("Хэрэглэгчийн нэрийг оруулна уу.");
            return false;
        }

        if (username.length < 3) {
            setValidationError(
                "Хэрэглэгчийн нэр нь 3-с багагүй тэмдэгттэй байх ёстой."
            );
            return false;
        }

        if (!password) {
            setValidationError("Нууц үгийг оруулна уу.");
            return false;
        }

        if (password.length < 6) {
            setValidationError("Нууц үг нь дор хаяж 6 тэмдэгттэй байх ёстой.");
            return false;
        }

        try {
            new URL(image);
        } catch (_) {
            setValidationError("Зургийн URL нь зөв байж байх ёстой.");
            return false;
        }

        return true;
    };

    return (
        <>
            <div className="flex flex-col items-center justify-center min-h-screen bg-[#FDF7F4]">
                <h2 className="text-2xl font-semibold mb-4">Бүртгүүлэх</h2>
                {error && <p className="text-[#fffbfb] mb-4">{error}</p>}
                {validationError && (
                    <p className="text-[#fffbfb] mb-4">{validationError}</p>
                )}
                <form
                    onSubmit={handleRegister}
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
                            // required
                            className={`${
                                !validationError
                                    ? "border-gray-300"
                                    : "border-red-500"
                            } shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                        />
                    </div>
                    <div className="mb-4 relative">
                        <label className="block text-[#fffbfb] text-sm font-bold mb-2">
                            Нууц үг:
                        </label>
                        <input
                            type={showPassword ? "text" : "password"}
                            value={password}
                            placeholder="Нууц үг"
                            onChange={(e) => {
                                setPassword(e.target.value);
                                checkPasswordRequirements(e.target.value);
                            }}
                            // required
                            className={`${
                                !validationError
                                    ? "border-gray-300"
                                    : "border-red-500"
                            } shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute top-10 right-5 flex items-center text-gray-600"
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                        {password ? (
                            <div className="text-sm mt-2">
                                <p
                                    className={`${
                                        requirements.length
                                            ? "text-green-500"
                                            : "text-[#f9c55f]"
                                    }`}
                                >
                                    - Нууц үгийн урт 6 ба түүнээс дээш тэмдэгт
                                    байх ёстой
                                </p>
                                <p
                                    className={`${
                                        requirements.uppercase
                                            ? "text-green-500"
                                            : "text-[#f9c55f]"
                                    }`}
                                >
                                    - Дээд бичиглэл (A-Z) байх ёстой
                                </p>
                                <p
                                    className={`${
                                        requirements.lowercase
                                            ? "text-green-500"
                                            : "text-[#f9c55f]"
                                    }`}
                                >
                                    - Доод бичиглэл (a-z) байх ёстой
                                </p>
                                <p
                                    className={`${
                                        requirements.number
                                            ? "text-green-500"
                                            : "text-[#f9c55f]"
                                    }`}
                                >
                                    - Тоо байх ёстой
                                </p>
                                <p
                                    className={`${
                                        requirements.specialChar
                                            ? "text-green-500"
                                            : "text-[#f9c55f]"
                                    }`}
                                >
                                    - Тусгай тэмдэгт (@, #, $, %) байх ёстой
                                </p>
                            </div>
                        ) : null}
                    </div>
                    <div className="mb-4">
                        <label className="block text-[#fffbfb] text-sm font-bold mb-2">
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
                            className="bg-[#4c6e3b] text-[#FDF7F4] px-4 py-2 rounded hover:bg-[#3e622d] transition"
                        >
                            Бүртгүүлэх
                        </button>
                        <button
                            onClick={() => navigate("/")}
                            className="bg-[#83685f] text-[#FDF7F4] px-4 py-2 rounded hover:bg-[#685752] transition"
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
                        className="text-[#4c6e3b]  hover:underline ml-1"
                    >
                        Нэвтрэх
                    </button>
                </p>
            </div>
        </>
    );
};

export default Register;
