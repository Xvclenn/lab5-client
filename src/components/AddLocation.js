import React, { useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const AddLocation = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [lat, setLat] = useState("");
    const [long, setLong] = useState("");
    const [image, setImage] = useState(
        "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Flag_of_Mongolia.svg/1200px-Flag_of_Mongolia.svg.png"
    );
    const [showInputs, setShowInputs] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const token = localStorage.getItem("token");

    const validateForm = () => {
        if (!name || !description || !lat || !long || !image) {
            return "Бүх талбарыг бөглөх ёстой.";
        }
        if (isNaN(lat) || isNaN(long)) {
            return "Өндөр, уртрагын утгууд зөв байх ёстой.";
        }
        return "";
    };

    const handleAddLocation = async (e) => {
        e.preventDefault();

        const validationError = validateForm();
        if (validationError) {
            setErrorMessage(validationError);
            return;
        }

        setLoading(true);
        setErrorMessage("");

        const newLocation = {
            name,
            description,
            lat,
            long,
            image,
        };

        try {
            await axios.post(
                `http://localhost:8000/api/users/${id}/locations`,
                newLocation,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            navigate(`/users/${id}/locations`);
        } catch (error) {
            console.error("Error adding location:", error);
            setErrorMessage("Байршил нэмэхэд алдаа гарлаа.");
            // navigate("/unauthorized");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-[#FDF7F4] p-6 shadow-md rounded-lg w-full max-w-lg">
            <button
                onClick={() => setShowInputs(!showInputs)}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition w-full mb-4"
            >
                {showInputs ? "Нуух" : "Байршил нэмэх"}
            </button>
            {showInputs && (
                <div className="grid grid-cols-1 gap-4 mb-6">
                    {errorMessage && (
                        <p className="text-red-500 text-center mb-4">
                            {errorMessage}
                        </p>
                    )}
                    <input
                        type="text"
                        placeholder="Location Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="border rounded px-4 py-2 w-full"
                    />
                    <input
                        type="text"
                        placeholder="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                        className="border rounded px-4 py-2 w-full"
                    />
                    <input
                        type="text"
                        placeholder="Latitude"
                        value={lat}
                        onChange={(e) => setLat(e.target.value)}
                        required
                        className="border rounded px-4 py-2 w-full"
                    />
                    <input
                        type="text"
                        placeholder="Longitude"
                        value={long}
                        onChange={(e) => setLong(e.target.value)}
                        required
                        className="border rounded px-4 py-2 w-full"
                    />
                    <input
                        type="text"
                        placeholder="Image URL"
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                        required
                        className="border rounded px-4 py-2 w-full"
                    />
                    <button
                        onClick={handleAddLocation}
                        className={`bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-600 transition w-full ${
                            loading ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                        disabled={loading}
                    >
                        {loading ? "Тамга хийх..." : "Байршил нэмэх"}
                    </button>
                </div>
            )}
        </div>
    );
};

export default AddLocation;
