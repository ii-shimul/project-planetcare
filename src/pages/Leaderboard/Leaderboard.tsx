import { useQuery } from "@tanstack/react-query";
import { Card, Avatar, Skeleton } from "antd";
import { TrophyOutlined, UserOutlined } from "@ant-design/icons";
import useAxios from "../../hooks/useAxios";
import Header from "../../components/Header/Header";
import { motion } from "framer-motion";
import { staggerContainer, fadeUp, fadeUpSmall } from "../../animations";

type LeaderboardEntry = {
	email: string;
	name: string;
	photo: string | null;
	eventCount: number;
};

const Leaderboard = () => {
	const axiosPublic = useAxios();

	const { data: leaderboard = [], isLoading } = useQuery({
		queryKey: ["leaderboard"],
		queryFn: async () => {
			const res = await axiosPublic.get("/events/leaderboard/top");
			return res.data;
		},
	});

	const getMedalColor = (index: number) => {
		if (index === 0) return "#FFD700";
		if (index === 1) return "#C0C0C0";
		if (index === 2) return "#CD7F32";
		return "#21764C";
	};

	return (
		<div>
			<Header
				title="Volunteer Leaderboard"
				subtitle="Recognizing our top environmental champions"
			/>

			<section className="max-w-2xl mx-auto px-4 py-10">
				<Card className="shadow-lg">
					<motion.div
						className="text-center mb-6"
						initial="hidden"
						animate="visible"
						variants={staggerContainer}
					>
						<motion.div variants={fadeUp}>
							<TrophyOutlined className="text-5xl text-yellow-500 mb-2" />
						</motion.div>
						<motion.h2
							className="text-2xl font-bold text-gray-800"
							variants={fadeUp}
						>
							Top Volunteers
						</motion.h2>
						<motion.p className="text-gray-500" variants={fadeUp}>
							Our most dedicated volunteers making a difference
						</motion.p>
					</motion.div>

					{isLoading ?
						<div className="space-y-4">
							{[1, 2, 3, 4, 5].map((i) => (
								<Skeleton key={i} active avatar paragraph={{ rows: 1 }} />
							))}
						</div>
					: leaderboard.length > 0 ?
						<motion.div
							className="space-y-3"
							initial="hidden"
							animate="visible"
							variants={staggerContainer}
						>
							{leaderboard.map((entry: LeaderboardEntry, index: number) => (
								<motion.div
									key={entry.email}
									className={`flex items-center gap-3 p-3 rounded-lg transition ${
										index < 3 ?
											"bg-gradient-to-r from-yellow-50 to-transparent border border-yellow-200"
										:	"bg-gray-50 hover:bg-gray-100"
									}`}
									variants={fadeUpSmall}
								>
									<div
										className="w-10 h-10 flex items-center justify-center rounded-full font-bold text-lg"
										style={{
											backgroundColor:
												index < 3 ? getMedalColor(index) : "#e5e7eb",
											color: index < 3 ? "white" : "#6b7280",
										}}
									>
										{index < 3 ?
											<TrophyOutlined />
										:	<span className="text-sm">{index + 1}</span>}
									</div>

									<Avatar
										size={48}
										src={entry.photo}
										icon={<UserOutlined />}
										style={{
											backgroundColor: getMedalColor(index),
										}}
									/>

									<div className="flex-1 min-w-0">
										<p className="font-semibold text-gray-800 truncate">
											{entry.name}
										</p>
										<p className="text-xs text-gray-500 truncate">
											{entry.email}
										</p>
									</div>

									<div className="text-right">
										<p
											className="text-xl font-bold"
											style={{ color: getMedalColor(index) }}
										>
											{entry.eventCount}
										</p>
										<p className="text-xs text-gray-500">
											{entry.eventCount === 1 ? "event" : "events"}
										</p>
									</div>
								</motion.div>
							))}
						</motion.div>
					:	<div className="text-center py-12 text-gray-500">
							<p>No volunteers yet. Be the first to join an event!</p>
						</div>
					}
				</Card>
			</section>
		</div>
	);
};

export default Leaderboard;
