import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const citizenId = localStorage.getItem("citizenId"); 
  return citizenId ? children : <Navigate to="/" replace />;
};

export default PrivateRoute;
