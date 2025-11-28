import { useSession } from "@/providers/session-provider";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect } from "react";

export default function AuthCallback() {
	const router = useRouter();
	const params = useLocalSearchParams();

	const { signIn } = useSession();

	useEffect(() => {
		const saveToken = async () => {
			const token = params.token as string | undefined;

			if (token) {
				// Save the token securely
				signIn(token);

				// Redirect user somewhere after login
				console.log("Token saved, redirecting...");
				console.log("Token:", token);
				router.replace("/");
			} else {
				console.error("No token found in callback parameters.");
				// Handle error: no token found
				router.replace("/sign-in");
			}
		};

		saveToken();
	}, [params]);

	return null;
}
