import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "./SearchUsers.module.css";

const SearchUsers = () => {
    const [query, setQuery] = useState("");
    const [filtered, setFiltered] = useState([]);
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get("http://localhost:5000/api/users")
            .then((res) => setUsers(res.data))
            .catch((err) => {
                console.error(err);
                alert("Error loading users");
            });
    }, []);

    useEffect(() => {
        const lower = query.toLowerCase();
        const results = users.filter(
            (u) =>
                u.name.toLowerCase().includes(lower) ||
                u.email.toLowerCase().includes(lower) ||
                u.phone.toLowerCase().includes(lower)
        );
        setFiltered(results);
    }, [query, users]);

    const handleView = (email) => {
        navigate("/report", { state: { email } });
    };

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <h2 className={styles.title}>Search Users</h2>

                <input
                    type="text"
                    placeholder="Search by name, email, or phone..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className={styles.input}
                />

                {filtered.length > 0 ? (
                    <ul className={styles.userList}>
                        {filtered.map((user) => (
                            <li key={user._id} className={styles.userCard}>
                                <div>
                                    <p className={styles.userName}>{user.name}</p>
                                    <p className={styles.userEmail}>{user.email}</p>
                                    <p className={styles.userPhone}>{user.phone}</p>
                                </div>
                                <button
                                    onClick={() => handleView(user.email)}
                                    className={styles.button}
                                >
                                    View Report
                                </button>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className={styles.noResults}>No users match your search.</p>
                )}
            </div>
        </div>
    );
};

export default SearchUsers;
