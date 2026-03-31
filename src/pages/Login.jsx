import Input from "../components/form/Input";
import MainLayout from "../layouts/MainLayout";
import Card from "../components/Card";
import SendIcon from "../components/icons/SendIcon";
import { supabase } from "../utils/supabase";
import { useContext } from "react";
import { SessionContext } from "../contexts/SessionContext";

const Login = () => {
	const { setIsLoading } = useContext(SessionContext);
	const handleSubmit = async (event) => {
		event.preventDefault();
		setIsLoading(true);
		const formData = new FormData(event.target);
		const loginForm = {
			email: formData.get("email"),
			password: formData.get("password"),
		};

		const { data, error } = await supabase.auth.signInWithPassword({
			email: loginForm.email,
			password: loginForm.password,
		});

		if (error) {
			alert(error);
			setIsLoading(false);
		}

		if (data) console.log(data);
	};

	return (
		<MainLayout className="flex justify-center items-center">
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
		</MainLayout>
	);
};

export default Login;
