import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
	Table,
	Button,
	Modal,
	Form,
	Input,
	DatePicker,
	Space,
	Tag,
	message,
	Popconfirm,
} from "antd";
import DashboardSkeleton from "../../../components/DashboardSkeleton";
import {
	EditOutlined,
	DeleteOutlined,
	PlusOutlined,
	SearchOutlined,
	CalendarOutlined,
	EnvironmentOutlined,
} from "@ant-design/icons";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import moment from "moment";
import dayjs from "dayjs";

type Event = {
	_id: string;
	title: string;
	description: string;
	location: string;
	date: string;
	volunteers: string[];
	createdBy: string;
	image?: string;
};

const ManageEvents = () => {
	const axiosSecure = useAxiosSecure();
	const { user } = useAuth();
	const queryClient = useQueryClient();
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [editingEvent, setEditingEvent] = useState<Event | null>(null);
	const [searchText, setSearchText] = useState("");
	const [form] = Form.useForm();

	// Fetch events
	const { data: events = [], isLoading } = useQuery({
		queryKey: ["manageEvents"],
		queryFn: async () => {
			const res = await axiosSecure.get("/events");
			return res.data;
		},
	});

	// Create event mutation
	const createEventMutation = useMutation({
		mutationFn: async (eventData: any) => {
			const res = await axiosSecure.post("/events", eventData);
			return res.data;
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["manageEvents"] });
			message.success("Event created successfully");
			handleCloseModal();
		},
		onError: () => {
			message.error("Failed to create event");
		},
	});

	// Update event mutation
	const updateEventMutation = useMutation({
		mutationFn: async (eventData: any) => {
			const res = await axiosSecure.patch(`/events/${eventData.id}`, eventData);
			return res.data;
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["manageEvents"] });
			message.success("Event updated successfully");
			handleCloseModal();
		},
		onError: () => {
			message.error("Failed to update event");
		},
	});

	// Delete event mutation
	const deleteEventMutation = useMutation({
		mutationFn: async (id: string) => {
			const res = await axiosSecure.delete(`/events/${id}`);
			return res.data;
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["manageEvents"] });
			message.success("Event deleted successfully");
		},
		onError: () => {
			message.error("Failed to delete event");
		},
	});

	const handleCreate = () => {
		setEditingEvent(null);
		form.resetFields();
		setIsModalOpen(true);
	};

	const handleEdit = (event: Event) => {
		setEditingEvent(event);
		form.setFieldsValue({
			title: event.title,
			description: event.description,
			location: event.location,
			date: dayjs(event.date),
			image: event.image || "",
		});
		setIsModalOpen(true);
	};

	const handleCloseModal = () => {
		setIsModalOpen(false);
		setEditingEvent(null);
		form.resetFields();
	};

	const handleSubmit = (values: any) => {
		const eventData = {
			title: values.title,
			description: values.description,
			location: values.location,
			date: values.date.toISOString(),
			image: values.image || "/event-images/tree-planting.png",
			createdBy: user?.email,
		};

		if (editingEvent) {
			updateEventMutation.mutate({ id: editingEvent._id, ...eventData });
		} else {
			createEventMutation.mutate({ ...eventData, volunteers: [] });
		}
	};

	const handleDelete = (id: string) => {
		deleteEventMutation.mutate(id);
	};

	// Filter events by search
	const filteredEvents = events.filter(
		(event: Event) =>
			event.title?.toLowerCase().includes(searchText.toLowerCase()) ||
			event.location?.toLowerCase().includes(searchText.toLowerCase()),
	);

	const columns = [
		{
			title: "Title",
			dataIndex: "title",
			key: "title",
			sorter: (a: Event, b: Event) => a.title?.localeCompare(b.title),
		},
		{
			title: "Location",
			dataIndex: "location",
			key: "location",
			render: (location: string) => (
				<span>
					<EnvironmentOutlined className="mr-1" /> {location}
				</span>
			),
		},
		{
			title: "Date",
			dataIndex: "date",
			key: "date",
			render: (date: string) => (
				<span>
					<CalendarOutlined className="mr-1" />{" "}
					{moment(date).format("MMM D, YYYY")}
				</span>
			),
			sorter: (a: Event, b: Event) =>
				new Date(a.date).getTime() - new Date(b.date).getTime(),
		},
		{
			title: "Status",
			key: "status",
			render: (_: any, record: Event) => {
				const isPast = new Date(record.date) < new Date();
				return (
					<Tag color={isPast ? "default" : "green"}>
						{isPast ? "Completed" : "Upcoming"}
					</Tag>
				);
			},
			filters: [
				{ text: "Upcoming", value: "upcoming" },
				{ text: "Completed", value: "completed" },
			],
			onFilter: (value: any, record: Event) => {
				const isPast = new Date(record.date) < new Date();
				return value === "upcoming" ? !isPast : isPast;
			},
		},
		{
			title: "Volunteers",
			dataIndex: "volunteers",
			key: "volunteers",
			render: (volunteers: string[]) => (
				<Tag color="blue">{volunteers?.length || 0} registered</Tag>
			),
			sorter: (a: Event, b: Event) =>
				(a.volunteers?.length || 0) - (b.volunteers?.length || 0),
		},
		{
			title: "Actions",
			key: "actions",
			render: (_: any, record: Event) => (
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
						title="Delete this event?"
						description="This will also remove all volunteer registrations."
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
				<h2 className="text-2xl font-bold text-gray-800">Manage Events</h2>
				<div className="flex gap-4">
					<Input
						placeholder="Search events..."
						prefix={<SearchOutlined />}
						value={searchText}
						onChange={(e) => setSearchText(e.target.value)}
						style={{ width: 250 }}
						allowClear
					/>
					<Button
						type="primary"
						icon={<PlusOutlined />}
						onClick={handleCreate}
						style={{ backgroundColor: "#21764C" }}
					>
						Add Event
					</Button>
				</div>
			</div>

			{/* Stats */}
			<div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
				<div className="bg-green-50 p-4 rounded-lg border border-green-200">
					<p className="text-sm text-gray-600">Total Events</p>
					<p className="text-2xl font-bold text-green-700">{events.length}</p>
				</div>
				<div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
					<p className="text-sm text-gray-600">Upcoming Events</p>
					<p className="text-2xl font-bold text-blue-700">
						{events.filter((e: Event) => new Date(e.date) >= new Date()).length}
					</p>
				</div>
				<div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
					<p className="text-sm text-gray-600">Total Volunteer Signups</p>
					<p className="text-2xl font-bold text-purple-700">
						{events.reduce(
							(acc: number, e: Event) => acc + (e.volunteers?.length || 0),
							0,
						)}
					</p>
				</div>
			</div>

			<Table
				dataSource={filteredEvents}
				columns={columns}
				rowKey="_id"
				pagination={{ pageSize: 10, showSizeChanger: true }}
			/>

			{/* Create/Edit Modal */}
			<Modal
				title={editingEvent ? "Edit Event" : "Create New Event"}
				open={isModalOpen}
				onCancel={handleCloseModal}
				footer={null}
				width={600}
			>
				<Form form={form} layout="vertical" onFinish={handleSubmit}>
					<Form.Item
						label="Event Title"
						name="title"
						rules={[{ required: true, message: "Please enter a title" }]}
					>
						<Input placeholder="Enter event title" />
					</Form.Item>
					<Form.Item
						label="Description"
						name="description"
						rules={[{ required: true, message: "Please enter a description" }]}
					>
						<Input.TextArea rows={4} placeholder="Enter event description" />
					</Form.Item>
					<Form.Item
						label="Location"
						name="location"
						rules={[{ required: true, message: "Please enter a location" }]}
					>
						<Input
							placeholder="Enter event location"
							prefix={<EnvironmentOutlined />}
						/>
					</Form.Item>
					<Form.Item
						label="Date & Time"
						name="date"
						rules={[{ required: true, message: "Please select a date" }]}
					>
						<DatePicker
							showTime
							format="YYYY-MM-DD HH:mm"
							className="w-full"
							placeholder="Select date and time"
						/>
					</Form.Item>
					<Form.Item label="Image URL (optional)" name="image">
						<Input placeholder="Enter image URL or leave blank for default" />
					</Form.Item>
					<Form.Item className="mb-0 text-right">
						<Space>
							<Button onClick={handleCloseModal}>Cancel</Button>
							<Button
								type="primary"
								htmlType="submit"
								loading={
									createEventMutation.isPending || updateEventMutation.isPending
								}
								style={{ backgroundColor: "#21764C" }}
							>
								{editingEvent ? "Save Changes" : "Create Event"}
							</Button>
						</Space>
					</Form.Item>
				</Form>
			</Modal>
		</div>
	);
};

export default ManageEvents;
