import { Link } from "react-router-dom";

const Donation = () => {
	return (
		<section className="bg-[#124E36] text-white text-center">
			<div className="max-w-7xl mx-auto py-16">
				<h2 className="text-4xl font-bold">Your Donation Makes a Difference</h2>
				<p className="mt-4 text-lg">
					Support our mission and help us drive real impact on the ground. Every
					contribution, big or small, helps us create a greener tomorrow.
				</p>
				<Link
					to={"/donate"}
					className="mt-6 inline-block bg-white text-green-600 px-6 py-2 rounded-xl hover:bg-green-100"
				>
					Donate Now
				</Link>
			</div>
		</section>
	);
};

export default Donation;
