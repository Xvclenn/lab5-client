import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const LocationDetailPage = () => {
    const { userId, locationId } = useParams();
    const navigate = useNavigate();
    const [location, setLocation] = useState(null);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const token = localStorage.getItem("token");

    useEffect(() => {
        setLoading(true);
        axios
            .get(
                `http://localhost:8000/api/users/${userId}/locations/${locationId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )
            .then((response) => {
                setLocation(response.data);
            })
            .catch((error) => {
                console.error("Error fetching location details:", error);
                setErrorMessage("Байршлын мэдээлэл авахад алдаа гарлаа.");
            })
            .finally(() => {
                setLoading(false);
            });
    }, [userId, locationId, token]);

    const handleBack = () => {
        navigate(`/users/${userId}/locations`);
    };

    if (loading) {
        return <p>Байршлын мэдээлэл ачааллаж байна...</p>;
    }

    if (errorMessage) {
        return <p className="text-red-500">{errorMessage}</p>;
    }

    return (
        <div className="bg-[#FDF7F4] p-10 m-10 shadow-md rounded-lg">
            <button
                onClick={handleBack}
                className="bg-gray-500 text-white py-2 px-4 rounded mb-6"
            >
                Буцах
            </button>
            {location && (
                <>
                    <h2 className="text-2xl font-semibold mb-4">
                        {location.name}
                    </h2>
                    <div className="flex gap-10">
                        <div className="flex-1 w-[500px]">
                            <img
                                src={location.image}
                                alt={location.name}
                                className="w-full rounded"
                                width={500}
                            />
                        </div>
                        <div className="flex-1 flex flex-col gap-5 text-justify">
                            <p>
                                <strong>Тайлбар:</strong> {location.description}
                            </p>
                            <p>
                                <strong>Өндөр:</strong> {location.lat}
                            </p>
                            <p>
                                <strong>Уртраг:</strong> {location.long}
                            </p>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default LocationDetailPage;
