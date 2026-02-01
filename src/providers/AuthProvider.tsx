import { AuthContext } from "../contexts/AuthContext";
import {
	createUserWithEmailAndPassword,
	getAuth,
	GoogleAuthProvider,
	onAuthStateChanged,
	sendPasswordResetEmail,
	signInWithEmailAndPassword,
	signInWithPopup,
	signOut,
	updateProfile,
	User,
} from "firebase/auth";
import app from "../firebase/firebase.config";
import React, { useEffect, useState } from "react";
import useAxios from "../hooks/useAxios";
const auth = getAuth(app);

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [user, setUser] = useState<User | null>(null);
	const [loading, setLoading] = useState<Boolean>(true);
	const googleProvider = new GoogleAuthProvider();
	const axiosPublic = useAxios();

	const createUser = async (
		email: string,
		password: string,
		name: string | null = null
	) => {
		setLoading(true);
		try {
			const userCred = await createUserWithEmailAndPassword(
				auth,
				email,
				password
			);

			const userDetails = userCred.user;

			await updateProfile(userDetails, {
				displayName: name,
			});
			return userDetails;
		} catch (error: unknown) {
			console.error(
				error instanceof Error ? error.message : "An unknown error occurred"
			);
		}
	};

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
			setUser(currentUser);
			if (currentUser?.email) {
				const userJWT = { email: currentUser.email };
				axiosPublic.post("/jwt", userJWT).then((res) => {
					if (res.data.token) {
						localStorage.setItem("access-token", res.data.token);
					}
					setLoading(false);
				});
			} else {
				localStorage.removeItem("access-token");
				setLoading(false);
			}
			setLoading(false);
		});
		return () => {
			unsubscribe();
		};
	}, [user, axiosPublic]);

	const logOut = () => {
		setLoading(true);
		return signOut(auth);
	};

	const logIn = (email: string, password: string) => {
		setLoading(true);
		return signInWithEmailAndPassword(auth, email, password);
	};

	const logInGoogle = () => {
		setLoading(true);
		return signInWithPopup(auth, googleProvider);
	};

	const resetPassword = (email: string) => {
		setLoading(true);
		return sendPasswordResetEmail(auth, email);
	};

	const authInfo = {
		user,
		setUser,
		createUser,
		logOut,
		logIn,
		logInGoogle,
		loading,
		setLoading,
		resetPassword,
	};
	return (
		<AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
	);
};

export default AuthProvider;
