import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
	staggerContainer,
	fadeUpLarge,
	cardReveal,
	hoverLift,
} from "../../animations";

const About = () => {
	const ref = useRef(null);
	const isInView = useInView(ref, { once: true, margin: "-100px" });

	return (
		<section
			className="py-20 bg-background-light dark:bg-background-dark"
			id="about"
			ref={ref}
		>
			<motion.div
				className="max-w-7xl mx-auto px-6"
				variants={staggerContainer}
				initial="hidden"
				animate={isInView ? "visible" : "hidden"}
			>
				<motion.div className="text-center mb-12" variants={fadeUpLarge}>
					<h2 className="text-4xl font-bold text-primary">About Us</h2>
					<p className="text-lg text-subtext-light dark:text-subtext-dark mt-4 max-w-3xl mx-auto">
						We're a mission-driven organization dedicated to sustainability,
						climate action, and community engagement. Our goal is to protect
						nature through meaningful events.
					</p>
				</motion.div>
				<motion.div
					className="grid md:grid-cols-3 gap-8 text-center"
					variants={staggerContainer}
				>
					<motion.div
						className="p-8 bg-surface-light dark:bg-surface-dark rounded-lg shadow-md"
						variants={cardReveal}
						whileHover={hoverLift}
					>
						<span className="material-icons text-primary !text-5xl mb-4">
							eco
						</span>
						<h3 className="text-2xl font-semibold mb-2 text-text-light dark:text-text-dark">
							Our Mission
						</h3>
						<p className="text-subtext-light dark:text-subtext-dark">
							To inspire and empower individuals and communities to take
							meaningful action for a sustainable future.
						</p>
					</motion.div>
					<motion.div
						className="p-8 bg-surface-light dark:bg-surface-dark rounded-lg shadow-md"
						variants={cardReveal}
						whileHover={hoverLift}
					>
						<span className="material-icons text-primary !text-5xl mb-4">
							groups
						</span>
						<h3 className="text-2xl font-semibold mb-2 text-text-light dark:text-text-dark">
							Our Community
						</h3>
						<p className="text-subtext-light dark:text-subtext-dark">
							A passionate network of volunteers, partners, and supporters
							working together for environmental change.
						</p>
					</motion.div>
					<motion.div
						className="p-8 bg-surface-light dark:bg-surface-dark rounded-lg shadow-md"
						variants={cardReveal}
						whileHover={hoverLift}
					>
						<span className="material-icons text-primary !text-5xl mb-4">
							trending_up
						</span>
						<h3 className="text-2xl font-semibold mb-2 text-text-light dark:text-text-dark">
							Our Vision
						</h3>
						<p className="text-subtext-light dark:text-subtext-dark">
							A thriving planet where nature and humanity coexist in harmony,
							supported by sustainable practices.
						</p>
					</motion.div>
				</motion.div>

				<motion.div
					className="mt-16 bg-white p-8 rounded-2xl shadow-sm text-left"
					variants={fadeUpLarge}
				>
					<h3 className="text-2xl font-bold text-primary mb-4">
						Why We Started
					</h3>
					<p className="text-lg text-subtext-light dark:text-subtext-dark leading-relaxed">
						PlanetCare began with a simple idea: that small, consistent actions
						by a dedicated community can lead to massive global change. What
						started as a neighborhood cleanup group has grown into a worldwide
						movement. We believe that everyone has a role to play in preserving
						our environment. By connecting passion with opportunity, we bridge
						the gap between "wanting to help" and "making a difference." Our
						approach is rooted in transparency, collaboration, and scientific
						impact. Every event we organize and every dollar we raise is
						directed towards tangible, measurable outcomes that benefit both
						people and the planet.
					</p>
				</motion.div>
			</motion.div>
		</section>
	);
};

export default About;
