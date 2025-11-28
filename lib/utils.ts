import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

type SubmitPayload = {
	photos: string[];
	photosBase64?: string[];
	tags: string[];
	description: string;
};

export async function submitReport(payload: SubmitPayload) {
	// Replace with the real API endpoint
	const endpoint = process.env.EXPO_PUBLIC_API_URL ?? "https://example.com/api/reports";

	const res = await fetch(endpoint, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(payload),
	});

	if (!res.ok) {
		const text = await res.text().catch(() => "");
		throw new Error(`Submit failed: ${res.status} ${text}`);
	}

	return res.json().catch(() => ({}));
}
