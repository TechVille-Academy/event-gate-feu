import React from "react";
import MainLayout from "../layouts/MainLayout";
import Input from "../components/form/Input";
import { supabase } from "../utils/supabase";
import { useNavigate } from "react-router";

const AddEvent = () => {
	const navigate = useNavigate();

	const handleSubmit = async (event) => {
		event.preventDefault();
		const formData = new FormData(event.target);
		const formDataObject = Object.fromEntries(formData.entries());

		const { data: eventData, error: eventError } = await supabase
			.from("events")
			.insert(formDataObject)
			.select()
			.single();
		if (eventError) alert(eventError);
		if (eventData) navigate("/manage-events");
	};

	return (
		<MainLayout>
			<div className="pt-5">
				<form onSubmit={handleSubmit}>
					<div className="flex">
						<div className="w-1/3">
							{/* title, start date, end date, start time, end time, location */}
							<Input
								type="text"
								label="Title"
								placeholder="Enter Title"
								name="title"
							/>
							<Input
								type="date"
								label="Start Date"
								placeholder="Select Start Date"
								name="start_date"
							/>
							<Input
								type="date"
								label="End Date"
								placeholder="Select End Date"
								name="end_date"
							/>
							<Input
								type="time"
								label="Start Time"
								placeholder="Select Start Time"
								name="start_time"
							/>
							<Input
								type="time"
								label="End Time"
								placeholder="Select End Time"
								name="end_time"
							/>
							<Input
								type="text"
								label="Location"
								placeholder="Enter Location"
								name="location"
							/>
						</div>
						<div className="flex-1">
							<fieldset className="fieldset">
								<legend className="fieldset-legend">Description</legend>
								<textarea
									className="textarea h-full w-full"
									placeholder="Description"
									rows={20}
									name="description"
								></textarea>
							</fieldset>
						</div>
					</div>
					<div className="text-right mt-5">
						<button className="btn btn-primary rounded-full" type="submit">
							Save Event
						</button>
					</div>
				</form>
			</div>
		</MainLayout>
	);
};

export default AddEvent;
