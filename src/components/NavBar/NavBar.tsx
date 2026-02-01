import { Link, NavLink } from "react-router-dom";
import { Avatar, Dropdown, Menu, Space, Button } from "antd";
import useAuth from "../../hooks/useAuth";
import {
	UserOutlined,
	DashboardOutlined,
	LogoutOutlined,
} from "@ant-design/icons";
import { JSX } from "react";
const links: JSX.Element = (
	<>
		<li>
			<NavLink
				to="/"
				className={
					"inline-flex items-center h-10 px-3 text-base font-medium hover:text-primary"
				}
			>
				Home
			</NavLink>
		</li>
		<li>
			<NavLink
				to="/events"
				className={
					"inline-flex items-center h-10 px-3 text-base font-medium hover:text-primary"
				}
			>
				Events
			</NavLink>
		</li>
		<li>
			<NavLink
				to="/donate"
				className={
					"inline-flex items-center h-10 px-3 text-base font-medium hover:text-primary"
				}
			>
				Donate
			</NavLink>
		</li>
		<li>
			<NavLink
				to="/contact"
				className={
					"inline-flex items-center h-10 px-3 text-base font-medium hover:text-primary"
				}
			>
				Contact Us
			</NavLink>
		</li>
	</>
);

const NavBar = () => {
	const { user, logOut } = useAuth();
	const menu = (
		<Menu
			items={[
				{
					key: "1",
					label: <Link to={"/dashboard"}>Dashboard</Link>,
					icon: <DashboardOutlined />,
				},
				{
					key: "2",
					label: <Link to={"/profile"}>Profile</Link>,
					icon: <UserOutlined />,
					onClick: () => {
						console.log("Navigating to Profile");
					},
				},
				{
					key: "3",
					label: "Logout",
					icon: <LogoutOutlined />,
					onClick: logOut,
				},
			]}
		/>
	);
	return (
		<nav className="max-w-7xl mx-auto h-16 px-4 flex justify-between items-center">
			<div className="flex items-center">
				<h1 className="text-xl md:text-3xl font-semibold text-primary leading-none">
					PlanetCare
				</h1>
			</div>
			<div className="h-full flex items-center">
				<ul className="flex items-center gap-7 md:text-lg">{links}</ul>
			</div>
			<div className="flex items-center gap-2">
				{user?.email ? (
					<Dropdown overlay={menu} trigger={["click"]}>
						<Space>
							<Avatar
								size="default"
								style={{ backgroundColor: "#003E30", cursor: "pointer" }}
							>
								{typeof user?.displayName === "string" && user.displayName[0]
									? user.displayName[0]
									: "U"}
							</Avatar>
						</Space>
					</Dropdown>
				) : (
					<>
						<Link to={"/login"}>
							<Button>Login</Button>
						</Link>
						<Link to={"/signup"}>
							<Button
								type="primary"
								style={{ backgroundColor: "#21764C", borderColor: "#21764C" }}
							>
								Signup
							</Button>
						</Link>
					</>
				)}
			</div>
		</nav>
	);
};

export default NavBar;
