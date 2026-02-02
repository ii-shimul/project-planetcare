import { useQuery } from "@tanstack/react-query";
import { Table, Tag, Spin, Empty, Card, Input } from "antd";
import {
	CalendarOutlined,
	EnvironmentOutlined,
	SearchOutlined,
} from "@ant-design/icons";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import moment from "moment";
import { useState } from "react";

type Event = {
	_id: string;
	title: string;
	description: string;
	location: string;
	date: string;
	volunteers: string[];
};

const MyEvents = () => {
	const { user } = useAuth();
	const axiosSecure = useAxiosSecure();
	const [searchText, setSearchText] = useState("");

	const { data: myEvents = [], isLoading } = useQuery({
		queryKey: ["myAllEvents", user?.email],
		queryFn: async () => {
			const res = await axiosSecure.get(`/events/volunteered/${user?.email}`);
			return res.data;
		},
		enabled: !!user?.email,
	});

	const filteredEvents = myEvents.filter(
		(event: Event) =>
			event.title?.toLowerCase().includes(searchText.toLowerCase()) ||
			event.location?.toLowerCase().includes(searchText.toLowerCase()),
	);

	const columns = [
		{
			title: "Event",
			dataIndex: "title",
			key: "title",
			sorter: (a: Event, b: Event) => a.title.localeCompare(b.title),
		},
		{
			title: "Description",
			dataIndex: "description",
			key: "description",
			ellipsis: true,
		},
		{
			title: "Location",
			dataIndex: "location",
			key: "location",
			render: (location: string) => (
				<span>
					<EnvironmentOutlined className="mr-1 text-gray-400" />
					{location}
				</span>
			),
		},
		{
			title: "Date",
			dataIndex: "date",
			key: "date",
			render: (date: string) => (
				<span>
					<CalendarOutlined className="mr-1 text-gray-400" />
					{moment(date).format("MMM D, YYYY, h:mm A")}
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
				return value === "completed" ? isPast : !isPast;
			},
		},
		{
			title: "Volunteers",
			dataIndex: "volunteers",
			key: "volunteers",
			render: (volunteers: string[]) => (
				<Tag color="blue">{volunteers?.length || 0} joined</Tag>
			),
		},
	];

	if (isLoading) {
		return (
			<div className="flex justify-center items-center h-64">
				<Spin size="large" />
			</div>
		);
	}

	return (
		<div>
			<h2 className="text-2xl font-bold text-gray-800 mb-6">My Events</h2>

			<Card>
				<div className="mb-4">
					<Input
						placeholder="Search events..."
						prefix={<SearchOutlined />}
						value={searchText}
						onChange={(e) => setSearchText(e.target.value)}
						style={{ width: 280 }}
						allowClear
					/>
				</div>

				{filteredEvents.length > 0 ?
					<Table
						dataSource={filteredEvents}
						columns={columns}
						rowKey="_id"
						pagination={{ pageSize: 10 }}
					/>
				:	<Empty
						description={
							searchText ?
								"No events match your search"
							:	"You haven't volunteered for any events yet"
						}
					/>
				}
			</Card>
		</div>
	);
};

export default MyEvents;
