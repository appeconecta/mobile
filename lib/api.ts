import { User } from "@/types/user";
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

		if (queryParams?.token && typeof queryParams.token === "string") {
			return queryParams.token;
		} else {
			throw new Error("Authentication failed");
		}
	} else {
		throw new Error("Authentication canceled");
	}
}

interface HomeInfo {
	user: User;
	trashSpotsCount: number;
	confirmationsCount: number;
	commentsCount: number;
}

export async function getHomeInfo(token: string) {
	const response = await fetch("https://econecta-api.vercel.app/api/users/me", {
		method: "GET",
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});

	if (!response.ok) {
		throw new Error("Failed to fetch user info");
	}

	const data: { data: HomeInfo } = await response.json();
	// console.log("User Info Response:", data.data.user);

	return data.data;
}

export async function getTrashspots(token: string) {
	const response = await fetch("https://econecta-api.vercel.app/api/trashspots", {
		method: "GET",
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});

	if (!response.ok) {
		throw new Error("Failed to fetch trashspots");
	}

	const data = await response.json();
	return data.data || data;
}

export async function getSpots(token: string) {
	const response = await fetch("https://econecta-api.vercel.app/api/spots/me", {
		method: "GET",
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});

	if (!response.ok) {
		throw new Error("Failed to fetch spots");
	}

	const data = await response.json();
	return data.data || data;
}

export async function getCollectionspots(token: string) {
	const response = await fetch("https://econecta-api.vercel.app/api/collectionspots", {
		method: "GET",
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});

	if (!response.ok) {
		throw new Error("Failed to fetch collectionspots");
	}

	const data = await response.json();
	return data.data || data;
}
