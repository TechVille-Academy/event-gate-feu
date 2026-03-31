import "./App.css";
import { Routes, Route, useNavigate } from "react-router";
import HomePage from "./pages/HomePage";
import SignUp from "./pages/SignUp";
import { useState, useEffect } from "react";
import { supabase } from "./utils/supabase";
import { SessionContext } from "./contexts/SessionContext";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";
import ManageEvents from "./pages/ManageEvents";
import AddEvent from "./pages/AddEvent";
import EditEvent from "./pages/EditEvent";
import Events from "./pages/Events";
import ProtectedRoute from "./components/ProtectedRoute";
import GuestRoute from "./components/GuestRoute";

function App() {
	const [session, setSession] = useState(null);
	const [profile, setProfile] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const navigate = useNavigate();

	useEffect(() => {
		const {
			data: { subscription },
		} = supabase.auth.onAuthStateChange((event, session) => {
			console.log("event", event);
			console.log("session", session);
			if (event === "SIGNED_OUT") {
				setIsLoading(false);
				setSession(null);
				setProfile(null);
				navigate("/log-in");
			} else if (session) {
				setIsLoading(false);
				setSession(session);
			}
		});

		return () => {
			subscription.unsubscribe();
		};
	}, [navigate]);

	useEffect(() => {
		const fetchProfile = async () => {
			const { data, error } = await supabase
				.from("profiles")
				.select()
				.eq("id", session.user.id)
				.maybeSingle();

			if (error) alert(error);
			if (data) {
				setProfile(data);
			}
		};

		if (session) {
			fetchProfile();
		}
	}, [session]);

	return (
		<SessionContext.Provider
			value={{ session, profile, setProfile, isLoading }}
		>
			<Routes>
				<Route path="/" element={<HomePage />} />

				<Route element={<GuestRoute />}>
					<Route path="/sign-up" element={<SignUp />} />
					<Route path="/log-in" element={<Login />} />
				</Route>

				<Route element={<ProtectedRoute allowedRoles={["user", "admin"]} />}>
					<Route path="/events" element={<Events />} />
					<Route path="/profile" element={<Profile />} />
					<Route path="/edit-profile" element={<EditProfile />} />
				</Route>

				<Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
					<Route path="/manage-events" element={<ManageEvents />} />
					<Route path="/add-event" element={<AddEvent />} />
					<Route path="/edit-event/:eventId" element={<EditEvent />} />
				</Route>
			</Routes>
		</SessionContext.Provider>
	);
}

export default App;
