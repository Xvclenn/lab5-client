// AddLocation.js
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
    const [image, setImage] = useState("");
    const [showInputs, setShowInputs] = useState(false);

    const handleAddLocation = async (e) => {
        e.preventDefault();

        // No need to generate an ID here; the backend will do it
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
                newLocation
            );
            navigate(`/users/${id}/locations`);
        } catch (error) {
            console.error("Error adding location:", error);
        }
    };

    return (
        <div className="bg-white p-6 shadow-md rounded-lg w-full max-w-lg">
            <button
                onClick={() => setShowInputs(!showInputs)}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition w-full mb-4"
            >
                {showInputs ? "Нуух" : "Байршил нэмэх"}
            </button>
            {showInputs && (
                <div className="grid grid-cols-1 gap-4 mb-6">
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
                        className="bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-600 transition w-full"
                    >
                        Байршил нэмэх
                    </button>
                </div>
            )}
        </div>
    );
};

export default AddLocation;
