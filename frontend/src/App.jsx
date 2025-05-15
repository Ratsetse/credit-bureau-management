import { Routes, Route, Navigate } from "react-router-dom";
import CreateUser from "./pages/CreateUser";
import CreateReport from "./pages/CreateReport";
import ViewReport from "./pages/ViewReport";
import UserDashboard from "./pages/UserDashboard";
import SearchUsers from "./pages/SearchUsers";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import LoginPage from "./pages/LoginPage";
import { useAuth } from "./context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/loginpage" />;
};

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/loginpage" element={<LoginPage />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <CreateUser />
            </ProtectedRoute>
          }
        />
        <Route
          path="/create-report"
          element={
            <ProtectedRoute>
              <CreateReport />
            </ProtectedRoute>
          }
        />
        <Route
          path="/report"
          element={
            <ProtectedRoute>
              <ViewReport />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <UserDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/search"
          element={
            <ProtectedRoute>
              <SearchUsers />
            </ProtectedRoute>
          }
        />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
