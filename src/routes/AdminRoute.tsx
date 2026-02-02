import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useUserRole from "../hooks/useUserRole";
import React from "react";
import { Spin } from "antd";

const AdminRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const { user, loading: authLoading } = useAuth();
	const { isAdmin, isLoading: roleLoading } = useUserRole();
	const location = useLocation();

	// Show loading spinner while checking auth and role
	if (authLoading || roleLoading) {
		return (
			<div className="min-h-screen flex items-center justify-center">
				<Spin size="large" />
			</div>
		);
	}

	// Redirect to login if not authenticated
	if (!user || !user.email) {
		return <Navigate state={location.pathname} to="/login" replace />;
	}

	// Redirect to home if not admin
	if (!isAdmin) {
		return <Navigate to="/" replace />;
	}

	return children;
};

export default AdminRoute;
