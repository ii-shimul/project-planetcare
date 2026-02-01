import { useQuery } from "@tanstack/react-query";
import { Card, Statistic, Row, Col, Table, Spin } from "antd";
import {
	UserOutlined,
	CalendarOutlined,
	DollarOutlined,
	TeamOutlined,
} from "@ant-design/icons";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const Overview = () => {
	const axiosSecure = useAxiosSecure();

	// Fetch users
	const { data: users = [], isLoading: usersLoading } = useQuery({
		queryKey: ["dashboardUsers"],
		queryFn: async () => {
			const res = await axiosSecure.get("/users");
			return res.data;
		},
	});

	// Fetch events
	const { data: events = [], isLoading: eventsLoading } = useQuery({
		queryKey: ["dashboardEvents"],
		queryFn: async () => {
			const res = await axiosSecure.get("/events");
			return res.data;
		},
	});

	// Fetch donations
	const { data: donations = [], isLoading: donationsLoading } = useQuery({
		queryKey: ["dashboardDonations"],
		queryFn: async () => {
			const res = await axiosSecure.get("/donations");
			return res.data;
		},
	});

	const isLoading = usersLoading || eventsLoading || donationsLoading;

	// Calculate stats
	const totalUsers = users.length;
	const totalVolunteers = users.filter(
		(u: any) => u.role?.toLowerCase() === "volunteer",
	).length;
	const totalDonors = users.filter(
		(u: any) => u.role?.toLowerCase() === "donor",
	).length;
	const totalEvents = events.length;
	const totalDonations = donations.reduce(
		(acc: number, d: any) => acc + (d.amount || 0),
		0,
	);

	// Recent events table columns
	const eventColumns = [
		{
			title: "Title",
			dataIndex: "title",
			key: "title",
		},
		{
			title: "Location",
			dataIndex: "location",
			key: "location",
		},
		{
			title: "Volunteers",
			dataIndex: "volunteers",
			key: "volunteers",
			render: (volunteers: string[]) => volunteers?.length || 0,
		},
	];

	// Recent donations table columns
	const donationColumns = [
		{
			title: "Donor Email",
			dataIndex: "donorEmail",
			key: "donorEmail",
		},
		{
			title: "Amount",
			dataIndex: "amount",
			key: "amount",
			render: (amount: number) => `$${amount?.toFixed(2) || "0.00"}`,
		},
		{
			title: "Date",
			dataIndex: "donatedAt",
			key: "donatedAt",
			render: (date: string) =>
				date ? new Date(date).toLocaleDateString() : "N/A",
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
			<h2 className="text-2xl font-bold mb-6 text-gray-800">
				Dashboard Overview
			</h2>

			{/* Stats Cards */}
			<Row gutter={[16, 16]} className="mb-8">
				<Col xs={24} sm={12} lg={6}>
					<Card>
						<Statistic
							title="Total Users"
							value={totalUsers}
							prefix={<UserOutlined />}
							valueStyle={{ color: "#21764C" }}
						/>
					</Card>
				</Col>
				<Col xs={24} sm={12} lg={6}>
					<Card>
						<Statistic
							title="Total Volunteers"
							value={totalVolunteers}
							prefix={<TeamOutlined />}
							valueStyle={{ color: "#1890ff" }}
						/>
					</Card>
				</Col>
				<Col xs={24} sm={12} lg={6}>
					<Card>
						<Statistic
							title="Total Events"
							value={totalEvents}
							prefix={<CalendarOutlined />}
							valueStyle={{ color: "#722ed1" }}
						/>
					</Card>
				</Col>
				<Col xs={24} sm={12} lg={6}>
					<Card>
						<Statistic
							title="Total Donations"
							value={totalDonations}
							prefix={<DollarOutlined />}
							precision={2}
							valueStyle={{ color: "#52c41a" }}
						/>
					</Card>
				</Col>
			</Row>

			{/* Quick Stats Summary */}
			<Row gutter={[16, 16]} className="mb-8">
				<Col xs={24} lg={12}>
					<Card title="User Distribution" className="h-full">
						<div className="space-y-4">
							<div className="flex justify-between items-center">
								<span>Donors</span>
								<span className="font-semibold text-green-600">
									{totalDonors}
								</span>
							</div>
							<div className="w-full bg-gray-200 rounded-full h-2">
								<div
									className="bg-green-600 h-2 rounded-full"
									style={{
										width: `${totalUsers ? (totalDonors / totalUsers) * 100 : 0}%`,
									}}
								></div>
							</div>
							<div className="flex justify-between items-center">
								<span>Volunteers</span>
								<span className="font-semibold text-blue-600">
									{totalVolunteers}
								</span>
							</div>
							<div className="w-full bg-gray-200 rounded-full h-2">
								<div
									className="bg-blue-600 h-2 rounded-full"
									style={{
										width: `${totalUsers ? (totalVolunteers / totalUsers) * 100 : 0}%`,
									}}
								></div>
							</div>
						</div>
					</Card>
				</Col>
				<Col xs={24} lg={12}>
					<Card title="Quick Stats" className="h-full">
						<div className="space-y-3">
							<div className="flex justify-between">
								<span className="text-gray-600">Average Donation</span>
								<span className="font-semibold">
									$
									{donations.length ?
										(totalDonations / donations.length).toFixed(2)
									:	"0.00"}
								</span>
							</div>
							<div className="flex justify-between">
								<span className="text-gray-600">Total Volunteer Signups</span>
								<span className="font-semibold">
									{events.reduce(
										(acc: number, e: any) => acc + (e.volunteers?.length || 0),
										0,
									)}
								</span>
							</div>
							<div className="flex justify-between">
								<span className="text-gray-600">Active Events</span>
								<span className="font-semibold">
									{
										events.filter((e: any) => new Date(e.date) >= new Date())
											.length
									}
								</span>
							</div>
						</div>
					</Card>
				</Col>
			</Row>

			{/* Recent Data Tables */}
			<Row gutter={[16, 16]}>
				<Col xs={24} lg={12}>
					<Card title="Recent Events">
						<Table
							dataSource={events.slice(0, 5)}
							columns={eventColumns}
							rowKey="_id"
							pagination={false}
							size="small"
						/>
					</Card>
				</Col>
				<Col xs={24} lg={12}>
					<Card title="Recent Donations">
						<Table
							dataSource={donations.slice(0, 5)}
							columns={donationColumns}
							rowKey="_id"
							pagination={false}
							size="small"
						/>
					</Card>
				</Col>
			</Row>
		</div>
	);
};

export default Overview;
