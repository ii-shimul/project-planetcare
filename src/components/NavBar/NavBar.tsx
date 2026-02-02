import { Link, NavLink } from "react-router-dom";
import { Avatar, Dropdown, Menu, Space, Button, Drawer } from "antd";
import useAuth from "../../hooks/useAuth";
import {
	UserOutlined,
	DashboardOutlined,
	LogoutOutlined,
	MenuOutlined,
	CloseOutlined,
} from "@ant-design/icons";
import { JSX, useState } from "react";
import useUserRole from "../../hooks/useUserRole";

const NavBar = () => {
	const { user, logOut } = useAuth();
	const { isAdmin } = useUserRole();
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

	const navLinks: JSX.Element = (
		<>
			<li>
				<NavLink
					to="/"
					onClick={() => setMobileMenuOpen(false)}
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
					onClick={() => setMobileMenuOpen(false)}
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
					onClick={() => setMobileMenuOpen(false)}
					className={
						"inline-flex items-center h-10 px-3 text-base font-medium hover:text-primary"
					}
				>
					Donate
				</NavLink>
			</li>
			<li>
				<NavLink
					to="/leaderboard"
					onClick={() => setMobileMenuOpen(false)}
					className={
						"inline-flex items-center h-10 px-3 text-base font-medium hover:text-primary"
					}
				>
					Leaderboard
				</NavLink>
			</li>
			<li>
				<NavLink
					to="/donors"
					onClick={() => setMobileMenuOpen(false)}
					className={
						"inline-flex items-center h-10 px-3 text-base font-medium hover:text-primary"
					}
				>
					Donors
				</NavLink>
			</li>
			<li>
				<NavLink
					to="/contact"
					onClick={() => setMobileMenuOpen(false)}
					className={
						"inline-flex items-center h-10 px-3 text-base font-medium hover:text-primary"
					}
				>
					Contact Us
				</NavLink>
			</li>
		</>
	);

	const profileMenu = (
		<Menu
			items={[
				{
					key: "1",
					label: (
						<Link to={`${isAdmin ? "/dashboard" : "/my-dashboard"}`}>
							Dashboard
						</Link>
					),
					icon: <DashboardOutlined />,
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

			<div className="hidden md:flex h-full items-center">
				<ul className="flex items-center gap-7 md:text-lg">{navLinks}</ul>
			</div>

			<div className="flex items-center gap-3">
				{user?.email ?
					<Dropdown overlay={profileMenu} trigger={["click"]}>
						<Space>
							<Avatar
								size="default"
								style={{ backgroundColor: "#003E30", cursor: "pointer" }}
							>
								{typeof user?.displayName === "string" && user.displayName[0] ?
									user.displayName[0]
								:	"U"}
							</Avatar>
						</Space>
					</Dropdown>
				:	<>
						<Link to={"/login"}>
							<Button>Login</Button>
						</Link>
						<Link to={"/signup"} className="hidden md:block">
							<Button
								type="primary"
								style={{ backgroundColor: "#21764C", borderColor: "#21764C" }}
							>
								Signup
							</Button>
						</Link>
					</>
				}

				<button
					className="md:hidden p-2 text-2xl text-gray-700 hover:text-primary"
					onClick={() => setMobileMenuOpen(true)}
					aria-label="Open menu"
				>
					<MenuOutlined />
				</button>
			</div>

			<Drawer
				title="PlanetCare"
				placement="right"
				onClose={() => setMobileMenuOpen(false)}
				open={mobileMenuOpen}
				width={280}
				closeIcon={<CloseOutlined />}
			>
				<ul className="flex flex-col gap-2">{navLinks}</ul>

				{!user?.email && (
					<div className="mt-6 flex flex-col gap-3">
						<Link to={"/login"} onClick={() => setMobileMenuOpen(false)}>
							<Button block>Login</Button>
						</Link>
						<Link to={"/signup"} onClick={() => setMobileMenuOpen(false)}>
							<Button
								type="primary"
								block
								style={{ backgroundColor: "#21764C", borderColor: "#21764C" }}
							>
								Signup
							</Button>
						</Link>
					</div>
				)}
			</Drawer>
		</nav>
	);
};

export default NavBar;
