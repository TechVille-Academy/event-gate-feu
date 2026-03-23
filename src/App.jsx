import "./App.css";
import { Routes, Route } from "react-router";
import HomePage from "./pages/HomePage";
import SignUp from "./pages/SignUp";
import { useState, useEffect } from "react"; // object destructuring
import { supabase } from "./utils/supabase";
import { SessionContext } from "./contexts/SessionContext";

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
			</Routes>
		</SessionContext.Provider>
	);
}

export default App;
