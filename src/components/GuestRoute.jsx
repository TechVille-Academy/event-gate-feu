import { useContext } from "react";
import { SessionContext } from "../contexts/SessionContext";
import { Navigate, Outlet } from "react-router";

const GuestRoute = () => {
	const { session, profile, isLoading } = useContext(SessionContext);

	if (isLoading) return <div>Loading</div>;

	if (session && profile?.role === "admin") {
		return <Navigate to="/manage-events" replace />;
	} else if (session && profile?.role === "user") {
		return <Navigate to="/events" />;
	}

	return <Outlet />;
};

export default GuestRoute;
