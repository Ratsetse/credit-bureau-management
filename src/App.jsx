import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CreateUser from "./pages/CreateUser";
import CreateReport from "./pages/CreateReport";
import ViewReport from "./pages/ViewReport";
import UserDashboard from "./pages/UserDashboard";
import SearchUsers from "./pages/SearchUsers";
import Navbar from "./components/Navbar"; // ✅
import Footer from "./components/Footer";
// ...


function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<CreateUser />} />
        <Route path="/create-report" element={<CreateReport />} />
        <Route path="/report" element={<ViewReport />} />
        <Route path="/dashboard" element={<UserDashboard />} />
        <Route path="/search" element={<SearchUsers />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
