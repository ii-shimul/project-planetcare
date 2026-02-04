import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
	staggerContainerFast,
	fadeUpSmall,
	scaleFade,
	hoverScale,
} from "../../animations";

const Donation = () => {
	const ref = useRef(null);
	const isInView = useInView(ref, { once: true, margin: "-50px" });

	return (
		<section className="bg-[#124E36] text-white text-center" ref={ref}>
			<motion.div
				className="max-w-7xl mx-auto py-16"
				initial="hidden"
				animate={isInView ? "visible" : "hidden"}
				variants={staggerContainerFast}
			>
				<motion.h2 className="text-4xl font-bold" variants={fadeUpSmall}>
					Your Donation Makes a Difference
				</motion.h2>
				<motion.p className="mt-4 text-lg" variants={fadeUpSmall}>
					Support our mission and help us drive real impact on the ground. Every
					contribution, big or small, helps us create a greener tomorrow.
				</motion.p>
				<motion.div
					className="mt-8 flex flex-wrap justify-center gap-6 text-green-100"
					variants={staggerContainerFast}
				>
					<motion.div
						className="flex items-center gap-2 bg-[#1a6b4a] px-4 py-2 rounded-full"
						variants={scaleFade}
						whileHover={hoverScale}
					>
						<span>🌱</span> <span>Reforestation</span>
					</motion.div>
					<motion.div
						className="flex items-center gap-2 bg-[#1a6b4a] px-4 py-2 rounded-full"
						variants={scaleFade}
						whileHover={hoverScale}
					>
						<span>🌊</span> <span>Ocean Cleanups</span>
					</motion.div>
					<motion.div
						className="flex items-center gap-2 bg-[#1a6b4a] px-4 py-2 rounded-full"
						variants={scaleFade}
						whileHover={hoverScale}
					>
						<span>📚</span> <span>Education</span>
					</motion.div>
					<motion.div
						className="flex items-center gap-2 bg-[#1a6b4a] px-4 py-2 rounded-full"
						variants={scaleFade}
						whileHover={hoverScale}
					>
						<span>🐾</span> <span>Wildlife Protection</span>
					</motion.div>
				</motion.div>
				<motion.div variants={fadeUpSmall}>
					<Link
						to={"/donate"}
						className="mt-6 inline-block bg-white text-green-600 px-6 py-2 rounded-xl hover:bg-green-100 transition-colors"
					>
						Donate Now
					</Link>
				</motion.div>
			</motion.div>
		</section>
	);
};

export default Donation;
