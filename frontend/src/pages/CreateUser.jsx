import { useState } from "react";
import axios from "axios";
import styles from "./CreateUser.module.css";

const CreateUser = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
    });

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:5000/api/users", formData);
            alert("User created successfully!");
            setFormData({ name: "", email: "", phone: "" });
        } catch (err) {
            alert("Error creating user.");
            console.error(err);
        }
    };

    return (
        <div className={styles.container}>
            <form onSubmit={handleSubmit} className={styles.form}>
                <h2 className={styles.title}>Create New User</h2>

                <input
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Full Name"
                    required
                    className={styles.input}
                />
                <input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email"
                    required
                    className={styles.input}
                />
                <input
                    name="phone"
                    type="text"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Phone Number"
                    required
                    className={styles.input}
                />

                <button type="submit" className={styles.button}>
                    Create User
                </button>
            </form>
        </div>
    );
};

export default CreateUser;
