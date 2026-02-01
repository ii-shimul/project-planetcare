import React, { useState } from "react";
import {
	Form,
	Input,
	Button,
	Typography,
	Card,
	Divider,
	Select,
	message,
} from "antd";
import {
	UserOutlined,
	MailOutlined,
	LockOutlined,
	GoogleOutlined,
	EditOutlined,
} from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useAxios from "../../hooks/useAxios";

const { Title } = Typography;

type SignupFormValues = {
	email: string;
	password: string;
	role: string;
	name: string;
};

const Signup = () => {
	const { createUser, logInGoogle } = useAuth();
	const axiosPublic = useAxios();
	const navigate = useNavigate();
	const [loading, setLoading] = useState(false);

	// handle sign up
	const onFinish = async (data: SignupFormValues) => {
		setLoading(true);
		try {
			const user = await createUser(data.email, data.password, data.name);
			const userDb = {
				name: user.displayName,
				email: user.email,
				role: data.role,
				createdAt: new Date().toISOString(),
			};
			await axiosPublic.post("/users", userDb);
			message.success(`Welcome ${user.displayName}`);
			navigate("/");
		} catch (error: any) {
			message.error(`Error: ${error.message}`);
		} finally {
			setLoading(false);
		}
	};

	// handle sign up with google
	const handleGoogleLogIn = async () => {
		const res = await logInGoogle();
		const user = res.user;
		const userDb = {
			name: user.displayName,
			email: user.email,
			role: "Donor",
			createdAt: new Date().toISOString(),
		};
		await axiosPublic.post("/users", userDb);
		alert(`Welcome ${user.displayName}`);
		navigate("/");
	};

	return (
		<div className="flex py-5 justify-center items-center bg-[#f0f2f5] w-full min-h-[calc(100vh-277px)] max-sm:px-3.5">
			<Card
				style={{
					boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
				}}
				className="rounded-md p-5 max-w-lg w-full"
			>
				<div style={{ textAlign: "center", marginBottom: "24px" }}>
					<Title level={2}>Sign Up</Title>
				</div>
				<Form name="signup_form" onFinish={onFinish} layout="vertical">
					<Form.Item
						name="name"
						rules={[
							{ required: true, message: "Please input your full name!" },
						]}
					>
						<Input
							prefix={<UserOutlined />}
							placeholder="Full Name"
							size="large"
						/>
					</Form.Item>

					<Form.Item
						name="email"
						rules={[
							{ required: true, message: "Please input your email!" },
							{ type: "email", message: "Please enter a valid email!" },
						]}
					>
						<Input prefix={<MailOutlined />} placeholder="Email" size="large" />
					</Form.Item>

					<Form.Item
						name="role"
						rules={[{ required: true, message: "Please select your role!" }]}
					>
						<Select
							prefix={<EditOutlined />}
							allowClear
							size="large"
							options={[
								{ value: "Donor", label: "Donor" },
								{ value: "Volunteer", label: "Volunteer" },
							]}
							placeholder="Select your role"
						/>
					</Form.Item>

					<Form.Item
						name="password"
						rules={[
							{ required: true, message: "Please input your password!" },
							{ min: 6, message: "Password must be at least 6 characters!" },
						]}
					>
						<Input.Password
							prefix={<LockOutlined />}
							placeholder="Password"
							size="large"
						/>
					</Form.Item>

					<Form.Item
						name="confirmPassword"
						dependencies={["password"]}
						rules={[
							{ required: true, message: "Please confirm your password!" },
							({ getFieldValue }) => ({
								validator(_, value) {
									if (!value || getFieldValue("password") === value) {
										return Promise.resolve();
									}
									return Promise.reject(new Error("Passwords do not match!"));
								},
							}),
						]}
					>
						<Input.Password
							prefix={<LockOutlined />}
							placeholder="Confirm Password"
							size="large"
						/>
					</Form.Item>

					<Form.Item>
						<Button
							type="primary"
							htmlType="submit"
							size="large"
							block
							style={{ backgroundColor: "#003E30", borderColor: "#003E30" }}
						>
							{loading ? "Please wait..." : "Sign Up"}
						</Button>
					</Form.Item>

					<div style={{ textAlign: "center" }}>
						<span>Already have an account? </span>
						<Link to={"/login"}>Log in</Link>
					</div>
				</Form>
				<Divider plain>or</Divider>
				<Button
					size="large"
					block
					onClick={handleGoogleLogIn}
					style={{
						marginBottom: "24px",
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						backgroundColor: "#fff",
						borderColor: "#d9d9d9",
						color: "#000",
					}}
				>
					<GoogleOutlined
						style={{ fontSize: "18px", marginRight: "8px", color: "#4285f4" }}
					/>
					Sign up with Google
				</Button>
			</Card>
		</div>
	);
};

export default Signup;
