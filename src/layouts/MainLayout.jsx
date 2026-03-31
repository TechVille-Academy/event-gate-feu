import React from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

const MainLayout = ({ children, className }) => {
	return (
		<div className="flex flex-col min-h-screen">
			<NavBar />
			<main className={`max-w-7xl w-full mx-auto flex-1 ${className}`}>
				{children}
			</main>
			<Footer />
		</div>
	);
};

export default MainLayout;
