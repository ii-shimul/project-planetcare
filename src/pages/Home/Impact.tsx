import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { staggerContainer, popIn, createDelayedFadeUp } from "../../animations";

const Impact = () => {
	const ref = useRef(null);
	const isInView = useInView(ref, { once: true, margin: "-100px" });

	const textVariants = createDelayedFadeUp(0.5);

	return (
		<section className="py-20 bg-white text-center max-w-7xl mx-auto" ref={ref}>
			<motion.h2
				className="text-4xl font-bold text-primary"
				initial={{ opacity: 0, y: 20 }}
				animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
				transition={{ duration: 0.5 }}
			>
				Our Impact
			</motion.h2>
			<motion.div
				className="mt-8 flex items-center flex-wrap justify-around"
				variants={staggerContainer}
				initial="hidden"
				animate={isInView ? "visible" : "hidden"}
			>
				<motion.div variants={popIn}>
					<p className="text-4xl font-bold text-green-600">2,500+</p>
					<p>Volunteers</p>
				</motion.div>
				<motion.div variants={popIn}>
					<p className="text-4xl font-bold text-green-600">150+</p>
					<p>Events Organized</p>
				</motion.div>
				<motion.div variants={popIn}>
					<p className="text-4xl font-bold text-green-600">৳ 5M+</p>
					<p>Raised in Donations</p>
				</motion.div>
			</motion.div>
			<motion.div
				className="mt-12 max-w-3xl mx-auto text-gray-600 leading-relaxed"
				variants={textVariants}
				initial="hidden"
				animate={isInView ? "visible" : "hidden"}
			>
				<p>
					These numbers represent more than just statistics—they represent real
					ecosystems restored, communities empowered, and a sustainable future
					being built one step at a time. Thanks to our incredible network of
					supporters, we've successfully rehabilitated over 500 acres of land
					and removed tons of plastic waste from our oceans.
				</p>
			</motion.div>
		</section>
	);
};

export default Impact;
