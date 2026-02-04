import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
	Table,
	Button,
	Modal,
	Form,
	Input,
	Select,
	Space,
	Tag,
	message,
	Popconfirm,
} from "antd";
import DashboardSkeleton from "../../../components/DashboardSkeleton";
import {
	EditOutlined,
	DeleteOutlined,
	UserAddOutlined,
	SearchOutlined,
} from "@ant-design/icons";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

type User = {
	_id: string;
	name: string;
	email: string;
	role: string;
	createdAt: string;
};

const ManageUsers = () => {
	const axiosSecure = useAxiosSecure();
	const queryClient = useQueryClient();
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [editingUser, setEditingUser] = useState<User | null>(null);
	const [searchText, setSearchText] = useState("");
	const [form] = Form.useForm();

	// Fetch users
	const { data: users = [], isLoading } = useQuery({
		queryKey: ["manageUsers"],
		queryFn: async () => {
			const res = await axiosSecure.get("/users");
			return res.data;
		},
	});

	// Update user mutation
	const updateUserMutation = useMutation({
		mutationFn: async (userData: { id: string; role: string }) => {
			const res = await axiosSecure.patch(`/users/${userData.id}`, {
				role: userData.role,
			});
			return res.data;
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["manageUsers"] });
			message.success("User updated successfully");
			handleCloseModal();
		},
		onError: () => {
			message.error("Failed to update user");
		},
	});

	// Delete user mutation
	const deleteUserMutation = useMutation({
		mutationFn: async (id: string) => {
			const res = await axiosSecure.delete(`/users/${id}`);
			return res.data;
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["manageUsers"] });
			message.success("User deleted successfully");
		},
		onError: () => {
			message.error("Failed to delete user");
		},
	});

	const handleEdit = (user: User) => {
		setEditingUser(user);
		form.setFieldsValue({
			name: user.name,
			email: user.email,
			role: user.role,
		});
		setIsModalOpen(true);
	};

	const handleCloseModal = () => {
		setIsModalOpen(false);
		setEditingUser(null);
		form.resetFields();
	};

	const handleSubmit = (values: any) => {
		if (editingUser) {
			updateUserMutation.mutate({
				id: editingUser._id,
				role: values.role,
			});
		}
	};

	const handleDelete = (id: string) => {
		deleteUserMutation.mutate(id);
	};

	// Filter users by search
	const filteredUsers = users.filter(
		(user: User) =>
			user.name?.toLowerCase().includes(searchText.toLowerCase()) ||
			user.email?.toLowerCase().includes(searchText.toLowerCase()),
	);

	const columns = [
		{
			title: "Name",
			dataIndex: "name",
			key: "name",
			sorter: (a: User, b: User) => a.name?.localeCompare(b.name),
		},
		{
			title: "Email",
			dataIndex: "email",
			key: "email",
		},
		{
			title: "Role",
			dataIndex: "role",
			key: "role",
			render: (role: string) => {
				const color =
					role?.toLowerCase() === "admin" ? "red"
					: role?.toLowerCase() === "volunteer" ? "blue"
					: "green";
				return <Tag color={color}>{role?.toUpperCase() || "N/A"}</Tag>;
			},
			filters: [
				{ text: "Admin", value: "admin" },
				{ text: "Volunteer", value: "Volunteer" },
				{ text: "Donor", value: "Donor" },
			],
			onFilter: (value: any, record: User) =>
				record.role?.toLowerCase() === value.toLowerCase(),
		},
		{
			title: "Joined",
			dataIndex: "createdAt",
			key: "createdAt",
			render: (date: string) =>
				date ? new Date(date).toLocaleDateString() : "N/A",
			sorter: (a: User, b: User) =>
				new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
		},
		{
			title: "Actions",
			key: "actions",
			render: (_: any, record: User) => (
				<Space>
					<Button
						type="primary"
						icon={<EditOutlined />}
						size="small"
						onClick={() => handleEdit(record)}
						style={{ backgroundColor: "#21764C" }}
					>
						Edit
					</Button>
					<Popconfirm
						title="Delete this user?"
						description="This action cannot be undone."
						onConfirm={() => handleDelete(record._id)}
						okText="Yes"
						cancelText="No"
						okButtonProps={{ danger: true }}
					>
						<Button danger icon={<DeleteOutlined />} size="small">
							Delete
						</Button>
					</Popconfirm>
				</Space>
			),
		},
	];

	if (isLoading) {
		return <DashboardSkeleton />;
	}

	return (
		<div>
			<div className="flex justify-between items-center mb-6">
				<h2 className="text-2xl font-bold text-gray-800">Manage Users</h2>
				<div className="flex gap-4">
					<Input
						placeholder="Search users..."
						prefix={<SearchOutlined />}
						value={searchText}
						onChange={(e) => setSearchText(e.target.value)}
						style={{ width: 250 }}
						allowClear
					/>
				</div>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
				<div className="bg-green-50 p-4 rounded-lg border border-green-200">
					<p className="text-sm text-gray-600">Total Users</p>
					<p className="text-2xl font-bold text-green-700">{users.length}</p>
				</div>
				<div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
					<p className="text-sm text-gray-600">Volunteers</p>
					<p className="text-2xl font-bold text-blue-700">
						{
							users.filter((u: User) => u.role?.toLowerCase() === "volunteer")
								.length
						}
					</p>
				</div>
				<div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
					<p className="text-sm text-gray-600">Donors</p>
					<p className="text-2xl font-bold text-purple-700">
						{
							users.filter((u: User) => u.role?.toLowerCase() === "donor")
								.length
						}
					</p>
				</div>
			</div>

			<Table
				dataSource={filteredUsers}
				columns={columns}
				rowKey="_id"
				pagination={{ pageSize: 10, showSizeChanger: true }}
			/>

			<Modal
				title="Edit User Role"
				open={isModalOpen}
				onCancel={handleCloseModal}
				footer={null}
			>
				<Form form={form} layout="vertical" onFinish={handleSubmit}>
					<Form.Item label="Name" name="name">
						<Input disabled />
					</Form.Item>
					<Form.Item label="Email" name="email">
						<Input disabled />
					</Form.Item>
					<Form.Item
						label="Role"
						name="role"
						rules={[{ required: true, message: "Please select a role" }]}
					>
						<Select
							options={[
								{ value: "admin", label: "Admin" },
								{ value: "Volunteer", label: "Volunteer" },
								{ value: "Donor", label: "Donor" },
							]}
						/>
					</Form.Item>
					<Form.Item className="mb-0 text-right">
						<Space>
							<Button onClick={handleCloseModal}>Cancel</Button>
							<Button
								type="primary"
								htmlType="submit"
								loading={updateUserMutation.isPending}
								style={{ backgroundColor: "#21764C" }}
							>
								Save Changes
							</Button>
						</Space>
					</Form.Item>
				</Form>
			</Modal>
		</div>
	);
};

export default ManageUsers;
