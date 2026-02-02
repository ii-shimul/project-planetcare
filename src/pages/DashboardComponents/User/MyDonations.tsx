import { useQuery } from "@tanstack/react-query";
import { Table, Tag, Spin, Empty, Card, Statistic, Row, Col } from "antd";
import { DollarOutlined, CalendarOutlined } from "@ant-design/icons";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import moment from "moment";

type Donation = {
	_id: string;
	donorEmail: string;
	amount: number;
	message?: string;
	status: string;
	donatedAt: string;
};

const MyDonations = () => {
	const { user } = useAuth();
	const axiosSecure = useAxiosSecure();

	const { data: myDonations = [], isLoading } = useQuery({
		queryKey: ["myAllDonations", user?.email],
		queryFn: async () => {
			const res = await axiosSecure.get(`/donations/my/${user?.email}`);
			return res.data;
		},
		enabled: !!user?.email,
	});

	const totalDonated = myDonations.reduce(
		(acc: number, d: Donation) => acc + (d.amount || 0),
		0,
	);

	const thisMonthDonations = myDonations.filter((d: Donation) => {
		const date = new Date(d.donatedAt);
		const now = new Date();
		return (
			date.getMonth() === now.getMonth() &&
			date.getFullYear() === now.getFullYear()
		);
	});

	const thisMonthTotal = thisMonthDonations.reduce(
		(acc: number, d: Donation) => acc + (d.amount || 0),
		0,
	);

	const columns = [
		{
			title: "Amount",
			dataIndex: "amount",
			key: "amount",
			render: (amount: number) => (
				<span className="font-semibold text-green-600">
					${amount?.toFixed(2)}
				</span>
			),
			sorter: (a: Donation, b: Donation) => a.amount - b.amount,
		},
		{
			title: "Message",
			dataIndex: "message",
			key: "message",
			render: (message: string) => message || "-",
			ellipsis: true,
		},
		{
			title: "Date",
			dataIndex: "donatedAt",
			key: "donatedAt",
			render: (date: string) => (
				<span>
					<CalendarOutlined className="mr-1 text-gray-400" />
					{moment(date).format("MMM D, YYYY, h:mm A")}
				</span>
			),
			sorter: (a: Donation, b: Donation) =>
				new Date(a.donatedAt).getTime() - new Date(b.donatedAt).getTime(),
			defaultSortOrder: "descend" as const,
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
		return (
			<div className="flex justify-center items-center h-64">
				<Spin size="large" />
			</div>
		);
	}

	return (
		<div>
			<h2 className="text-2xl font-bold text-gray-800 mb-6">My Donations</h2>

			{/* Stats */}
			<Row gutter={[16, 16]} className="mb-6">
				<Col xs={24} sm={8}>
					<Card>
						<Statistic
							title="Total Donated"
							value={totalDonated}
							prefix={<DollarOutlined />}
							precision={2}
							valueStyle={{ color: "#21764C" }}
						/>
					</Card>
				</Col>
				<Col xs={24} sm={8}>
					<Card>
						<Statistic
							title="This Month"
							value={thisMonthTotal}
							prefix={<DollarOutlined />}
							precision={2}
							valueStyle={{ color: "#1890ff" }}
						/>
					</Card>
				</Col>
				<Col xs={24} sm={8}>
					<Card>
						<Statistic
							title="Total Donations"
							value={myDonations.length}
							valueStyle={{ color: "#722ed1" }}
						/>
					</Card>
				</Col>
			</Row>

			{/* Donations Table */}
			<Card>
				{myDonations.length > 0 ?
					<Table
						dataSource={myDonations}
						columns={columns}
						rowKey="_id"
						pagination={{ pageSize: 10 }}
					/>
				:	<Empty description="No donations yet. Make a difference today!" />}
			</Card>
		</div>
	);
};

export default MyDonations;
