import { useQuery } from "@tanstack/react-query";
import { Card, Row, Col, Statistic, Table, Tag } from "antd";
import DashboardSkeleton from "../../../components/DashboardSkeleton";
import {
	UserOutlined,
	CalendarOutlined,
	DollarOutlined,
	TeamOutlined,
	RiseOutlined,
	TrophyOutlined,
} from "@ant-design/icons";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import moment from "moment";

type User = {
	_id: string;
	name: string;
	email: string;
	role: string;
	createdAt: string;
};

type Event = {
	_id: string;
	title: string;
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

const Reports = () => {
	const axiosSecure = useAxiosSecure();

	// Fetch all data
	const { data: users = [], isLoading: usersLoading } = useQuery({
		queryKey: ["reportUsers"],
		queryFn: async () => {
			const res = await axiosSecure.get("/users");
			return res.data;
		},
	});

	const { data: events = [], isLoading: eventsLoading } = useQuery({
		queryKey: ["reportEvents"],
		queryFn: async () => {
			const res = await axiosSecure.get("/events");
			return res.data;
		},
	});

	const { data: donations = [], isLoading: donationsLoading } = useQuery({
		queryKey: ["reportDonations"],
		queryFn: async () => {
			const res = await axiosSecure.get("/donations");
			return res.data;
		},
	});

	const isLoading = usersLoading || eventsLoading || donationsLoading;

	// Calculate growth metrics
	const now = new Date();
	const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
	const thisMonth = new Date(now.getFullYear(), now.getMonth(), 1);

	const usersThisMonth = users.filter(
		(u: User) => new Date(u.createdAt) >= thisMonth,
	).length;
	const usersLastMonth = users.filter(
		(u: User) =>
			new Date(u.createdAt) >= lastMonth && new Date(u.createdAt) < thisMonth,
	).length;
	const userGrowth =
		usersLastMonth ?
			((usersThisMonth - usersLastMonth) / usersLastMonth) * 100
		:	100;

	const donationsThisMonth = donations
		.filter((d: Donation) => new Date(d.donatedAt) >= thisMonth)
		.reduce((acc: number, d: Donation) => acc + (d.amount || 0), 0);
	const donationsLastMonth = donations
		.filter(
			(d: Donation) =>
				new Date(d.donatedAt) >= lastMonth && new Date(d.donatedAt) < thisMonth,
		)
		.reduce((acc: number, d: Donation) => acc + (d.amount || 0), 0);
	const donationGrowth =
		donationsLastMonth ?
			((donationsThisMonth - donationsLastMonth) / donationsLastMonth) * 100
		:	100;

	// Get top events by volunteers
	const topEvents = [...events]
		.sort(
			(a: Event, b: Event) =>
				(b.volunteers?.length || 0) - (a.volunteers?.length || 0),
		)
		.slice(0, 5);

	// Monthly data for chart
	const monthlyData = [...Array(6)]
		.map((_, i) => {
			const monthDate = moment().subtract(i, "months");
			const monthUsers = users.filter((u: User) => {
				const date = moment(u.createdAt);
				return (
					date.month() === monthDate.month() && date.year() === monthDate.year()
				);
			}).length;
			const monthDonations = donations
				.filter((d: Donation) => {
					const date = moment(d.donatedAt);
					return (
						date.month() === monthDate.month() &&
						date.year() === monthDate.year()
					);
				})
				.reduce((acc: number, d: Donation) => acc + (d.amount || 0), 0);
			const monthEvents = events.filter((e: Event) => {
				const date = moment(e.date);
				return (
					date.month() === monthDate.month() && date.year() === monthDate.year()
				);
			}).length;

			return {
				month: monthDate.format("MMM YYYY"),
				users: monthUsers,
				donations: monthDonations,
				events: monthEvents,
			};
		})
		.reverse();

	// Event columns
	const eventColumns = [
		{
			title: "Rank",
			key: "rank",
			render: (_: any, __: any, index: number) => (
				<span
					className={`w-6 h-6 inline-flex items-center justify-center rounded-full text-white text-sm ${
						index === 0 ? "bg-yellow-500"
						: index === 1 ? "bg-gray-400"
						: index === 2 ? "bg-orange-400"
						: "bg-gray-300"
					}`}
				>
					{index + 1}
				</span>
			),
			width: 60,
		},
		{
			title: "Event",
			dataIndex: "title",
			key: "title",
		},
		{
			title: "Location",
			dataIndex: "location",
			key: "location",
		},
		{
			title: "Date",
			dataIndex: "date",
			key: "date",
			render: (date: string) => moment(date).format("MMM D, YYYY"),
		},
		{
			title: "Volunteers",
			dataIndex: "volunteers",
			key: "volunteers",
			render: (volunteers: string[]) => (
				<Tag color="green">{volunteers?.length || 0}</Tag>
			),
		},
	];

	if (isLoading) {
		return <DashboardSkeleton />;
	}

	return (
		<div>
			<h2 className="text-2xl font-bold text-gray-800 mb-6">
				Reports & Analytics
			</h2>

			<Row gutter={[16, 16]} className="mb-6">
				<Col xs={24} sm={12} lg={6}>
					<Card>
						<Statistic
							title="Total Users"
							value={users.length}
							prefix={<UserOutlined />}
							valueStyle={{ color: "#21764C" }}
							suffix={
								<span
									className={`text-sm ${userGrowth >= 0 ? "text-green-500" : "text-red-500"}`}
								>
									{userGrowth >= 0 ? "+" : ""}
									{userGrowth.toFixed(1)}%
								</span>
							}
						/>
					</Card>
				</Col>
				<Col xs={24} sm={12} lg={6}>
					<Card>
						<Statistic
							title="Total Events"
							value={events.length}
							prefix={<CalendarOutlined />}
							valueStyle={{ color: "#722ed1" }}
						/>
					</Card>
				</Col>
				<Col xs={24} sm={12} lg={6}>
					<Card>
						<Statistic
							title="Total Donations"
							value={donations.reduce(
								(acc: number, d: Donation) => acc + (d.amount || 0),
								0,
							)}
							prefix={<DollarOutlined />}
							precision={2}
							valueStyle={{ color: "#52c41a" }}
							suffix={
								<span
									className={`text-sm ${donationGrowth >= 0 ? "text-green-500" : "text-red-500"}`}
								>
									{donationGrowth >= 0 ? "+" : ""}
									{donationGrowth.toFixed(1)}%
								</span>
							}
						/>
					</Card>
				</Col>
				<Col xs={24} sm={12} lg={6}>
					<Card>
						<Statistic
							title="Total Volunteers"
							value={
								users.filter((u: User) => u.role?.toLowerCase() === "volunteer")
									.length
							}
							prefix={<TeamOutlined />}
							valueStyle={{ color: "#1890ff" }}
						/>
					</Card>
				</Col>
			</Row>

			<Row gutter={[16, 16]} className="mb-6">
				<Col xs={24} lg={12}>
					<Card title="Monthly Growth Overview" className="h-full">
						<div className="overflow-x-auto">
							<table className="w-full text-sm">
								<thead>
									<tr className="border-b">
										<th className="text-left py-2">Month</th>
										<th className="text-right py-2">New Users</th>
										<th className="text-right py-2">Events</th>
										<th className="text-right py-2">Donations</th>
									</tr>
								</thead>
								<tbody>
									{monthlyData.map((data, i) => (
										<tr key={i} className="border-b hover:bg-gray-50">
											<td className="py-2 font-medium">{data.month}</td>
											<td className="text-right py-2">
												<Tag color="green">{data.users}</Tag>
											</td>
											<td className="text-right py-2">
												<Tag color="purple">{data.events}</Tag>
											</td>
											<td className="text-right py-2">
												<span className="text-green-600 font-semibold">
													${data.donations.toFixed(2)}
												</span>
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					</Card>
				</Col>
				<Col xs={24} lg={12}>
					<Card title="User Distribution" className="h-full">
						<div className="space-y-6">
							{["Volunteer", "Donor", "admin"].map((role) => {
								const count = users.filter(
									(u: User) => u.role?.toLowerCase() === role.toLowerCase(),
								).length;
								const percentage =
									users.length ? ((count / users.length) * 100).toFixed(1) : 0;
								const color =
									role === "admin" ? "bg-red-500"
									: role === "Volunteer" ? "bg-blue-500"
									: "bg-green-500";

								return (
									<div key={role}>
										<div className="flex justify-between mb-2">
											<span className="capitalize font-medium">{role}s</span>
											<span>
												{count} ({percentage}%)
											</span>
										</div>
										<div className="w-full bg-gray-200 rounded-full h-3">
											<div
												className={`${color} h-3 rounded-full transition-all`}
												style={{ width: `${percentage}%` }}
											></div>
										</div>
									</div>
								);
							})}
						</div>
					</Card>
				</Col>
			</Row>

			<Card
				title={
					<span>
						<TrophyOutlined className="mr-2 text-yellow-500" />
						Top Events by Volunteer Participation
					</span>
				}
			>
				<Table
					dataSource={topEvents}
					columns={eventColumns}
					rowKey="_id"
					pagination={false}
				/>
			</Card>
		</div>
	);
};

export default Reports;
