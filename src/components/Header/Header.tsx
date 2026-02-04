import { motion } from "framer-motion";
import { fadeUp, staggerContainerFast } from "../../animations";

const Header = ({ title, subtitle }: { title: string; subtitle: string }) => {
	return (
		<motion.div
			className="bg-green-700 text-white py-20 px-4 text-center"
			initial="hidden"
			animate="visible"
			variants={staggerContainerFast}
		>
			<motion.h1 className="text-4xl md:text-5xl font-bold" variants={fadeUp}>
				{title}
			</motion.h1>
			<motion.p className="mt-4 text-lg max-w-2xl mx-auto" variants={fadeUp}>
				{subtitle}
			</motion.p>
		</motion.div>
	);
};

export default Header;
