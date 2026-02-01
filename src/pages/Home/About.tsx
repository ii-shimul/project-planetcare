
const About = () => {
	return (
		<section
			className="py-20 bg-background-light dark:bg-background-dark"
			id="about"
		>
			<div className="max-w-7xl mx-auto px-6">
				<div className="text-center mb-12">
					<h2 className="text-4xl font-bold text-primary">About Us</h2>
					<p className="text-lg text-subtext-light dark:text-subtext-dark mt-4 max-w-3xl mx-auto">
						We're a mission-driven organization dedicated to sustainability,
						climate action, and community engagement. Our goal is to protect
						nature through meaningful events.
					</p>
				</div>
				<div className="grid md:grid-cols-3 gap-8 text-center">
					<div className="p-8 bg-surface-light dark:bg-surface-dark rounded-lg shadow-md">
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
					</div>
					<div className="p-8 bg-surface-light dark:bg-surface-dark rounded-lg shadow-md">
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
					</div>
					<div className="p-8 bg-surface-light dark:bg-surface-dark rounded-lg shadow-md">
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
					</div>
				</div>
			</div>
		</section>
	);
};

export default About;
