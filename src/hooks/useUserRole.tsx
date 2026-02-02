import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useUserRole = () => {
	const { user, loading: authLoading } = useAuth();
	const axiosSecure = useAxiosSecure();

	const {
		data: role = null,
		isLoading: roleLoading,
		refetch,
	} = useQuery({
		queryKey: ["userRole", user?.email],
		queryFn: async () => {
			if (!user?.email) return null;
			const res = await axiosSecure.get(`/users/role/${user.email}`);
			return res.data?.role || null;
		},
		enabled: !!user?.email && !authLoading,
	});

	const isAdmin = role?.toLowerCase() === "admin";
	const isLoading = authLoading || roleLoading;

	return { role, isAdmin, isLoading, refetch };
};

export default useUserRole;
