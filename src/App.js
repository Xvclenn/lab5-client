import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserList from "./components/UserList";
import Login from "./components/Login";
import Register from "./components/Register";
import UserLocations from "./components/UserLocation";
import AddLocation from "./components/AddLocation";
import { HomePage } from "./components/HomePage";
import EditLocation from "./components/EditLocation";
import Navbar from "./components/Navbar";

const App = () => {
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem("user");
        return savedUser ? JSON.parse(savedUser) : null;
    });

    return (
        <Router>
            <Navbar />
            <Routes>
                <Route
                    path="/"
                    element={<HomePage user={user} setUser={setUser} />}
                />

                <Route path="/login" element={<Login setUser={setUser} />} />
                <Route path="/register" element={<Register />} />
                <Route path="/users" element={<UserList />} />
                <Route
                    path="/users/:id/locations"
                    element={<UserLocations user={user} />}
                />
                <Route
                    path="/users/:id/locations/add"
                    element={<AddLocation />}
                />
                <Route
                    path="/users/:userId/locations/edit/:locationId"
                    element={<EditLocation />}
                />
            </Routes>
        </Router>
    );
};

export default App;
