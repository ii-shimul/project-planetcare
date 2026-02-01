import moment from "moment";
import React from "react";
import { Link } from "react-router-dom";
import type { Event } from "../../pages/Home/Events";

const EventCard: React.FC<{ event: Event }> = ({ event }) => {
	return (
		<div className="border p-5 rounded-2xl bg-white border-gray-300 space-y-2 ">
			<h1 className="text-xl font-semibold">{event.title}</h1>
			<div className="flex items-center justify-between">
				<p>{moment(event.date).format("MMMM D, YYYY")}</p>
				<Link
					to={`/events/${event._id}`}
					className="text-green-600 hover:underline hover:text-primary-hover"
				>
					See Details
				</Link>
			</div>
		</div>
	);
};

export default EventCard;
