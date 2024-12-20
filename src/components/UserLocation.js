import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import AddLocation from "./AddLocation";

const UserLocations = ({ user }) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [locations, setLocations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [deleting, setDeleting] = useState(false);
    const token = localStorage.getItem("token");

    useEffect(() => {
        console.log("User ID:", id);
        const fetchUserLocations = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:8000/api/users/${id}/locations`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                setLocations(response.data);
            } catch (error) {
                setError("Error fetching locations. Please try again.");
                console.error("Error fetching locations:", error);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchUserLocations();
        } else {
            setError("Invalid user ID.");
        }
    }, [id, token]);

    const handleEdit = (locationId) => {
        navigate(`/users/${id}/locations/edit/${locationId}`);
    };

    const handleDelete = async (locationId) => {
        if (!token) {
            navigate("/unauthorized");
        }
        const isConfirmed = window.confirm(
            "Та энэ байршлыг устгахдаа итгэлтэй байна уу?"
        );

        if (!isConfirmed) {
            return;
        }
        setDeleting(true);
        try {
            await axios.delete(
                `http://localhost:8000/api/users/${id}/locations/${locationId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setLocations(
                locations.filter((location) => location._id !== locationId)
            );
        } catch (error) {
            setError("Error deleting location. Please try again.");
            console.error("Error deleting location:", error);
        } finally {
            setDeleting(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#FDF7F4] py-8 flex flex-col items-center">
            <h1 className="text-3xl font-semibold mb-6 text-gray-700">
                Хэрэглэгчийн байршил
            </h1>
            {user && <AddLocation userId={id} setLocations={setLocations} />}

            <div className="bg-[#997C70] mt-10 p-6 shadow-md rounded-lg w-full max-w-lg">
                {loading ? (
                    <p>Loading...</p>
                ) : error ? (
                    <p className="text-red-500">{error}</p>
                ) : locations.length > 0 ? (
                    <ul>
                        {locations.map((location) => (
                            <li key={location._id}>
                                {" "}
                                <div className="border border-gray-200 hover:shadow-lg transition rounded-md p-4 mb-4 shadow-sm bg-[#FDF7F4]">
                                    <div className="flex justify-between items-center">
                                        <div className="flex gap-10 items-center">
                                            <Link
                                                to={`/users/${id}/locations/${location._id}`}
                                                className="flex gap-10 items-center"
                                            >
                                                <img
                                                    src={
                                                        location.image ||
                                                        "default-image-url.jpg"
                                                    }
                                                    alt="Location"
                                                    className="mx-auto w-16 h-12 shadow-md"
                                                />
                                                <div>
                                                    <h3 className="text-lg font-semibold text-gray-800">
                                                        {location.name}
                                                    </h3>
                                                </div>
                                            </Link>
                                        </div>
                                        {/* {user ? ( */}
                                        <div className="flex space-x-2">
                                            <button
                                                onClick={() =>
                                                    handleEdit(location._id)
                                                }
                                                className="bg-[#997C70] text-white px-4 py-2 rounded hover:bg-[#7f503c] transition"
                                            >
                                                Засах
                                            </button>
                                            <button
                                                onClick={() =>
                                                    handleDelete(location._id)
                                                }
                                                className="bg-[#d43939] text-white px-4 py-2 rounded hover:bg-[#9f3939] transition"
                                                disabled={deleting}
                                            >
                                                {deleting
                                                    ? "Deleting..."
                                                    : "Устгах"}
                                            </button>
                                        </div>
                                        {/* ) : null} */}
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-[#fff4ef]">
                        Одоогоор байршил бүртгүүлээгүй байна.
                    </p>
                )}
            </div>
        </div>
    );
};

export default UserLocations;
