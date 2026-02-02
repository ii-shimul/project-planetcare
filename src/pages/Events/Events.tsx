import useAxios from "../../hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import moment from "moment";
import EventSkeleton from "./EventSkeleton";
import useAuth from "../../hooks/useAuth";
import { message, Select } from "antd";
import { Event } from "../Home/Events";
import Header from "../../components/Header/Header";
import { useState, useMemo } from "react";
import { SearchOutlined, ShareAltOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";
import { Link } from "react-router-dom";

const Events = () => {
	const axiosPublic = useAxios();
	const { user } = useAuth();

	// Search and filter state
	const [searchText, setSearchText] = useState("");
	const [dateFilter, setDateFilter] = useState<"all" | "upcoming" | "past">(
		"all",
	);
	const [locationFilter, setLocationFilter] = useState<string>("all");

	// fetch events
	const {
		data: events = [],
		isLoading,
		refetch,
	} = useQuery({
		queryKey: ["eventsHome"],
		queryFn: async () => {
			const result = await axiosPublic.get("/events");
			return result.data;
		},
	});

	// Get unique locations for filter dropdown
	const locations = useMemo(() => {
		const locs = events.map((e: Event) => e.location);
		return [...new Set(locs)] as string[];
	}, [events]);

	// Filter events based on search and filters
	const filteredEvents = useMemo(() => {
		return events.filter((event: Event) => {
			// Text search (title or location)
			const matchesSearch =
				event.title?.toLowerCase().includes(searchText.toLowerCase()) ||
				event.location?.toLowerCase().includes(searchText.toLowerCase());

			// Date filter
			const eventDate = new Date(event.date);
			const now = new Date();
			let matchesDate = true;
			if (dateFilter === "upcoming") {
				matchesDate = eventDate >= now;
			} else if (dateFilter === "past") {
				matchesDate = eventDate < now;
			}

			// Location filter
			const matchesLocation =
				locationFilter === "all" || event.location === locationFilter;

			return matchesSearch && matchesDate && matchesLocation;
		});
	}, [events, searchText, dateFilter, locationFilter]);

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

	// function for handling unvolunteer
	const handleUnvolunteer = async (id: string) => {
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

			<div className="mb-8 px-4 max-w-4xl mx-auto">
				<div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
					<div className="flex flex-col md:flex-row gap-4">
						<div className="flex-1 relative">
							<SearchOutlined className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
							<input
								type="text"
								value={searchText}
								onChange={(e) => setSearchText(e.target.value)}
								placeholder="Search events by name or location..."
								className="w-full pl-10 p-2 rounded-lg border border-gray-300 focus:outline-green-600"
							/>
						</div>

						<Select
							value={dateFilter}
							onChange={(value) => setDateFilter(value)}
							style={{ width: 150 }}
							size="large"
							options={[
								{ value: "all", label: "All Events" },
								{ value: "upcoming", label: "Upcoming" },
								{ value: "past", label: "Past Events" },
							]}
						/>

						<Select
							value={locationFilter}
							onChange={(value) => setLocationFilter(value)}
							style={{ width: 180 }}
							size="large"
							placeholder="Filter by location"
							options={[
								{ value: "all", label: "All Locations" },
								...locations.map((loc) => ({ value: loc, label: loc })),
							]}
						/>
					</div>

					{!isLoading && (
						<div className="mt-3 text-sm text-gray-500">
							Showing {filteredEvents.length} of {events.length} events
							{searchText && ` matching "${searchText}"`}
						</div>
					)}
				</div>
			</div>

			<div className="grid md:grid-cols-3 gap-6 px-4 max-w-6xl mx-auto">
				{isLoading ?
					Array(3)
						.fill(null)
						.map((_, index: number) => (
							<EventSkeleton key={index} index={index} />
						))
				: filteredEvents.length > 0 ?
					filteredEvents.map((event: Event) => (
						<div
							key={event._id}
							className="flex flex-col bg-white rounded-xl shadow-sm border border-gray-300 hover:shadow-lg transition overflow-hidden"
						>
							<img
								src={event.image || "/event-images/tree-planting.png"}
								alt={event.title}
								className="w-full h-48 object-cover"
							/>
							<div className="p-6 flex flex-col grow">
								<h2 className="text-2xl font-semibold text-green-700">
									{event.title}
								</h2>
								<p className="text-gray-600 mt-2 line-clamp-2">
									{event.description}
								</p>
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
								<div className="mt-4 flex gap-2">
									<Link
										to={`/events/${event._id}`}
										className="px-4 py-2 border border-green-600 text-green-600 rounded hover:bg-green-50 transition text-center"
									>
										Details
									</Link>
									<button
										onClick={() =>
											event.volunteers?.includes(user?.email || "") ?
												handleUnvolunteer(event._id)
											:	handleVolunteerRegistration(event._id)
										}
										className={`flex-1 px-4 py-2 rounded transition ${
											event.volunteers?.includes(user?.email || "") ?
												"bg-red-500 text-white hover:bg-red-600"
											:	"bg-green-600 text-white hover:bg-green-700"
										}`}
									>
										{event.volunteers?.includes(user?.email || "") ?
											"Unvolunteer"
										:	"Volunteer"}
									</button>
									<Tooltip title="Link copied!" trigger="click">
										<button
											onClick={() => {
												navigator.clipboard.writeText(
													`${window.location.origin}/events/${event._id}`,
												);
											}}
											className="px-3 py-2 border border-gray-300 rounded hover:bg-gray-100 transition"
											title="Share Event"
										>
											<ShareAltOutlined className="text-gray-600" />
										</button>
									</Tooltip>
								</div>
							</div>
						</div>
					))
				:	<div className="col-span-3 text-center py-12 text-gray-500">
						<p className="text-lg">No events found matching your criteria.</p>
						<button
							onClick={() => {
								setSearchText("");
								setDateFilter("all");
								setLocationFilter("all");
							}}
							className="mt-4 text-green-600 hover:underline"
						>
							Clear all filters
						</button>
					</div>
				}
			</div>

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
							You'll be redirected to your dashboard if you're logged in.
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
