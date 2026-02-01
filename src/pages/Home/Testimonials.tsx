const Testimonials = () => {
	return (
		<section className="py-20 bg-surface-light dark:bg-surface-dark">
			<div className="max-w-7xl mx-auto px-6">
				<div className="text-center mb-12">
					<h2 className="text-4xl font-bold text-primary">
						What Our Volunteers Say
					</h2>
				</div>
				<div className="grid md:grid-cols-2 gap-8">
					<div className="bg-background-light p-8 rounded-lg shadow-md">
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
					</div>
					<div className="bg-background-light dark:bg-background-dark p-8 rounded-lg shadow-md">
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
					</div>
				</div>
			</div>
		</section>
	);
};

export default Testimonials;
