import { Card, Form, Input, Button, message, Avatar, Spin } from "antd";
import { UserOutlined, MailOutlined, SaveOutlined } from "@ant-design/icons";
import useAuth from "../../../hooks/useAuth";
import { useState } from "react";
import { updateProfile } from "firebase/auth";
import { getAuth } from "firebase/auth";

const Profile = () => {
	const { user, loading } = useAuth();
	const [form] = Form.useForm();
	const [saving, setSaving] = useState(false);
	const auth = getAuth();

	const handleSave = async (values: { displayName: string }) => {
		if (!auth.currentUser) return;

		setSaving(true);
		try {
			await updateProfile(auth.currentUser, {
				displayName: values.displayName,
			});
			message.success("Profile updated successfully!");
		} catch (error) {
			message.error("Failed to update profile");
			console.error(error);
		} finally {
			setSaving(false);
		}
	};

	if (loading) {
		return (
			<div className="flex justify-center items-center h-64">
				<Spin size="large" />
			</div>
		);
	}

	return (
		<div>
			<h2 className="text-2xl font-bold text-gray-800 mb-6">My Profile</h2>

			<div className="max-w-2xl">
				<Card>
					<div className="flex flex-col items-center mb-8">
						<Avatar
							size={100}
							src={user?.photoURL}
							icon={<UserOutlined />}
							className="mb-4"
						/>
						<h3 className="text-xl font-semibold">
							{user?.displayName || "User"}
						</h3>
						<p className="text-gray-500">{user?.email}</p>
					</div>

					<Form
						form={form}
						layout="vertical"
						initialValues={{
							displayName: user?.displayName || "",
							email: user?.email || "",
						}}
						onFinish={handleSave}
					>
						<Form.Item
							name="displayName"
							label="Display Name"
							rules={[{ required: true, message: "Please enter your name" }]}
						>
							<Input
								prefix={<UserOutlined className="text-gray-400" />}
								placeholder="Your name"
							/>
						</Form.Item>

						<Form.Item name="email" label="Email">
							<Input
								prefix={<MailOutlined className="text-gray-400" />}
								disabled
							/>
						</Form.Item>

						<Form.Item>
							<Button
								type="primary"
								htmlType="submit"
								loading={saving}
								icon={<SaveOutlined />}
								className="bg-green-600 hover:bg-green-700"
							>
								Save Changes
							</Button>
						</Form.Item>
					</Form>
				</Card>
			</div>
		</div>
	);
};

export default Profile;
