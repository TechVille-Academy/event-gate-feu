import Input from "../components/form/Input";
import MainLayout from "../layouts/MainLayout";
import Card from "../components/Card";
import SignUpIcon from "../components/icons/SignUpIcon";
import SendIcon from "../components/icons/SendIcon";
import { supabase } from "../utils/supabase";
import { useContext, useEffect } from "react";
import { SessionContext } from "../contexts/SessionContext";
import { useNavigate } from "react-router";

const Login = () => {
	const session = useContext(SessionContext);
	const navigate = useNavigate();

	useEffect(() => {
		if (session) {
			navigate("/");
		}
	}, [session, navigate]);

	const handleSubmit = async (event) => {
		event.preventDefault();
		const formData = new FormData(event.target);
		const loginForm = {
			email: formData.get("email"),
			password: formData.get("password"),
		};

		const { data, error } = await supabase.auth.signInWithPassword({
			email: loginForm.email,
			password: loginForm.password,
		});

		if (error) alert(error);

		if (data) console.log(data);
	};

	return (
		<MainLayout>
			<div className="min-h-screen flex flex-col">
				<div className="flex justify-center items-center flex-1">
					<Card>
						<h1 className="text-xl font-bold">Log In</h1>
						<form onSubmit={handleSubmit}>
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

export default Login;
