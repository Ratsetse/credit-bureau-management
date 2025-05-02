import { useLocation, Link } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import styles from "./Navbar.module.css";

const Navbar = () => {
    const { theme, toggleTheme } = useContext(ThemeContext);
    const location = useLocation();

    const isActive = (path) => location.pathname === path;

    const links = [
        { label: "Create User", to: "/" },
        { label: "Create Report", to: "/create-report" },
        { label: "View Report", to: "/report" },
        { label: "Dashboard", to: "/dashboard" },
        { label: "Search", to: "/search" },
    ];

    return (
        <nav className={styles.nav}>
            <div className={styles.left}>
                <div className={styles.logo}>📊 Credit Bureau</div>
                <ul className={styles.menu}>
                    {links.map((link) => (
                        <li key={link.to}>
                            <Link
                                to={link.to}
                                className={`${styles.link} ${isActive(link.to) ? styles.active : ""}`}
                            >
                                {link.label}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>

            <button onClick={toggleTheme} className={styles.themeToggle}>
                {theme === "dark" ? "☀️ Light" : "🌙 Dark"}
            </button>
        </nav>
    );
};

export default Navbar;
