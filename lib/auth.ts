import * as Linking from "expo-linking";
import * as WebBrowser from "expo-web-browser";

export async function getToken() {
	const redirectUrl = Linking.createURL("auth/callback");

	const authUrl = `https://econecta-api.vercel.app/api/auth/signin`;

	const result = await WebBrowser.openAuthSessionAsync(authUrl, redirectUrl);
	// console.log("Auth Result:", result);

	// If user returns directly to your callback URL
	if (result.type === "success") {
		const { queryParams } = Linking.parse(result.url);

		console.log("Query Params:", queryParams);

		if (queryParams?.code && typeof queryParams.code === "string") {
			// Exchange the code for a token
			const response = await fetch("https://econecta-api.vercel.app/api/mobile/auth", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ code: queryParams.code }),
			});

			console.log("Token Exchange Response:", response);

			if (!response.ok) {
				throw new Error("Failed to exchange code for token");
			}

			const data = await response.json();
			if (data.token) {
				return data.token;
			} else {
				throw new Error("Token not found in response");
			}
		} else {
			throw new Error("Authentication failed");
		}
	}
}
