import { useQuery } from "@tanstack/react-query";
import useAxios from "../../hooks/useAxios";
import EventCard from "../../components/EventCard/EventCard";
import EventCardSkeleton from "../../components/EventCard/EventCardSkeleton";
import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { staggerContainerFast, fadeUp } from "../../animations";

export type Event = {
	readonly _id: string;
	title: string;
	description: string;
	location: string;
	date: Date;
	volunteers: Array<string>;
	image?: string;
};

const Events = () => {
	const axiosPublic = useAxios();
	const ref = useRef(null);
	const isInView = useInView(ref, { once: true, margin: "-50px" });

	const { data: events, isLoading } = useQuery({
		queryKey: ["eventsHome"],
		queryFn: async () => {
			const result = await axiosPublic.get("/events");
			console.log(result.data);
			return result.data;
		},
	});

	return (
		<section className="py-16 bg-gray-100 px-4" ref={ref}>
			<motion.div
				className="max-w-7xl mx-auto"
				initial="hidden"
				animate={isInView ? "visible" : "hidden"}
				variants={staggerContainerFast}
			>
				<motion.h2
					className="text-4xl font-bold text-center text-primary mb-4"
					variants={fadeUp}
				>
					Upcoming Events
				</motion.h2>
				<motion.p
					className="text-center text-gray-600 max-w-2xl mx-auto mb-10"
					variants={fadeUp}
				>
					From local park cleanups and tree planting drives to educational
					workshops and recycling seminars, discover how you can get involved
					today. There is an event for everyone, everywhere.
				</motion.p>
				<motion.div className="grid md:grid-cols-3 gap-6" variants={fadeUp}>
					{isLoading ?
						Array(6)
							.fill(null)
							.map((_, index) => <EventCardSkeleton key={index} />)
					:	events
							.slice(0, 3)
							.map((event: Event) => (
								<EventCard key={event._id} event={event} />
							))
					}
				</motion.div>
				<motion.div className="text-center mt-8" variants={fadeUp}>
					<Link to={"/events"} className="text-green-600 hover:underline">
						See All Events →
					</Link>
				</motion.div>
			</motion.div>
		</section>
	);
};

export default Events;
