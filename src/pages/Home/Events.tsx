import { useQuery } from "@tanstack/react-query";
import useAxios from "../../hooks/useAxios";
import EventCard from "../../components/EventCard/EventCard";
import EventCardSkeleton from "../../components/EventCard/EventCardSkeleton";
import { Link } from "react-router-dom";

export type Event = {
	readonly _id: string;
	title: string;
	description: string;
	location: string;
	date: Date;
	volunteers: Array<string>;
};

const Events = () => {
	const axiosPublic = useAxios();
	const { data: events, isLoading } = useQuery({
		queryKey: ["eventsHome"],
		queryFn: async () => {
			const result = await axiosPublic.get("/events");
			console.log(result.data);
			return result.data;
		},
	});
	return (
		<section className="py-16 bg-gray-100 px-4">
			<div className="max-w-7xl mx-auto">
				<h2 className="text-4xl font-bold text-center text-primary mb-10">
					Upcoming Events
				</h2>
				<div className="grid md:grid-cols-3 gap-6">
					{isLoading
						? Array(6)
								.fill(null)
								.map((_, index) => <EventCardSkeleton key={index} />)
						: events
								.slice(0, 6)
								.map((event: Event) => (
									<EventCard key={event._id} event={event} />
								))}
				</div>
				<div className="text-center mt-8">
					<Link to={"/events"} className="text-green-600 hover:underline">
						See All Events →
					</Link>
				</div>
			</div>
		</section>
	);
};

export default Events;
