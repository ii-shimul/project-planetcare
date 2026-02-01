import { Link } from "react-router-dom";

const Footer = () => {
	return (
		<footer className="bg-[#003E30] text-gray-100" role="contentinfo">
			<div className="max-w-7xl mx-auto px-4 py-12">
				<div className="grid grid-cols-1 md:grid-cols-4 gap-10">
					<div>
						<h4 className="text-2xl font-semibold">PlanetCare</h4>
						<p className="mt-3 text-sm text-gray-300 max-w-sm">
							Together for a greener future. We organize events and mobilize
							communities to protect our planet.
						</p>

						<div className="mt-5 flex items-center gap-4">
							<a
								href="#"
								aria-label="Visit our Facebook"
								className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors"
							>
								<span className="material-icons text-xl" aria-hidden>
									facebook
								</span>
							</a>
							<a
								href="#"
								aria-label="Visit our Twitter"
								className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors"
							>
								<span className="material-icons text-xl" aria-hidden>
									public
								</span>
							</a>
							<a
								href="#"
								aria-label="Visit our Instagram"
								className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors"
							>
								<span className="material-icons text-xl" aria-hidden>
									photo_camera
								</span>
							</a>
						</div>
					</div>

					<nav aria-label="Quick links">
						<h5 className="font-semibold text-lg">Quick Links</h5>
						<ul className="mt-3 space-y-2 text-sm">
							<li>
								<Link to="/" className="text-gray-300 hover:text-white">
									Home
								</Link>
							</li>
							<li>
								<Link to="/events" className="text-gray-300 hover:text-white">
									Events
								</Link>
							</li>
							<li>
								<Link to="/donate" className="text-gray-300 hover:text-white">
									Donate
								</Link>
							</li>
							<li>
								<a href="#about" className="text-gray-300 hover:text-white">
									About Us
								</a>
							</li>
						</ul>
					</nav>

					<nav aria-label="Get involved">
						<h5 className="font-semibold text-lg">Get Involved</h5>
						<ul className="mt-3 space-y-2 text-sm">
							<li>
								<Link to="/events" className="text-gray-300 hover:text-white">
									Join an Event
								</Link>
							</li>
							<li>
								<Link to="/donate" className="text-gray-300 hover:text-white">
									Make a Donation
								</Link>
							</li>
							<li>
								<a href="#" className="text-gray-300 hover:text-white">
									Become a Partner
								</a>
							</li>
						</ul>
					</nav>

					<div>
						<h5 className="font-semibold text-lg">Contact Us</h5>
						<ul className="mt-3 space-y-3 text-sm">
							<li className="flex items-start gap-3">
								<span className="material-icons text-xl mt-0.5" aria-hidden>
									mail
								</span>
								<a
									href="mailto:planet@care.com"
									className="text-gray-300 hover:text-white"
								>
									planet@care.com
								</a>
							</li>
							<li className="flex items-start gap-3">
								<span className="material-icons text-xl mt-0.5" aria-hidden>
									place
								</span>
								<p className="text-gray-300">Sylhet, Bangladesh</p>
							</li>
						</ul>
					</div>
				</div>

				<div className="mt-10 border-t border-white/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
					<p className="text-xs text-gray-300">
						&copy; {new Date().getFullYear()} PlanetCare. All rights reserved.
					</p>
					<ul className="flex items-center gap-6 text-xs">
						<li>
							<a href="#" className="text-gray-300 hover:text-white">
								Privacy Policy
							</a>
						</li>
						<li>
							<a href="#" className="text-gray-300 hover:text-white">
								Terms of Service
							</a>
						</li>
						<li>
							<a href="#" className="text-gray-300 hover:text-white">
								Cookies
							</a>
						</li>
					</ul>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
