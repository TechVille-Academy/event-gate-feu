import React from "react";
import NavBar from "../components/NavBar";

const MainLayout = ({ children }) => {
	return (
		<div>
			<NavBar />
			<main className="max-w-7xl w-full mx-auto">{children}</main>
		</div>
	);
};

export default MainLayout;
