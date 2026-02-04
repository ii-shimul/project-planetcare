import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import useAxios from "../../hooks/useAxios";
import moment from "moment";
import useAuth from "../../hooks/useAuth";
import { message, Skeleton, Input, Button, Avatar } from "antd";
import { UserOutlined, DeleteOutlined, SendOutlined } from "@ant-design/icons";
import { useState } from "react";
import { motion } from "framer-motion";
import { staggerContainer, fadeUp, fadeUpSmall } from "../../animations";

const defaultImage = "/event-images/tree-planting.png";

type Comment = {
	_id: string;
	eventId: string;
	userEmail: string;
	userName: string;
	userPhoto: string | null;
	content: string;
	createdAt: string;
};

const EventDetails = () => {
	const { id } = useParams();
	const { user } = useAuth();
	const axiosPublic = useAxios();
	const queryClient = useQueryClient();
	const [commentText, setCommentText] = useState("");

	const {
		data: event,
		isLoading,
		refetch,
	} = useQuery({
		queryKey: ["event details", id],
		queryFn: async () => {
			const result = await axiosPublic.get(`/events/${id}`);
			return result.data;
		},
	});

	const { data: comments = [], isLoading: commentsLoading } = useQuery({
		queryKey: ["comments", id],
		queryFn: async () => {
			const result = await axiosPublic.get(`/comments/${id}`);
			return result.data;
		},
	});

	const addCommentMutation = useMutation({
		mutationFn: async (content: string) => {
			const res = await axiosPublic.post("/comments", {
				eventId: id,
				userEmail: user?.email,
				userName: user?.displayName || user?.email?.split("@")[0],
				userPhoto: user?.photoURL || null,
				content,
			});
			return res.data;
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["comments", id] });
			setCommentText("");
			message.success("Comment added!");
		},
		onError: () => {
			message.error("Failed to add comment");
		},
	});

	const deleteCommentMutation = useMutation({
		mutationFn: async (commentId: string) => {
			await axiosPublic.delete(`/comments/${commentId}`, {
				data: { userEmail: user?.email },
			});
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["comments", id] });
			message.success("Comment deleted");
		},
		onError: () => {
			message.error("Failed to delete comment");
		},
	});

	const handleVolunteerRegistration = async () => {
		if (!user?.email) {
			message.error("You have to login first!");
			return;
		}
		try {
			await axiosPublic.patch(`/events/volunteer/${id}`, {
				email: user.email,
			});
			refetch();
			message.success("Thank you for volunteering!");
		} catch (error: any) {
			console.log(error);
			message.error(`${error.response.data.message}`);
		}
	};

	const handleUnvolunteer = async () => {
		if (!user?.email) {
			message.error("You have to login first!");
			return;
		}
		try {
			await axiosPublic.patch(`/events/unvolunteer/${id}`, {
				email: user.email,
			});
			refetch();
			message.success("You have been removed from this event");
		} catch (error: any) {
			console.log(error);
			message.error(`${error.response.data.message}`);
		}
	};

	const handleAddComment = () => {
		if (!user?.email) {
			message.error("Please login to comment");
			return;
		}
		if (!commentText.trim()) {
			message.error("Please enter a comment");
			return;
		}
		addCommentMutation.mutate(commentText.trim());
	};

	if (isLoading) {
		return (
			<section className="max-w-4xl mx-auto px-4 py-10 mt-4 md:mt-10">
				<Skeleton.Image active style={{ width: "100%", height: 300 }} />
				<Skeleton active paragraph={{ rows: 5 }} className="mt-6" />
			</section>
		);
	}

	return (
		<motion.section
			className="max-w-4xl mx-auto px-4 py-10 mt-4 md:mt-10"
			initial="hidden"
			animate="visible"
			variants={staggerContainer}
		>
			<motion.div className="rounded-xl overflow-hidden mb-6" variants={fadeUp}>
				<img
					src={event.image || defaultImage}
					alt={event.title}
					className="w-full h-64 md:h-80 object-cover"
				/>
			</motion.div>

			<motion.div
				className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8"
				variants={fadeUp}
			>
				<h1 className="text-3xl font-bold text-green-700 mb-2">
					{event.title}
				</h1>
				<p className="text-sm text-gray-500 mb-6">
					📅 {moment(event.date).format("MMMM D, YYYY, LT")} | 📍{" "}
					{event.location}
				</p>

				<p className="text-gray-700 leading-relaxed mb-6">
					{event.description}
				</p>

				<div className="bg-green-50 p-4 rounded-lg border border-green-100 mb-6">
					<p className="text-sm text-green-700">
						<span className="font-medium">Created By:</span> {event.createdBy}
					</p>
					<p className="text-sm text-green-700 mt-1">
						<span className="font-medium">Volunteers Registered:</span>{" "}
						{event?.volunteers?.length}
					</p>
				</div>

				<motion.button
					onClick={
						event?.volunteers?.includes(user?.email || "") ?
							handleUnvolunteer
						:	handleVolunteerRegistration
					}
					className={`px-5 py-2 rounded-md transition ${
						event?.volunteers?.includes(user?.email || "") ?
							"bg-red-500 hover:bg-red-600 text-white"
						:	"bg-green-600 hover:bg-green-700 text-white"
					}`}
					whileHover={{ scale: 1.02 }}
					whileTap={{ scale: 0.98 }}
				>
					{event?.volunteers?.includes(user?.email || "") ?
						"Unvolunteer"
					:	"Volunteer for this Event"}
				</motion.button>
			</motion.div>

			<motion.div
				className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8 mt-6"
				variants={fadeUp}
			>
				<h2 className="text-xl font-bold text-gray-800 mb-4">
					Discussion ({comments.length})
				</h2>

				{user?.email ?
					<div className="flex gap-3 mb-6">
						<Avatar src={user?.photoURL} icon={<UserOutlined />} size={40} />
						<div className="flex-1">
							<Input.TextArea
								value={commentText}
								onChange={(e) => setCommentText(e.target.value)}
								placeholder="Share your thoughts about this event..."
								rows={2}
							/>
							<Button
								type="primary"
								icon={<SendOutlined />}
								onClick={handleAddComment}
								loading={addCommentMutation.isPending}
								style={{ backgroundColor: "#21764C" }}
								className="mt-2"
							>
								Post Comment
							</Button>
						</div>
					</div>
				:	<p className="text-gray-500 mb-6 text-center py-4 bg-gray-50 rounded-lg">
						Please login to join the discussion
					</p>
				}

				{commentsLoading ?
					<Skeleton active paragraph={{ rows: 3 }} />
				: comments.length > 0 ?
					<motion.div
						className="space-y-4"
						initial="hidden"
						animate="visible"
						variants={staggerContainer}
					>
						{comments.map((comment: Comment) => (
							<motion.div
								key={comment._id}
								className="flex gap-3 p-4 bg-gray-50 rounded-lg"
								variants={fadeUpSmall}
							>
								<Avatar
									src={comment.userPhoto}
									icon={<UserOutlined />}
									size={40}
								/>
								<div className="flex-1">
									<div className="flex justify-between items-start">
										<div>
											<span className="font-medium text-gray-800">
												{comment.userName}
											</span>
											<span className="text-xs text-gray-500 ml-2">
												{moment(comment.createdAt).fromNow()}
											</span>
										</div>
										{comment.userEmail === user?.email && (
											<button
												onClick={() =>
													deleteCommentMutation.mutate(comment._id)
												}
												className="text-red-500 hover:text-red-600 transition"
												title="Delete comment"
											>
												<DeleteOutlined />
											</button>
										)}
									</div>
									<p className="text-gray-700 mt-1">{comment.content}</p>
								</div>
							</motion.div>
						))}
					</motion.div>
				:	<p className="text-gray-500 text-center py-8">
						No comments yet. Be the first to share your thoughts!
					</p>
				}
			</motion.div>
		</motion.section>
	);
};

export default EventDetails;
