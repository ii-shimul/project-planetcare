import { useQuery } from "@tanstack/react-query";
import { Card, Avatar, Skeleton, Statistic, Row, Col } from "antd";
import { HeartOutlined, UserOutlined, DollarOutlined } from "@ant-design/icons";
import useAxios from "../../hooks/useAxios";
import Header from "../../components/Header/Header";
import moment from "moment";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
	staggerContainer,
	fadeUp,
	fadeUpSmall,
	hoverLift,
} from "../../animations";

type Donor = {
	name: string;
	email: string;
	totalAmount: number;
	donationCount: number;
	lastDonation: string;
	message: string | null;
};

const Donors = () => {
	const axiosPublic = useAxios();
	const statsRef = useRef(null);
	const statsInView = useInView(statsRef, { once: true, margin: "-50px" });

	const { data: donors = [], isLoading } = useQuery<Donor[]>({
		queryKey: ["donorWall"],
		queryFn: async () => {
			const res = await axiosPublic.get("/donations/public/wall");
			return res.data;
		},
	});

	const totalDonations = donors.reduce((sum, d) => sum + d.totalAmount, 0);
	const totalDonors = donors.length;

	const getTierColor = (amount: number) => {
		if (amount >= 10000)
			return {
				bg: "from-yellow-400 to-amber-500",
				text: "text-amber-700",
				tier: "🏆 Platinum",
			};
		if (amount >= 5000)
			return {
				bg: "from-yellow-200 to-yellow-400",
				text: "text-yellow-700",
				tier: "🥇 Gold",
			};
		if (amount >= 1000)
			return {
				bg: "from-gray-200 to-gray-400",
				text: "text-gray-700",
				tier: "🥈 Silver",
			};
		if (amount >= 500)
			return {
				bg: "from-orange-200 to-orange-400",
				text: "text-orange-700",
				tier: "🥉 Bronze",
			};
		return {
			bg: "from-green-100 to-green-200",
			text: "text-green-700",
			tier: "💚 Supporter",
		};
	};

	return (
		<div>
			<Header
				title="Donor Recognition Wall"
				subtitle="Celebrating the generous hearts making our mission possible"
			/>

			<section className="max-w-6xl mx-auto px-4 py-10">
				<motion.div
					ref={statsRef}
					initial="hidden"
					animate={statsInView ? "visible" : "hidden"}
					variants={staggerContainer}
				>
					<Row gutter={[24, 24]} className="mb-10">
						<Col xs={24} md={12}>
							<motion.div variants={fadeUp}>
								<Card className="text-center bg-gradient-to-br from-green-50 to-green-100 border-green-200">
									<Statistic
										title={
											<span className="text-green-700 font-medium">
												Total Raised
											</span>
										}
										value={totalDonations}
										prefix={<DollarOutlined className="text-green-600" />}
										suffix="BDT"
										valueStyle={{ color: "#15803d", fontWeight: "bold" }}
									/>
								</Card>
							</motion.div>
						</Col>
						<Col xs={24} md={12}>
							<motion.div variants={fadeUp}>
								<Card className="text-center bg-gradient-to-br from-pink-50 to-pink-100 border-pink-200">
									<Statistic
										title={
											<span className="text-pink-700 font-medium">
												Generous Donors
											</span>
										}
										value={totalDonors}
										prefix={<HeartOutlined className="text-pink-600" />}
										valueStyle={{ color: "#be185d", fontWeight: "bold" }}
									/>
								</Card>
							</motion.div>
						</Col>
					</Row>
				</motion.div>

				<motion.div
					className="text-center mb-10"
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5, delay: 0.3 }}
				>
					<h2 className="text-2xl font-bold text-gray-800 mb-2">
						Thank You, Heroes! 💚
					</h2>
					<p className="text-gray-600 max-w-2xl mx-auto">
						Every donation, big or small, helps us create a greener, healthier
						planet. We're deeply grateful for your support and commitment to our
						cause.
					</p>
				</motion.div>

				{isLoading ?
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
						{[1, 2, 3, 4, 5, 6].map((i) => (
							<Card key={i}>
								<Skeleton active avatar paragraph={{ rows: 2 }} />
							</Card>
						))}
					</div>
				: donors.length > 0 ?
					<motion.div
						className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
						initial="hidden"
						animate="visible"
						variants={staggerContainer}
					>
						{donors.map((donor, index) => {
							const tier = getTierColor(donor.totalAmount);
							return (
								<motion.div
									key={donor.email}
									variants={fadeUpSmall}
									whileHover={hoverLift}
								>
									<Card
										className={`overflow-hidden transition h-full ${index < 3 ? "ring-2 ring-yellow-400" : ""}`}
									>
										<div
											className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${tier.bg}`}
										/>

										<div className="flex items-start gap-4 h-full">
											{index < 3 && (
												<div className="absolute -top-2 -right-2 w-10 h-10 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-full flex items-center justify-center shadow-lg">
													<span className="text-white font-bold">
														#{index + 1}
													</span>
												</div>
											)}

											<Avatar
												size={56}
												icon={<UserOutlined />}
												className={`bg-gradient-to-br ${tier.bg}`}
											/>

											<div className="flex-1">
												<h3 className="font-bold text-gray-800 text-lg">
													{donor.name}
												</h3>
												<p className={`text-sm font-medium ${tier.text}`}>
													{tier.tier}
												</p>
												<div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
													<span className="font-semibold text-green-600">
														৳{donor.totalAmount.toLocaleString()}
													</span>
													<span>•</span>
													<span>
														{donor.donationCount} donation
														{donor.donationCount > 1 ? "s" : ""}
													</span>
												</div>
												{donor.message && (
													<p className="mt-2 text-sm text-gray-500 italic">
														"{donor.message}"
													</p>
												)}
												<p className="mt-1 text-xs text-gray-400">
													Last donated {moment(donor.lastDonation).fromNow()}
												</p>
											</div>
										</div>
									</Card>
								</motion.div>
							);
						})}
					</motion.div>
				:	<Card className="text-center py-12">
						<HeartOutlined className="text-5xl text-gray-300 mb-4" />
						<p className="text-gray-500 text-lg">
							Be the first to support our cause!
						</p>
						<a
							href="/donate"
							className="inline-block mt-4 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
						>
							Make a Donation
						</a>
					</Card>
				}
			</section>
		</div>
	);
};

export default Donors;
