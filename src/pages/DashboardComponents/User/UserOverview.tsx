import { useQuery } from "@tanstack/react-query";
import { Card, Row, Col, Statistic, Table, Tag, Empty } from "antd";
import DashboardSkeleton from "../../../components/DashboardSkeleton";
import {
	CalendarOutlined,
	DollarOutlined,
	EnvironmentOutlined,
} from "@ant-design/icons";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import moment from "moment";

type Event = {
	_id: string;
	title: string;
	description: string;
	location: string;
	date: string;
	volunteers: string[];
};

type Donation = {
	_id: string;
	donorEmail: string;
	amount: number;
	status: string;
	donatedAt: string;
};

const UserOverview = () => {
	const { user } = useAuth();
	const axiosSecure = useAxiosSecure();

	// Fetch user's volunteered events
	const { data: myEvents = [], isLoading: eventsLoading } = useQuery({
		queryKey: ["myEvents", user?.email],
		queryFn: async () => {
			const res = await axiosSecure.get(`/events/volunteered/${user?.email}`);
			return res.data;
		},
		enabled: !!user?.email,
	});

	// Fetch user's donations
	const { data: myDonations = [], isLoading: donationsLoading } = useQuery({
		queryKey: ["myDonations", user?.email],
		queryFn: async () => {
			const res = await axiosSecure.get(`/donations/my/${user?.email}`);
			return res.data;
		},
		enabled: !!user?.email,
	});

	const isLoading = eventsLoading || donationsLoading;

	const totalDonated = myDonations.reduce(
		(acc: number, d: Donation) => acc + (d.amount || 0),
		0,
	);

	const upcomingEvents = myEvents.filter(
		(e: Event) => new Date(e.date) > new Date(),
	);

	const eventColumns = [
		{
			title: "Event",
			dataIndex: "title",
			key: "title",
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
					{moment(date).format("MMM D, YYYY")}
				</span>
			),
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
		},
	];

	const donationColumns = [
		{
			title: "Amount",
			dataIndex: "amount",
			key: "amount",
			render: (amount: number) => (
				<span className="font-semibold text-green-600">
					${amount?.toFixed(2)}
				</span>
			),
		},
		{
			title: "Date",
			dataIndex: "donatedAt",
			key: "donatedAt",
			render: (date: string) => moment(date).format("MMM D, YYYY"),
		},
		{
			title: "Status",
			dataIndex: "status",
			key: "status",
			render: (status: string) => (
				<Tag color={status === "succeeded" ? "green" : "orange"}>
					{status?.toUpperCase()}
				</Tag>
			),
		},
	];

	if (isLoading) {
		return <DashboardSkeleton />;
	}

	return (
		<div>
			<h2 className="text-2xl font-bold text-gray-800 mb-6">
				Welcome, {user?.displayName || "User"}!
			</h2>

			{/* Stats */}
			<Row gutter={[16, 16]} className="mb-6">
				<Col xs={24} sm={8}>
					<Card>
						<Statistic
							title="Events Volunteered"
							value={myEvents.length}
							prefix={<CalendarOutlined />}
							valueStyle={{ color: "#21764C" }}
						/>
					</Card>
				</Col>
				<Col xs={24} sm={8}>
					<Card>
						<Statistic
							title="Upcoming Events"
							value={upcomingEvents.length}
							prefix={<CalendarOutlined />}
							valueStyle={{ color: "#1890ff" }}
						/>
					</Card>
				</Col>
				<Col xs={24} sm={8}>
					<Card>
						<Statistic
							title="Total Donated"
							value={totalDonated}
							prefix={<DollarOutlined />}
							precision={2}
							valueStyle={{ color: "#52c41a" }}
						/>
					</Card>
				</Col>
			</Row>

			{/* Recent Activity */}
			<Row gutter={[16, 16]}>
				<Col xs={24} lg={12}>
					<Card title="My Volunteered Events" className="h-full">
						{myEvents.length > 0 ?
							<Table
								dataSource={myEvents.slice(0, 5)}
								columns={eventColumns}
								rowKey="_id"
								pagination={false}
								size="small"
							/>
						:	<Empty description="No events yet. Start volunteering!" />}
					</Card>
				</Col>
				<Col xs={24} lg={12}>
					<Card title="My Donations" className="h-full">
						{myDonations.length > 0 ?
							<Table
								dataSource={myDonations.slice(0, 5)}
								columns={donationColumns}
								rowKey="_id"
								pagination={false}
								size="small"
							/>
						:	<Empty description="No donations yet. Make a difference!" />}
					</Card>
				</Col>
			</Row>
		</div>
	);
};

export default UserOverview;
