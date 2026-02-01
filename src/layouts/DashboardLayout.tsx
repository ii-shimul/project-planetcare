import React, { useState } from "react";
import { Layout, Menu, Typography } from "antd";
import type { MenuProps } from "antd";
import {
	UserOutlined,
	TeamOutlined,
	CalendarOutlined,
	DollarOutlined,
	BarChartOutlined,
	DashboardOutlined,
	HomeOutlined,
} from "@ant-design/icons";
import { Link, useLocation, Outlet } from "react-router-dom";

const { Header, Sider, Content } = Layout;
const { Title } = Typography;

type MenuItem = Required<MenuProps>["items"][number];

const DashboardLayout = () => {
	const location = useLocation();

	const pathToKey: { [key: string]: string } = {
		"/dashboard": "overview",
		"/dashboard/manage-users": "users",
		"/dashboard/manage-events": "events",
		"/dashboard/donations": "donations",
		"/dashboard/reports": "reports",
	};

	const selectedKey: string = pathToKey[location.pathname] || "overview";

	const menuItems: MenuItem[] = [
		{
			key: "overview",
			icon: <UserOutlined />,
			label: <Link to="/dashboard">Overview</Link>,
		},
		{
			key: "users",
			icon: <TeamOutlined />,
			label: <Link to="/dashboard/manage-users">Manage Users</Link>,
		},
		{
			key: "events",
			icon: <CalendarOutlined />,
			label: <Link to="/dashboard/manage-events">Event Management</Link>,
		},
		{
			key: "donations",
			icon: <DollarOutlined />,
			label: <Link to="/dashboard/donations">Donations</Link>,
		},
		{
			key: "reports",
			icon: <BarChartOutlined />,
			label: <Link to="/dashboard/reports">Reports & Analytics</Link>,
		},
		{
			key: "home",
			icon: <HomeOutlined />,
			label: <Link to="/">Back to Home</Link>,
		},
	];
	const [collapsed, setCollapsed] = useState(false);
	return (
		<Layout style={{ minHeight: "100vh" }}>
			{/* Sidebar */}
			<Sider
				collapsible
				collapsed={collapsed}
				onCollapse={(value) => setCollapsed(value)}
				breakpoint="sm"
				collapsedWidth={45}
				width={200}
				style={{ backgroundColor: "#003E30" }}
			>
				<div style={{ padding: "16px", textAlign: "center" }}>
					{collapsed ? (
						<span className="text-white">
							<DashboardOutlined />
						</span>
					) : (
						<Title level={4} style={{ color: "#fff", margin: 0 }}>
							Dashboard
						</Title>
					)}
				</div>
				<Menu
					theme="dark"
					mode="inline"
					selectedKeys={[selectedKey]}
					items={menuItems}
					style={{ backgroundColor: "#003E30" }}
				/>
			</Sider>

			<Layout>
				{/* Header */}
				<Header
					style={{
						backgroundColor: "#fff",
						padding: "0 16px",
						borderBottom: "1px solid #f0f0f0",
					}}
				>
					<Title level={3} style={{ margin: 0, lineHeight: "64px" }}>
						{
							menuItems.find(
								(item) => item && "key" in item && item.key === selectedKey
							)?.label
						}
					</Title>
				</Header>

				{/* Content */}
				<Content style={{ margin: "16px 16px", backgroundColor: "#f0f2f5" }}>
					<div
						style={{ padding: 16, backgroundColor: "#ffff", borderRadius: 8 }}
					>
						<Outlet />
					</div>
				</Content>
			</Layout>
		</Layout>
	);
};

export default DashboardLayout;
