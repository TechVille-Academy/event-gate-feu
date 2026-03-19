import "./App.css";
import { Routes, Route } from "react-router";
import HomePage from "./pages/HomePage";
import SignUp from "./pages/SignUp";

function App() {
	return (
		<Routes>
			<Route path="/" element={<HomePage />} />
			<Route path="/sign-up" element={<SignUp />} />
		</Routes>
	);
}

export default App;
