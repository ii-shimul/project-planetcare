import NavBar from "../components/NavBar/NavBar";
import Footer from "../components/Footer/Footer";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
	return (
		<div>
			<NavBar />
			<div className="min-h-[calc(100vh-277px)]">
				<Outlet />
			</div>
			<Footer />
		</div>
	);
};

export default MainLayout;
