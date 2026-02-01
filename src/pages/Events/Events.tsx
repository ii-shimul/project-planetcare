import useAxios from "../../hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import moment from "moment";
import EventSkeleton from "./EventSkeleton";
import useAuth from "../../hooks/useAuth";
import { message } from "antd";
import { Event } from "../Home/Events";
import Header from "../../components/Header/Header";

const Events = () => {
	const axiosPublic = useAxios();
	const { user } = useAuth();
	// fetch events
	const {
		data: events,
		isLoading,
		refetch,
	} = useQuery({
		queryKey: ["eventsHome"],
		queryFn: async () => {
			const result = await axiosPublic.get("/events");
			return result.data;
		},
	});

	// function for handling volunteer registration
	const handleVolunteerRegistration = async (id: string) => {
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

	return (
		<div className="bg-gray-50">
			<Header
				title="🌱 PlanetCare Events"
				subtitle="Explore our upcoming events and take action to protect our planet.
					Every small step matters"
			/>
			<div className="py-12 px-4 max-w-4xl mx-auto text-center">
				<h2 className="text-3xl font-bold text-green-800">Why Participate?</h2>
				<p className="mt-4 text-gray-700">
					Our events are designed to unite communities around the shared goal of
					sustainability. Whether you're planting trees, cleaning rivers, or
					raising awareness, your contribution directly supports a healthier
					planet. Let's take action together!
				</p>
			</div>

			{/* Filter/Search */}
			<div className="mb-8 px-4 max-w-3xl mx-auto text-center">
				<input
					type="text"
					placeholder="Search events by name or location..."
					className="w-full p-3 rounded-lg border border-gray-300 focus:outline-green-600"
				/>
			</div>

			{/* Events */}
			<div className="grid md:grid-cols-3 gap-6 px-4 max-w-6xl mx-auto">
				{isLoading
					? Array(3)
							.fill(null)
							.map((_, index: number) => (
								<EventSkeleton key={index} index={index} />
							))
					: events.map((event: Event) => (
							<div
								key={event._id}
								className="flex flex-col bg-white p-6 rounded-xl shadow-md border border-gray-300 hover:shadow-lg transition"
							>
								<h2 className="text-2xl font-semibold text-green-700">
									{event.title}
								</h2>
								<p className="text-gray-600 mt-2">{event.description}</p>
								<div className="mt-4 text-sm text-gray-500 grow">
									<p>
										<strong>Date:</strong> {moment(event.date).calendar()}
									</p>
									<p>
										<strong>Location:</strong> {event.location}
									</p>
									<p>
										<strong>Volunteers:</strong> {event.volunteers.length}
									</p>
								</div>
								<button
									onClick={() => handleVolunteerRegistration(event._id)}
									className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
								>
									Register to Volunteer
								</button>
							</div>
					  ))}
			</div>

			{/* FAQ */}
			<div className="mt-20 py-12 bg-white px-4 max-w-5xl mx-auto">
				<h2 className="text-3xl font-bold text-center text-green-800 mb-8">
					Frequently Asked Questions
				</h2>
				<div className="space-y-6">
					<div>
						<h3 className="font-semibold text-lg text-green-700">
							How can I register for an event?
						</h3>
						<p className="text-gray-700 mt-1">
							Click on the "Register to Volunteer" button under each event.
							You’ll be redirected to your dashboard if you're logged in.
						</p>
					</div>
					<div>
						<h3 className="font-semibold text-lg text-green-700">
							Are the events free to join?
						</h3>
						<p className="text-gray-700 mt-1">
							Yes! All our events are community-driven and completely free to
							join.
						</p>
					</div>
					<div>
						<h3 className="font-semibold text-lg text-green-700">
							Can I suggest an event?
						</h3>
						<p className="text-gray-700 mt-1">
							Absolutely. Contact us via the contact page or email us directly
							with your proposal.
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Events;
