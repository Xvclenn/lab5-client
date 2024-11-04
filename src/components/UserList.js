import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const UserList = ({ user }) => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            const response = await axios.get("http://localhost:8000/api/users");
            setUsers(response.data);
            console.log(response);
        };
        fetchUsers();
    }, []);

    return (
        <div>
            <h2>User List</h2>
            <ul>
                {users.map((u) => (
                    <li key={u.id}>
                        {u.username}
                        {user && (
                            <Link to={`/users/${u.id}/locations`}>
                                View Locations
                            </Link>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserList;
