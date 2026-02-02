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
import AdminRoute from "./AdminRoute";
import DashboardLayout from "../layouts/DashboardLayout";
import UserDashboardLayout from "../layouts/UserDashboardLayout";
import Overview from "../pages/DashboardComponents/Admin/Overview";
import ManageUsers from "../pages/DashboardComponents/Admin/ManageUsers";
import ManageEvents from "../pages/DashboardComponents/Admin/ManageEvents";
import Donations from "../pages/DashboardComponents/Admin/Donations";
import Reports from "../pages/DashboardComponents/Admin/Reports";
import UserOverview from "../pages/DashboardComponents/User/UserOverview";
import MyEvents from "../pages/DashboardComponents/User/MyEvents";
import MyDonations from "../pages/DashboardComponents/User/MyDonations";
import Profile from "../pages/DashboardComponents/User/Profile";
import Contact from "../pages/Contact/Contact";
import Leaderboard from "../pages/Leaderboard/Leaderboard";
import Donors from "../pages/Donors/Donors";

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
				path: "/leaderboard",
				element: <Leaderboard />,
			},
			{
				path: "/donors",
				element: <Donors />,
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
	// Admin Dashboard
	{
		path: "/dashboard",
		element: (
			<AdminRoute>
				<DashboardLayout />
			</AdminRoute>
		),
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
	// User Dashboard
	{
		path: "/my-dashboard",
		element: (
			<PrivateRoute>
				<UserDashboardLayout />
			</PrivateRoute>
		),
		children: [
			{
				path: "/my-dashboard",
				element: <UserOverview />,
			},
			{
				path: "/my-dashboard/my-events",
				element: <MyEvents />,
			},
			{
				path: "/my-dashboard/my-donations",
				element: <MyDonations />,
			},
			{
				path: "/my-dashboard/profile",
				element: <Profile />,
			},
		],
	},
]);

export default router;
