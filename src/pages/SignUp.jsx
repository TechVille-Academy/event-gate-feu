import Input from "../components/form/Input";
import MainLayout from "../layouts/MainLayout";

const SignUp = () => {
	return (
		<MainLayout>
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
		</MainLayout>
	);
};

export default SignUp;
