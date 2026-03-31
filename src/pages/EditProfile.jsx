import Input from "../components/form/Input";
import MainLayout from "../layouts/MainLayout";
import Card from "../components/Card";
import SignUpIcon from "../components/icons/SignUpIcon";
import SendIcon from "../components/icons/SendIcon";
import { supabase } from "../utils/supabase";
import { useContext } from "react";
import { useNavigate } from "react-router";
import { SessionContext } from "../contexts/SessionContext";

const EditProfile = () => {
	const { session, profile, setProfile } = useContext(SessionContext);
	const navigate = useNavigate();

	const handleSubmit = async (event) => {
		event.preventDefault();
		const formData = new FormData(event.target);
		const signupForm = {
			firstname: formData.get("firstname"),
			lastname: formData.get("lastname"),
			email: formData.get("email"),
		};

		const { data: profileData, error: profileError } = await supabase
			.from("profiles")
			.update({
				firstname: signupForm.firstname,
				lastname: signupForm.lastname,
				email: signupForm.email,
			})
			.eq("id", session.user.id)
			.select()
			.single();

		if (profileError) alert(profileError);
		if (profileData) {
			navigate("/profile");
			setProfile(profileData);
		}
	};

	return (
		<MainLayout className="flex justify-center items-center">
			<Card>
				<h1 className="text-xl font-bold">Edit Profile</h1>
				<form onSubmit={handleSubmit}>
					<Input
						name="firstname"
						placeholder="Enter your First Name"
						label="Firstname"
						type="text"
						defaultValue={profile?.firstname}
					/>
					<Input
						name="lastname"
						placeholder="Enter your Last Name"
						label="Lastname"
						type="text"
						defaultValue={profile?.lastname}
					/>
					<Input
						name="email"
						placeholder="Enter your Email"
						label="Email"
						type="email"
						defaultValue={profile?.email}
					/>
					<button className="btn btn-primary rounded-full mt-5">
						<SendIcon className="text-sm" /> Submit
					</button>
				</form>
			</Card>
		</MainLayout>
	);
};

export default EditProfile;
