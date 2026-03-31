import { useContext } from "react";
import { Navigate, Outlet } from "react-router";
import { SessionContext } from "../contexts/SessionContext";

const ProtectedRoute = ({ allowedRoles }) => {
	const { isLoading, session, profile } = useContext(SessionContext);

	if (isLoading) return <div>Loading</div>;

	if (!session) return <Navigate to="/" replace />;

	if (allowedRoles && profile) {
		if (!allowedRoles.includes(profile.role)) {
			return <Navigate to="/" replace />;
		}
	}

	return <Outlet />;
};

export default ProtectedRoute;
