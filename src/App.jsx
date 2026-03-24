import "./App.css";
import { Routes, Route } from "react-router";
import HomePage from "./pages/HomePage";
import SignUp from "./pages/SignUp";
import { useState, useEffect } from "react";
import { supabase } from "./utils/supabase";
import { SessionContext } from "./contexts/SessionContext";
import Login from "./pages/Login";
import Profile from "./pages/Profile";

function App() {
	const [session, setSession] = useState(null);

	useEffect(() => {
		const {
			data: { subscription },
		} = supabase.auth.onAuthStateChange((event, session) => {
			console.log("event", event);
			console.log("session", session);
			if (event === "SIGNED_OUT") {
				setSession(null);
			} else if (session) {
				setSession(session);
			}
		});

		return () => {
			subscription.unsubscribe();
		};
	}, []);

	return (
		<SessionContext.Provider value={session}>
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/sign-up" element={<SignUp />} />
				<Route path="/log-in" element={<Login />} />
				<Route path="/profile" element={<Profile />} />
			</Routes>
		</SessionContext.Provider>
	);
}

export default App;
