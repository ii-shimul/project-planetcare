import Header from "../../components/Header/Header";
import DonationForm from "./DonationForm";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
	staggerContainer,
	fadeUp,
	fadeUpSmall,
	hoverLift,
} from "../../animations";

const Donate = () => {
	const impactRef = useRef(null);
	const impactInView = useInView(impactRef, { once: true, margin: "-50px" });

	return (
		<div className="bg-gray-50">
			<Header
				title="💚 Support Our Mission"
				subtitle="
					Your contribution helps us organize events, spread awareness, and take
					direct action for the planet.
"
			/>

			<motion.div
				className="py-16 px-4 max-w-4xl mx-auto"
				initial="hidden"
				animate="visible"
				variants={staggerContainer}
			>
				<motion.h2
					className="text-2xl font-bold text-green-800 mb-8 text-center"
					variants={fadeUp}
				>
					Make a Donation
				</motion.h2>
				<motion.div variants={fadeUp}>
					<DonationForm />
				</motion.div>
			</motion.div>

			<motion.div
				className="bg-white py-12 px-4 max-w-5xl mx-auto text-center"
				ref={impactRef}
				initial="hidden"
				animate={impactInView ? "visible" : "hidden"}
				variants={staggerContainer}
			>
				<motion.h2
					className="text-3xl font-bold text-green-800 mb-6"
					variants={fadeUp}
				>
					Your Donation Makes a Difference
				</motion.h2>
				<div className="grid md:grid-cols-3 gap-6 text-left">
					<motion.div
						className="bg-gray-100 p-6 rounded-lg shadow-sm"
						variants={fadeUpSmall}
						whileHover={hoverLift}
					>
						<h3 className="font-semibold text-green-700">🌳 Plant Trees</h3>
						<p className="text-gray-600 mt-2">
							Every $5 helps us plant and nurture one tree in a deforested area.
						</p>
					</motion.div>
					<motion.div
						className="bg-gray-100 p-6 rounded-lg shadow-sm"
						variants={fadeUpSmall}
						whileHover={hoverLift}
					>
						<h3 className="font-semibold text-green-700">
							🧹 Organize Cleanups
						</h3>
						<p className="text-gray-600 mt-2">
							Support beach and river clean-up drives across Bangladesh.
						</p>
					</motion.div>
					<motion.div
						className="bg-gray-100 p-6 rounded-lg shadow-sm"
						variants={fadeUpSmall}
						whileHover={hoverLift}
					>
						<h3 className="font-semibold text-green-700">
							📢 Spread Awareness
						</h3>
						<p className="text-gray-600 mt-2">
							Fund campaigns that educate youth about climate change.
						</p>
					</motion.div>
				</div>
			</motion.div>
		</div>
	);
};

export default Donate;
