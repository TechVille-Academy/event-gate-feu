import Input from "../components/form/Input";
import MainLayout from "../layouts/MainLayout";
import Card from "../components/Card";
import SendIcon from "../components/icons/SendIcon";
import { supabase } from "../utils/supabase";
import { useContext } from "react";
import { SessionContext } from "../contexts/SessionContext";

const SignUp = () => {
	const { setProfile } = useContext(SessionContext);

	const handleSubmit = async (event) => {
		event.preventDefault();
		const formData = new FormData(event.target);
		const signupForm = {
			firstname: formData.get("firstname"),
			lastname: formData.get("lastname"),
			email: formData.get("email"),
			password: formData.get("password"),
		};

		const { data: signUpData, error: signUpError } = await supabase.auth.signUp(
			{
				email: signupForm.email,
				password: signupForm.password,
			},
		);

		if (signUpError) alert(signUpError);

		if (signUpData) {
			const { data: profileData, error: profileError } = await supabase
				.from("profiles")
				.insert({
					id: signUpData.user.id,
					firstname: signupForm.firstname,
					lastname: signupForm.lastname,
					email: signupForm.email,
				})
				.select()
				.single();

			if (profileError) alert(profileError);
			if (profileData) setProfile(profileData);
		}
	};

	return (
		<MainLayout>
			<div className="min-h-screen flex flex-col">
				<div className="flex justify-center items-center flex-1">
					<Card>
						<h1 className="text-xl font-bold">Sign Up</h1>
						<form onSubmit={handleSubmit}>
							<Input
								name="firstname"
								placeholder="Enter your First Name"
								label="Firstname"
								type="text"
							/>
							<Input
								name="lastname"
								placeholder="Enter your Last Name"
								label="Lastname"
								type="text"
							/>
							<Input
								name="email"
								placeholder="Enter your Email"
								label="Email"
								type="email"
							/>
							<Input
								name="password"
								placeholder="Enter your Password"
								label="Password"
								type="password"
							/>
							<button className="btn btn-primary rounded-full mt-5">
								<SendIcon className="text-sm" /> Submit
							</button>
						</form>
					</Card>
				</div>
			</div>
		</MainLayout>
	);
};

export default SignUp;
