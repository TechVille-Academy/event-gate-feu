import { useContext, useEffect, useRef } from "react";
import { SessionContext } from "../contexts/SessionContext";
import { Navigate, Outlet } from "react-router";
import LoadingModal from "./LoadingModal";

const GuestRoute = () => {
	const { session, profile, isLoading } = useContext(SessionContext);
	const loadingModalRef = useRef();

	useEffect(() => {
		if (isLoading) {
			loadingModalRef?.current?.showModal();
		} else {
			loadingModalRef?.current?.close();
		}
	}, [isLoading]);

	if (session && profile?.role === "admin") {
		return <Navigate to="/manage-events" replace />;
	} else if (session && profile?.role === "user") {
		return <Navigate to="/events" />;
	}

	return (
		<>
			<LoadingModal ref={loadingModalRef} />
			<Outlet />
		</>
	);
};

export default GuestRoute;
