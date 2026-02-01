import Header from "../../components/Header/Header";
import DonationForm from "./DonationForm";
const Donate = () => {
	return (
		<div className="bg-gray-50">
			<Header
				title="💚 Support Our Mission"
				subtitle="
					Your contribution helps us organize events, spread awareness, and take
					direct action for the planet.
"
			/>

			{/* Donation Form */}
			<div className="py-16 px-4 max-w-4xl mx-auto">
				<h2 className="text-2xl font-bold text-green-800 mb-8 text-center">
					Make a Donation
				</h2>
				<DonationForm />
			</div>

			{/* Impact Section */}
			<div className="bg-white py-12 px-4 max-w-5xl mx-auto text-center">
				<h2 className="text-3xl font-bold text-green-800 mb-6">
					Your Donation Makes a Difference
				</h2>
				<div className="grid md:grid-cols-3 gap-6 text-left">
					<div className="bg-gray-100 p-6 rounded-lg shadow-sm">
						<h3 className="font-semibold text-green-700">🌳 Plant Trees</h3>
						<p className="text-gray-600 mt-2">
							Every $5 helps us plant and nurture one tree in a deforested area.
						</p>
					</div>
					<div className="bg-gray-100 p-6 rounded-lg shadow-sm">
						<h3 className="font-semibold text-green-700">
							🧹 Organize Cleanups
						</h3>
						<p className="text-gray-600 mt-2">
							Support beach and river clean-up drives across Bangladesh.
						</p>
					</div>
					<div className="bg-gray-100 p-6 rounded-lg shadow-sm">
						<h3 className="font-semibold text-green-700">
							📢 Spread Awareness
						</h3>
						<p className="text-gray-600 mt-2">
							Fund campaigns that educate youth about climate change.
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Donate;
