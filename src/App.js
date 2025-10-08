import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginScreen from "./pages/Login";
import PrivateRoute from "./components/PrivateRoute";
import { Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import UserRegisteration from "./pages/Register";
import UserProfile from "./pages/Profile";
import UserTablePage from "./pages/Users";

function App() {
  return (
    <Router>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"
      />
      <Routes>
        <Route path="/" element={<LoginScreen />} />
        <Route path="/register" element={<UserRegisteration />} />

        <Route
          path="/dashboard"
          element={<PrivateRoute>{/* <Dashboard /> */}</PrivateRoute>}
        />

        <Route
          path="/profile"
          element={<PrivateRoute>{<UserProfile />}</PrivateRoute>}
        />

        <Route
          path="/users"
          element={<PrivateRoute>{<UserTablePage />}</PrivateRoute>}
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
