import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditLocation = () => {
    const { userId, locationId } = useParams(); // Retrieve userId and locationId from URL parameters
    const navigate = useNavigate();
    const [location, setLocation] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        lat: "",
        long: "",
        image: "",
    });

    useEffect(() => {
        const fetchLocationData = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:8000/api/users/${userId}/locations/${locationId}`
                );
                setLocation(response.data);
                setFormData(response.data); // Populate form data with fetched location data
            } catch (error) {
                setError("Error fetching location data. Please try again.");
                console.error("Error fetching location data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchLocationData();
    }, [userId, locationId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value }); // Update form data on input change
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(
                `http://localhost:8000/api/users/${userId}/locations/${locationId}`,
                formData
            );
            navigate(`/users/${userId}/locations`); // Redirect back to user locations after update
        } catch (error) {
            setError("Error updating location. Please try again.");
            console.error("Error updating location:", error);
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p className="text-red-500">{error}</p>;
    if (!location) return <p>Location not found.</p>;

    return (
        <div className="min-h-screen bg-gray-100 py-8 flex flex-col items-center">
            <h1 className="text-3xl font-semibold mb-6 text-gray-700">
                Edit Location
            </h1>
            <form
                onSubmit={handleSubmit}
                className="bg-white p-6 shadow-md rounded-lg w-full max-w-lg"
            >
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2" htmlFor="name">
                        Name
                    </label>
                    <input
                        className="border rounded w-full py-2 px-3"
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label
                        className="block text-gray-700 mb-2"
                        htmlFor="description"
                    >
                        Description
                    </label>
                    <textarea
                        className="border rounded w-full py-2 px-3"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2" htmlFor="lat">
                        Latitude
                    </label>
                    <input
                        className="border rounded w-full py-2 px-3"
                        type="text"
                        name="lat"
                        value={formData.lat}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2" htmlFor="long">
                        Longitude
                    </label>
                    <input
                        className="border rounded w-full py-2 px-3"
                        type="text"
                        name="long"
                        value={formData.long}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2" htmlFor="image">
                        Image URL
                    </label>
                    <input
                        className="border rounded w-full py-2 px-3"
                        type="text"
                        name="image"
                        value={formData.image}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                >
                    Update Location
                </button>
            </form>
        </div>
    );
};

export default EditLocation;