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

    useEffect(() => {
        console.log("User ID:", id); // Debugging line to ensure id is passed correctly
        const fetchUserLocations = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:8000/api/users/${id}/locations`
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
    }, [id]);

    const handleEdit = (locationId) => {
        navigate(`/users/${id}/locations/edit/${locationId}`);
    };

    const handleDelete = async (locationId) => {
        const isConfirmed = window.confirm(
            "Та энэ байршлыг устгахдаа итгэлтэй байна уу?"
        );

        if (!isConfirmed) {
            return; // Exit if user cancels the action
        }
        setDeleting(true);
        try {
            await axios.delete(
                `http://localhost:8000/api/users/${id}/locations/${locationId}`
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
        <div className="min-h-screen bg-gray-100 py-8 flex flex-col items-center">
            <h1 className="text-3xl font-semibold mb-6 text-gray-700">
                Хэрэглэгчийн байршил
            </h1>
            {user && <AddLocation userId={id} setLocations={setLocations} />}

            <div className="bg-white mt-10 p-6 shadow-md rounded-lg w-full max-w-lg">
                {loading ? (
                    <p>Loading...</p>
                ) : error ? (
                    <p className="text-red-500">{error}</p>
                ) : locations.length > 0 ? (
                    <ul>
                        {locations.map((location) => (
                            <li key={location._id}>
                                {" "}
                                {/* Ensure _id is used */}
                                <div className="border border-gray-200 hover:shadow-lg transition rounded-md p-4 mb-4 shadow-sm bg-white">
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
                                        {user ? (
                                            <div className="flex space-x-2">
                                                <button
                                                    onClick={() =>
                                                        handleEdit(location._id)
                                                    }
                                                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                                                >
                                                    Засах
                                                </button>
                                                <button
                                                    onClick={() =>
                                                        handleDelete(
                                                            location._id
                                                        )
                                                    }
                                                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                                                    disabled={deleting}
                                                >
                                                    {deleting
                                                        ? "Deleting..."
                                                        : "Устгах"}
                                                </button>
                                            </div>
                                        ) : null}
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-gray-600">Байршил олдсонгүй.</p>
                )}
            </div>
        </div>
    );
};

export default UserLocations;
