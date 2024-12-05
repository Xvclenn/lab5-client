// HomePage.js
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export const HomePage = ({ user, setUser }) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);
    const [selectedUser, setSelectedUser] = useState(null);
    const token = localStorage.getItem("token");

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get(
                    "http://localhost:8000/api/users"
                );
                const data = response.data;
                console.log(data);
                console.log(token);
                setUsers(data);
            } catch (error) {
                console.error("Error fetching users:", error);
                setError("Failed to fetch users.");
            }
        };
        fetchUsers();
    }, [token]);

    useEffect(() => {
        if (id) {
            const fetchUserById = async () => {
                try {
                    const res = await axios.get(
                        `http://localhost:8000/api/users/${id}/locations`,
                        {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        }
                    );
                    setSelectedUser(res.data);
                    console.log(res.data);
                } catch (error) {
                    setError("Failed to fetch user data.");
                    console.error("Error fetching user by ID:", error);
                }
            };
            fetchUserById();
        }
    }, [id, token]);

    const handleLogout = () => {
        setUser(null);
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 py-8">
            <h1 className="text-4xl font-bold mb-4 text-slate-600">Лаб 5</h1>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            {user ? (
                <div className="bg-white shadow-md rounded-lg p-6 max-w-md w-full text-center">
                    <div className="shadow-inner pb-10">
                        <p className="text-xl mb-4 p-5 text-slate-600">
                            Сайн уу!, {user.user.username}.
                        </p>
                        <img
                            src={user.user.image}
                            alt="User"
                            className="mx-auto w-24 h-24 mb-4 rounded-full shadow-md"
                        />
                    </div>
                    <div className="flex justify-center space-x-4">
                        <button
                            onClick={() =>
                                navigate(`/users/${user.user.id}/locations`)
                            }
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                        >
                            Байршлыг харах
                        </button>
                        <button
                            onClick={handleLogout}
                            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                        >
                            Гарах
                        </button>
                    </div>
                </div>
            ) : (
                <div className="bg-white shadow-lg rounded-lg p-6 max-w-md w-full">
                    <h3 className="text-lg font-semibold mb-2 text-slate-600">
                        Хэрэглэгчийн жагсаалт
                    </h3>
                    {!selectedUser ? (
                        <div className="mb-4 p-4 bg-white  shadow-inner rounded-lg  max-h-60 overflow-y-auto">
                            <ul className="space-y-2">
                                {users.length > 0 ? (
                                    users.map((userItem) => (
                                        <li key={userItem._id}>
                                            <button
                                                onClick={() =>
                                                    navigate(
                                                        `/users/${userItem._id}/locations`
                                                    )
                                                }
                                                className="w-full text-left text-blue-500 transition-colors duration-200 ease-in-out py-2 px-4 rounded-lg border border-transparent hover:border-blue-300 hover:bg-blue-50"
                                            >
                                                {userItem.username}
                                            </button>
                                        </li>
                                    ))
                                ) : (
                                    <p className="text-gray-600">
                                        Хэрэглэгч олдсонгүй.
                                    </p>
                                )}
                            </ul>
                        </div>
                    ) : (
                        <></>
                    )}

                    <p className="mb-4 text-center text-slate-400">
                        Програмд ​​нэвтрэхийн тулд нэвтэрч эсвэл бүртгүүлнэ үү.
                    </p>
                    <div className="flex justify-center space-x-4">
                        <button
                            onClick={() => navigate("/login")}
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                        >
                            Нэвтрэх
                        </button>
                        <button
                            onClick={() => navigate("/register")}
                            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
                        >
                            Бүртгүүлэх
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};
