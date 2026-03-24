import React, { useEffect, useContext, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import { supabase } from "../utils/supabase";
import { SessionContext } from "../contexts/SessionContext";
import { Link } from "react-router";

const Profile = () => {
	const session = useContext(SessionContext);
	const [profile, setProfile] = useState(null);

	useEffect(() => {
		const fetchProfile = async () => {
			const { data, error } = await supabase
				.from("profiles")
				.select()
				.eq("id", session.user.id)
				.single();

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
		<MainLayout>
			<div className="pt-10 flex justify-between">
				<div>
					Firstname: {profile?.firstname} <br />
					Lastname: {profile?.lastname} <br />
					Email: {profile?.email}
				</div>
				<div>
					<Link to="/edit-profile" className="btn btn-primary rounded-full">
						Edit Profile
					</Link>
				</div>
			</div>
		</MainLayout>
	);
};

export default Profile;
