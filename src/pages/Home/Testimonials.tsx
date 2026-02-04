import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { staggerContainer, fadeUp, hoverLift } from "../../animations";

const Testimonials = () => {
	const ref = useRef(null);
	const isInView = useInView(ref, { once: true, margin: "-50px" });

	return (
		<section className="py-20 bg-surface-light dark:bg-surface-dark" ref={ref}>
			<div className="max-w-7xl mx-auto px-6">
				<motion.div
					className="text-center mb-12"
					initial={{ opacity: 0, y: 20 }}
					animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
					transition={{ duration: 0.5 }}
				>
					<h2 className="text-4xl font-bold text-primary">
						What Our Volunteers Say
					</h2>
				</motion.div>
				<motion.div
					className="grid md:grid-cols-2 gap-8"
					variants={staggerContainer}
					initial="hidden"
					animate={isInView ? "visible" : "hidden"}
				>
					<motion.div
						className="bg-background-light p-8 rounded-lg shadow-md"
						variants={fadeUp}
						whileHover={hoverLift}
					>
						<p className="text-subtext-light italic">
							"Being part of PlanetCare has been a truly rewarding experience.
							I've met amazing people and learned so much about how I can make a
							difference. The tree planting event was my favorite!"
						</p>
						<div className="flex items-center mt-4">
							<img
								alt="Portrait of Jane Doe"
								className="w-12 h-12 rounded-full mr-4"
								src="https://lh3.googleusercontent.com/aida-public/AB6AXuC81YR2OBtStw3thK11C3sekywmJgjzGahpvBJwMlDn1ZQPWIhApzI-fryMGx_UUpzdi75Zw_8WkL-eZLNFjGlpuNv_ilVxJuU-xJTmYP7C_3ZHQxp2eWMnvr7xBFylkATVPW_4j6tZ7rkZjysDApu0bEENBaf1dvqdaaxGx5u0at8CZjIwn1ed22dil3SRngaFDtH6mZMALyyeb9f5BfXhSDi4fELRo8QGOSb1nTKrDgQ0JJ3G6NBbr6NisW5XN430HSDnAumG_usf"
							/>
							<div>
								<p className="font-semibold text-text-light dark:text-text-dark">
									Jane Doe
								</p>
								<p className="text-sm text-subtext-light">
									Volunteer since 2022
								</p>
							</div>
						</div>
					</motion.div>
					<motion.div
						className="bg-background-light dark:bg-background-dark p-8 rounded-lg shadow-md"
						variants={fadeUp}
						whileHover={hoverLift}
					>
						<p className="text-subtext-light italic">
							"I never realized how much waste ends up on our beaches until I
							joined a cleanup. It was eye-opening. PlanetCare makes it easy and
							fun to get involved in local environmental action."
						</p>
						<div className="flex items-center mt-4">
							<img
								alt="Portrait of John Smith"
								className="w-12 h-12 rounded-full mr-4"
								src="https://lh3.googleusercontent.com/aida-public/AB6AXuBQQ-eF2dUEJ9GLFaX9AyBfd0muYBOs7TNl5Cc8zWlUs1Usf2v4Vbt2cBfqCPXwTazBQP2VkhVYPSKwoHRsLxvTaOYiv1pwjspUbPe9XSc8CSLN90jDN77yQ_mAsr8O9Am6b0cr3mXmA-7Qmz4_PPtyo43QAijyWoR13C1eZmHGeOL1ZwwUIZ8clENXn4tzy4JrLO-sYnTOmMinCF1iIi12xqAZFvw9mCPEQ7m7aNL5ix5Jod0sy4E_hLWwDut0WtPHToeX-KoTy3Va"
							/>
							<div>
								<p className="font-semibold text-text-light dark:text-text-dark">
									John Smith
								</p>
								<p className="text-sm text-subtext-light">
									Volunteer since 2023
								</p>
							</div>
						</div>
					</motion.div>
				</motion.div>
				<motion.div
					className="grid md:grid-cols-2 gap-8 mt-8"
					variants={staggerContainer}
					initial="hidden"
					animate={isInView ? "visible" : "hidden"}
				>
					<motion.div
						className="bg-background-light dark:bg-background-dark p-8 rounded-lg shadow-md"
						variants={fadeUp}
						whileHover={hoverLift}
					>
						<p className="text-subtext-light italic">
							"Transparency is key for me when I donate. PlanetCare provides
							detailed reports on how every dollar is spent, which gives me huge
							peace of mind. Truly a professional team."
						</p>
						<div className="flex items-center mt-4">
							<div className="w-12 h-12 rounded-full mr-4 bg-green-100 flex items-center justify-center text-green-700 font-bold text-xl">
								DK
							</div>
							<div>
								<p className="font-semibold text-text-light dark:text-text-dark">
									David Kim
								</p>
								<p className="text-sm text-subtext-light">Donor since 2021</p>
							</div>
						</div>
					</motion.div>
					<motion.div
						className="bg-background-light dark:bg-background-dark p-8 rounded-lg shadow-md"
						variants={fadeUp}
						whileHover={hoverLift}
					>
						<p className="text-subtext-light italic">
							"The educational workshops was fantastic! My kids learned so much
							about recycling and composting. We've started our own garden
							thanks to PlanetCare's guidance."
						</p>
						<div className="flex items-center mt-4">
							<div className="w-12 h-12 rounded-full mr-4 bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-xl">
								SL
							</div>
							<div>
								<p className="font-semibold text-text-light dark:text-text-dark">
									Sarah Lopez
								</p>
								<p className="text-sm text-subtext-light">Community Member</p>
							</div>
						</div>
					</motion.div>
				</motion.div>
			</div>
		</section>
	);
};

export default Testimonials;
