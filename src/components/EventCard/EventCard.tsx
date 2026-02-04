import moment from "moment";
import React from "react";
import { Link } from "react-router-dom";
import type { Event } from "../../pages/Home/Events";
import { motion } from "framer-motion";
import { hoverLiftLarge, hoverImageZoom, transitions } from "../../animations";

const defaultImage = "/event-images/tree-planting.png";

const EventCard: React.FC<{ event: Event }> = ({ event }) => {
	return (
		<motion.div
			className="border rounded-2xl bg-white border-gray-300 overflow-hidden"
			whileHover={hoverLiftLarge}
			initial={{ boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)" }}
		>
			<div className="overflow-hidden">
				<motion.img
					src={event.image || defaultImage}
					alt={event.title}
					className="w-full h-48 object-cover"
					whileHover={hoverImageZoom}
					transition={transitions.smooth}
				/>
			</div>
			<div className="p-5 space-y-2">
				<h1 className="text-xl font-semibold">{event.title}</h1>
				<p className="text-gray-600 text-sm line-clamp-2">
					{event.description}
				</p>
				<div className="flex items-center justify-between pt-2">
					<p className="text-gray-500 text-sm">
						{moment(event.date).format("MMMM D, YYYY")}
					</p>
					<Link
						to={`/events/${event._id}`}
						className="text-green-600 hover:underline hover:text-primary-hover text-sm"
					>
						See Details →
					</Link>
				</div>
			</div>
		</motion.div>
	);
};

export default EventCard;
