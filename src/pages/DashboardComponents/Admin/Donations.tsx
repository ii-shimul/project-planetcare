import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
	Table,
	Input,
	Tag,
	Card,
	Row,
	Col,
	Statistic,
	Spin,
	DatePicker,
} from "antd";
import DashboardSkeleton from "../../../components/DashboardSkeleton";
import {
	SearchOutlined,
	DollarOutlined,
	UserOutlined,
	CalendarOutlined,
} from "@ant-design/icons";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import moment from "moment";
import dayjs from "dayjs";

type Donation = {
	_id: string;
	donorEmail: string;
	amount: number;
	message?: string;
	status: string;
	paymentIntentId?: string;
	donatedAt: string;
};

const { RangePicker } = DatePicker;

const Donations = () => {
	const axiosSecure = useAxiosSecure();
	const [searchText, setSearchText] = useState("");
	const [dateRange, setDateRange] = useState<
		[dayjs.Dayjs | null, dayjs.Dayjs | null] | null
	>(null);

	const { data: donations = [], isLoading } = useQuery({
		queryKey: ["manageDonations"],
		queryFn: async () => {
			const res = await axiosSecure.get("/donations");
			return res.data;
		},
	});

	const filteredDonations = donations.filter((donation: Donation) => {
		const matchesSearch = donation.donorEmail
			?.toLowerCase()
			.includes(searchText.toLowerCase());

		let matchesDate = true;
		if (dateRange && dateRange[0] && dateRange[1]) {
			const donationDate = dayjs(donation.donatedAt);
			matchesDate =
				donationDate.isAfter(dateRange[0]) &&
				donationDate.isBefore(dateRange[1].endOf("day"));
		}

		return matchesSearch && matchesDate;
	});

	const totalDonations = donations.reduce(
		(acc: number, d: Donation) => acc + (d.amount || 0),
		0,
	);
	const averageDonation =
		donations.length ? totalDonations / donations.length : 0;
	const thisMonthDonations = donations.filter((d: Donation) => {
		const donationDate = new Date(d.donatedAt);
		const now = new Date();
		return (
			donationDate.getMonth() === now.getMonth() &&
			donationDate.getFullYear() === now.getFullYear()
		);
	});
	const thisMonthTotal = thisMonthDonations.reduce(
		(acc: number, d: Donation) => acc + (d.amount || 0),
		0,
	);

	const columns = [
		{
			title: "Donor Email",
			dataIndex: "donorEmail",
			key: "donorEmail",
			sorter: (a: Donation, b: Donation) =>
				a.donorEmail?.localeCompare(b.donorEmail),
			render: (email: string) => (
				<span>
					<UserOutlined className="mr-2 text-gray-400" />
					{email || "Anonymous"}
				</span>
			),
		},
		{
			title: "Amount",
			dataIndex: "amount",
			key: "amount",
			render: (amount: number) => (
				<span className="font-semibold text-green-600">
					${amount?.toFixed(2) || "0.00"}
				</span>
			),
			sorter: (a: Donation, b: Donation) => (a.amount || 0) - (b.amount || 0),
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
					<CalendarOutlined className="mr-2 text-gray-400" />
					{date ? moment(date).format("MMM D, YYYY, h:mm A") : "N/A"}
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
					{status?.toUpperCase() || "PENDING"}
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
				Donation Management
			</h2>

			{/* Stats Cards */}
			<Row gutter={[16, 16]} className="mb-6">
				<Col xs={24} sm={12} lg={6}>
					<Card>
						<Statistic
							title="Total Donations"
							value={totalDonations}
							prefix={<DollarOutlined />}
							precision={2}
							valueStyle={{ color: "#21764C" }}
						/>
					</Card>
				</Col>
				<Col xs={24} sm={12} lg={6}>
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
				<Col xs={24} sm={12} lg={6}>
					<Card>
						<Statistic
							title="Total Donations Count"
							value={donations.length}
							prefix={<UserOutlined />}
							valueStyle={{ color: "#722ed1" }}
						/>
					</Card>
				</Col>
				<Col xs={24} sm={12} lg={6}>
					<Card>
						<Statistic
							title="Average Donation"
							value={averageDonation}
							prefix={<DollarOutlined />}
							precision={2}
							valueStyle={{ color: "#52c41a" }}
						/>
					</Card>
				</Col>
			</Row>

			{/* Donation Breakdown */}
			<Row gutter={[16, 16]} className="mb-6">
				<Col xs={24} lg={12}>
					<Card title="Monthly Trend" className="h-full">
						<div className="space-y-3">
							{[...Array(5)].map((_, i) => {
								const monthDate = moment().subtract(i, "months");
								const monthDonations = donations.filter((d: Donation) => {
									const donationDate = moment(d.donatedAt);
									return (
										donationDate.month() === monthDate.month() &&
										donationDate.year() === monthDate.year()
									);
								});
								const monthTotal = monthDonations.reduce(
									(acc: number, d: Donation) => acc + (d.amount || 0),
									0,
								);
								const maxTotal =
									Math.max(
										...donations.map((d: Donation) => d.amount || 0),
										1,
									) * 5;

								return (
									<div key={i}>
										<div className="flex justify-between mb-1">
											<span className="text-gray-600">
												{monthDate.format("MMMM YYYY")}
											</span>
											<span className="font-semibold">
												${monthTotal.toFixed(2)}
											</span>
										</div>
										<div className="w-full bg-gray-200 rounded-full h-2">
											<div
												className="bg-green-600 h-2 rounded-full transition-all"
												style={{
													width: `${Math.min((monthTotal / maxTotal) * 100, 100)}%`,
												}}
											></div>
										</div>
									</div>
								);
							})}
						</div>
					</Card>
				</Col>
				<Col xs={24} lg={12}>
					<Card title="Top Donations" className="h-full">
						<div className="space-y-3">
							{[...donations]
								.sort(
									(a: Donation, b: Donation) =>
										(b.amount || 0) - (a.amount || 0),
								)
								.slice(0, 5)
								.map((donation: Donation, i: number) => (
									<div
										key={donation._id}
										className="flex justify-between items-center p-2 bg-gray-50 rounded"
									>
										<div className="flex items-center gap-3">
											<span
												className={`w-6 h-6 rounded-full flex items-center justify-center text-white text-sm ${
													i === 0 ? "bg-yellow-500"
													: i === 1 ? "bg-gray-400"
													: i === 2 ? "bg-orange-400"
													: "bg-gray-300"
												}`}
											>
												{i + 1}
											</span>
											<span className="truncate max-w-[200px]">
												{donation.donorEmail}
											</span>
										</div>
										<span className="font-semibold text-green-600">
											${donation.amount?.toFixed(2)}
										</span>
									</div>
								))}
						</div>
					</Card>
				</Col>
			</Row>

			{/* Filters */}
			<div className="flex flex-wrap gap-4 mb-6">
				<Input
					placeholder="Search by email..."
					prefix={<SearchOutlined />}
					value={searchText}
					onChange={(e) => setSearchText(e.target.value)}
					style={{ width: 280 }}
					allowClear
				/>
				<RangePicker
					onChange={(dates) => setDateRange(dates)}
					placeholder={["Start Date", "End Date"]}
				/>
			</div>

			{/* Donations Table */}
			<Table
				dataSource={filteredDonations}
				columns={columns}
				rowKey="_id"
				pagination={{ pageSize: 10, showSizeChanger: true }}
			/>
		</div>
	);
};

export default Donations;
