import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import useAxios from "../../hooks/useAxios";
import moment from "moment";
import useAuth from "../../hooks/useAuth";
import { message } from "antd";

const EventDetails = () => {
	const { id } = useParams();
	const { user } = useAuth();
	const axiosPublic = useAxios();
	const {
		data: event,
		isLoading,
		refetch,
	} = useQuery({
		queryKey: ["event details"],
		queryFn: async () => {
			const result = await axiosPublic.get(`/events/${id}`);
			return result.data;
		},
	});
	// function for handling volunteer registration
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

	if (isLoading) {
		return;
	}

	return (
		<section className="max-w-3xl mx-auto px-4 py-10 mt-4 md:mt-10 bg-white rounded-xl shadow-sm border border-gray-100">
			<h1 className="text-3xl font-bold text-green-700 mb-2">{event.title}</h1>
			<p className="text-sm text-gray-500 mb-6">
				📅 {moment(event.date).format("MMMM D, YYYY, LT")} | 📍 {event.location}
			</p>

			<p className="text-gray-700 leading-relaxed mb-6">{event.description}</p>

			<div className="bg-green-50 p-4 rounded-lg border border-green-100 mb-6">
				<p className="text-sm text-green-700">
					<span className="font-medium">Created By:</span> {event.createdBy}
				</p>
				<p className="text-sm text-green-700 mt-1">
					<span className="font-medium">Volunteers Registered:</span>{" "}
					{event?.volunteers?.length}
				</p>
			</div>

			<button
				onClick={handleVolunteerRegistration}
				className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-md"
			>
				Volunteer for this Event
			</button>
		</section>
	);
};

export default EventDetails;
