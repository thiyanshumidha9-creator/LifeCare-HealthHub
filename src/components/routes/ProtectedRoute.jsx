// Protected Route Component (Lectures 37–42: Protected Routes & Auth State)
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import LoadingSpinner from "../common/LoadingSpinner";

export function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="container" style={{ minHeight: "50vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <LoadingSpinner text="Checking authentication session..." />
      </div>
    );
  }

  if (!isAuthenticated) {
    // Redirect to login page and preserve the intended destination
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

export default ProtectedRoute;
