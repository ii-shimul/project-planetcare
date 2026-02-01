import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Signup from "../pages/Signup/Signup";
import Events from "../pages/Events/Events";
import Error from "../pages/Error/Error";
import EventDetails from "../pages/EventDetails/EventDetails";
import Donate from "../pages/Donate/Donate";
import PrivateRoute from "./PrivateRoute";
import DashboardLayout from "../layouts/DashboardLayout";
import Overview from "../pages/DashboardComponents/Admin/Overview";
import ManageUsers from "../pages/DashboardComponents/Admin/ManageUsers";
import ManageEvents from "../pages/DashboardComponents/Admin/ManageEvents";
import Donations from "../pages/DashboardComponents/Admin/Donations";
import Reports from "../pages/DashboardComponents/Admin/Reports";
import Contact from "../pages/Contact/Contact";

const router = createBrowserRouter([
	{
		path: "/",
		element: <MainLayout />,
		errorElement: <Error />,
		children: [
			{
				path: "/",
				element: <Home />,
			},
			{
				path: "/login",
				element: <Login />,
			},
			{
				path: "/signup",
				element: <Signup />,
			},
			{
				path: "/events",
				element: <Events />,
			},
			{
				path: "/events/:id",
				element: <EventDetails />,
			},
			{
				path: "/contact",
				element: <Contact />,
			},
			{
				path: "/donate",
				element: (
					<PrivateRoute>
						<Donate />
					</PrivateRoute>
				),
			},
		],
	},
	{
		path: "/dashboard",
		element: <DashboardLayout />,
		children: [
			{
				path: "/dashboard",
				element: <Overview />,
			},
			{
				path: "/dashboard/manage-users",
				element: <ManageUsers />,
			},
			{
				path: "/dashboard/manage-events",
				element: <ManageEvents />,
			},
			{
				path: "/dashboard/donations",
				element: <Donations />,
			},
			{
				path: "/dashboard/reports",
				element: <Reports />,
			},
		],
	},
]);

export default router;
