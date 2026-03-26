import React from "react";
import Card from "./Card";
import { Link } from "react-router";
import { useContext } from "react";
import { SessionContext } from "../contexts/SessionContext";
import { supabase } from "../utils/supabase";

const EventCard = ({ event }) => {
	const { profile } = useContext(SessionContext);

	const register = async () => {
		const { data, error } = await supabase
			.from("registrations")
			.insert({
				event_id: event.id,
				profile_id: profile.id,
			})
			.select()
			.single();

		if (error) alert(error);
		if (data) console.log("data", data);
	};

	return (
		<Card>
			<h2 className="text-xl font-bold">{event.title}</h2>
			<p>Start Date: {event.start_date}</p>
			<p>End Date: {event.end_date}</p>
			<p>Start Time: {event.start_time}</p>
			<p>End Time: {event.end_time}</p>
			<p>Location: {event.location}</p>

			<div className="pt-5">
				<Link
					to={`/view-event/${event.id}`}
					className="btn btn-primary rounded-full ml-3 btn-outline"
				>
					View
				</Link>

				{profile?.role === "admin" && (
					<>
						<Link
							to={`/edit-event/${event.id}`}
							className="btn btn-primary rounded-full"
						>
							Edit
						</Link>

						<button className="btn btn-secondary rounded-full ml-3">
							Delete
						</button>
					</>
				)}

				{profile?.role === "user" && (
					<button class="ml-3 btn btn-primary rounded-full" onClick={register}>
						Register
					</button>
				)}
			</div>
		</Card>
	);
};

export default EventCard;
