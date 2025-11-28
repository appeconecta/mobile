import { createContext, use, type PropsWithChildren } from "react";

import { useStorageState } from "@/hooks/use-storage-state";

type User = {
	id: string;
	name: string;
	email: string;
	image: string;
};

type AuthData = {
	token: string;
	user: User;
} | null;

const AuthContext = createContext<{
	signIn: (token: string, user: User) => void;
	signOut: () => void;
	token?: string | null;
	user?: User | null;
	isLoading: boolean;
}>({
	signIn: () => null,
	signOut: () => null,
	token: null,
	user: null,
	isLoading: false,
});

// Use this hook to access the user info.
export function useSession() {
	const value = use(AuthContext);
	if (!value) {
		throw new Error("useSession must be wrapped in a <SessionProvider />");
	}

	return value;
}

export function SessionProvider({ children }: PropsWithChildren) {
	const [[isLoading, authData], setAuthData] = useStorageState<AuthData>("auth");

	return (
		<AuthContext.Provider
			value={{
				signIn: (token: string, user: User) => {
					console.log("Signing in with token:", token);
					console.log("User info:", user);
					// Perform sign-in logic here
					setAuthData({ token, user });
				},
				signOut: () => {
					setAuthData(null);
				},
				token: authData?.token || null,
				user: authData?.user || null,
				isLoading,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
}
