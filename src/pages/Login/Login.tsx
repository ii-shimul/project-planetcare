import { useState } from "react";
import {
	Form,
	Input,
	Button,
	Checkbox,
	Typography,
	Card,
	Divider,
	message,
} from "antd";
import {
	UserOutlined,
	LockOutlined,
	GoogleOutlined,
	SafetyOutlined,
} from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useAxios from "../../hooks/useAxios";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "../../animations";

const { Title } = Typography;

type LoginFormValues = { email: string; password: string; remember?: boolean };

const Login = () => {
	const { logInGoogle, logIn } = useAuth();
	const axiosPublic = useAxios();
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();
	const [form] = Form.useForm();

	const onFinish = async (values: LoginFormValues) => {
		setLoading(true);
		try {
			const result = await logIn(values.email, values.password);
			message.success(`Welcome ${result.user.displayName}`);
			navigate("/");
		} catch (error: any) {
			message.error(`Error: ${error.message}`);
		} finally {
			setLoading(false);
		}
	};

	const handleGoogleLogIn = async () => {
		setLoading(true);
		try {
			const res = await logInGoogle();
			const user = res.user;
			const userDb = {
				name: user.displayName,
				email: user.email,
				role: "donor",
				createdAt: new Date().toISOString(),
			};
			await axiosPublic.post("/users", userDb);
			message.success(`Welcome ${user.displayName}`);
			navigate("/");
			setLoading(false);
		} catch (error: any) {
			console.log(error.message);
			message.error("Something went wrong!");
			setLoading(false);
		}
	};

	const handleAdminLogin = () => {
		form.setFieldsValue({
			email: "admin@planetcare.com",
			password: "planetcare",
		});
		message.info("Admin credentials filled. Click Login to continue.");
	};

	return (
		<div className="flex justify-center items-center py-5 bg-[#f0f2f5] w-full min-h-[calc(100vh-277px)] max-sm:px-3.5">
			<motion.div
				initial="hidden"
				animate="visible"
				variants={staggerContainer}
			>
				<Card
					style={{
						boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
					}}
					className="rounded-md p-5 max-w-lg w-full"
				>
					<motion.div
						style={{ textAlign: "center", marginBottom: "24px" }}
						variants={fadeUp}
					>
						<Title level={2}>Login</Title>
					</motion.div>
					<motion.div variants={fadeUp}>
						<Form
							form={form}
							name="login_form"
							initialValues={{ remember: true }}
							onFinish={onFinish}
							layout="vertical"
						>
							<Form.Item
								name="email"
								rules={[
									{ required: true, message: "Please input your email!" },
									{ type: "email", message: "Please enter a valid email!" },
								]}
							>
								<Input
									prefix={<UserOutlined />}
									placeholder="Email"
									size="large"
								/>
							</Form.Item>

							<Form.Item
								name="password"
								rules={[
									{ required: true, message: "Please input your password!" },
									{
										min: 6,
										message: "Password must be at least 6 characters!",
									},
								]}
							>
								<Input.Password
									prefix={<LockOutlined />}
									placeholder="Password"
									size="large"
								/>
							</Form.Item>

							<Form.Item>
								<Form.Item name="remember" valuePropName="checked" noStyle>
									<Checkbox>Remember me</Checkbox>
								</Form.Item>
								<a href="/forgot-password" style={{ float: "right" }}>
									Forgot password?
								</a>
							</Form.Item>

							<Form.Item>
								<Button
									type="primary"
									htmlType="submit"
									size="large"
									block
									style={{ backgroundColor: "#003E30", borderColor: "#003E30" }}
								>
									{loading ? "Please wait..." : "Login"}
								</Button>
							</Form.Item>

							<div style={{ textAlign: "center" }}>
								<span>Don't have an account? </span>
								<Link to={"/signup"}>Sign up</Link>
							</div>
						</Form>
					</motion.div>
					<Divider plain>or</Divider>
					<motion.div variants={fadeUp}>
						<Button
							size="large"
							block
							onClick={handleAdminLogin}
							style={{
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
								backgroundColor: "#f59e0b",
								marginBottom: "12px",
								borderColor: "#f59e0b",
								color: "#fff",
							}}
						>
							<SafetyOutlined
								style={{ fontSize: "18px", marginRight: "8px" }}
							/>
							Login as Admin (Reviewer)
						</Button>
						<Button
							size="large"
							block
							onClick={handleGoogleLogIn}
							style={{
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
								backgroundColor: "#fff",
								borderColor: "#d9d9d9",
								color: "#000",
							}}
						>
							<GoogleOutlined
								style={{
									fontSize: "18px",
									marginRight: "8px",
									color: "#4285f4",
								}}
							/>
							Login with Google
						</Button>
					</motion.div>
				</Card>
			</motion.div>
		</div>
	);
};

export default Login;
