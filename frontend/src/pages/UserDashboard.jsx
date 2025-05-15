import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "./UserDashboard.module.css";

const UserDashboard = () => {
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = () => {
        axios
            .get(`${import.meta.env.VITE_API_URL}/api/users`)

            .then((res) => setUsers(res.data))
            .catch((err) => {
                console.error(err);
                alert("Error fetching users");
            });
    };

    const handleView = (email) => {
        navigate("/report", { state: { email } });
    };

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this user?")) {
            axios
                .delete(`${import.meta.env.VITE_API_URL}/api/users/${id}`)

                .then(() => {
                    setUsers(users.filter((user) => user._id !== id));
                })
                .catch((err) => {
                    console.error(err);
                    alert("Failed to delete user");
                });
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <h2 className={styles.title}>User Dashboard</h2>

                <div className={styles.tableWrapper}>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Actions</th>
                                <th>Delete</th> {/* New column */}
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user._id}>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.phone}</td>
                                    <td>
                                        <button
                                            onClick={() => handleView(user.email)}
                                            className={styles.button}
                                        >
                                            View Report
                                        </button>
                                    </td>
                                    <td>
                                        <button
                                            onClick={() => handleDelete(user._id)}
                                            className={`${styles.button} ${styles.deleteButton}`}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {users.length === 0 && (
                                <tr>
                                    <td colSpan="5" className={styles.noData}>No users found.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default UserDashboard;
