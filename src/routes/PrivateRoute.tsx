import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import React from "react";

const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const { user, loading } = useAuth();
	const location = useLocation();
	if (loading) {
		return;
	}
	if (user && user.email) {
		return children;
	}
	return <Navigate state={location.pathname} to={"/login"}></Navigate>;
};

export default PrivateRoute;
