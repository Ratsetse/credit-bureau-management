import { useLocation, Link, useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";
import styles from "./Navbar.module.css";

const Navbar = () => {
    const { theme, toggleTheme } = useTheme();
    const { isAuthenticated, logout, user } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();

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
                    {isAuthenticated &&
                        links.map((link) => (
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

            <div className={styles.right}>
                {isAuthenticated && (
                    <span className={styles.userWelcome}>Welcome, {user?.username}</span>
                )}
                {isAuthenticated ? (
                    <button
                        onClick={() => {
                            logout();
                            navigate("/loginpage");
                        }}
                        className={styles.logout}
                    >
                        Logout
                    </button>
                ) : (
                    <Link to="/loginpage" className={styles.link}>
                        Login
                    </Link>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
