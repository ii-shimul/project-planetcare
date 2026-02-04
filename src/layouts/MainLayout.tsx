import NavBar from "../components/NavBar/NavBar";
import Footer from "../components/Footer/Footer";
import { Outlet } from "react-router-dom";
import ReactLenis, { useLenis } from "lenis/react";

const MainLayout = () => {
	return (
		<div>
			<ReactLenis root />
			<NavBar />
			<div className="min-h-[calc(100vh-277px)]">
				<Outlet />
			</div>
			<Footer />
		</div>
	);
};

export default MainLayout;
