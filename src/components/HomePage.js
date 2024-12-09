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
        <div className="h-[90vh] flex flex-col justify-center items-center bg-[#FDF7F4] py-8">
            {error && <p className="text-red-500 mb-4">{error}</p>}
            {user ? (
                <div className=" p-6 max-w-md w-full text-center">
                    <div className="pb-10">
                        <p className="text-3xl mb-4 p-5 text-[#483932]">
                            Сайн уу 👋🏻 {user.user.username}.
                        </p>
                    </div>
                    <div className="flex justify-center space-x-4">
                        <button
                            onClick={() =>
                                navigate(`/users/${user.user.id}/locations`)
                            }
                            className="bg-[#83685f] text-[#FDF7F4] px-4 py-2 rounded hover:bg-[#685752] transition"
                        >
                            Байршлыг харах
                        </button>
                        <button
                            onClick={handleLogout}
                            className="bg-[#d43939] text-[#FDF7F4] px-4 py-2 rounded hover:bg-[#9f3939] transition"
                        >
                            Гарах
                        </button>
                    </div>
                </div>
            ) : (
                <div className="bg-[#997C70] shadow-lg rounded-lg p-6 max-w-md w-full">
                    <h3 className="text-lg font-semibold mb-2 text-[#FDF7F4]">
                        Хэрэглэгчийн жагсаалт
                    </h3>
                    {!selectedUser ? (
                        <div className="mb-4 p-4 bg-[#bfb8b4]  shadow-inner rounded-lg ">
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
                                                className="w-full text-left text-[#2d1913] transition-colors duration-200 ease-in-out py-2 px-4 rounded-lg border border-transparent hover:border-[#2d1913] hover:bg-[#c1b3a5]"
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

                    <p className="mb-4 text-center text-[#FDF7F4]">
                        Нэвтэрч эсвэл бүртгүүлнэ үү.
                    </p>
                </div>
            )}
        </div>
    );
};
