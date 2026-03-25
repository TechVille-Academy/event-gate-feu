import React from "react";
import MainLayout from "../layouts/MainLayout";
import { Link } from "react-router";

const ManageEvents = () => {
	return (
		<MainLayout>
			<div className="pt-5">
				<div className="text-right">
					<Link to="/add-event" className="btn btn-primary rounded-full">
						Add Event
					</Link>
				</div>
				<div>We load the events here</div>
			</div>
		</MainLayout>
	);
};

export default ManageEvents;
