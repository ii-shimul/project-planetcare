import axios from "axios";

const axiosPublic = axios.create({
	baseURL: import.meta.env.VITE_SERVER_URL,
});

const useAxios = () => {
	return axiosPublic;
};

export default useAxios;
