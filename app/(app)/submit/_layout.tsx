import { Stack } from "expo-router";
import { createContext, useContext, useMemo, useState } from "react";

// Constants
import { headerOptions } from "@/constants/header";
import { themes } from "@/constants/theme";

// Hooks
import { useStatusBarStyle } from "@/hooks/use-status-bar-style";

export default function SubmitFormLayout() {
	useStatusBarStyle("light");

	// Shared submit form state across steps
	const [photos, setPhotos] = useState<string[]>([]);
	const [photosBase64, setPhotosBase64] = useState<string[]>([]);
	const [tags, setTags] = useState<string[]>([]);
	const [description, setDescription] = useState<string>("");

	function addPhoto(uri: string, base64?: string) {
		setPhotos((prev) => (prev.includes(uri) ? prev : [...prev, uri]));
		if (base64) setPhotosBase64((prev) => [...prev, base64]);
	}

	function removePhoto(uri: string) {
		setPhotos((prev) => prev.filter((p) => p !== uri));
		setPhotosBase64((prev) => prev.slice(0, Math.max(0, prev.length - 1)));
	}

	function resetForm() {
		setPhotos([]);
		setPhotosBase64([]);
		setTags([]);
		setDescription("");
	}

	const value = useMemo(
		() => ({
			photos,
			photosBase64,
			addPhoto,
			removePhoto,
			tags,
			setTags,
			description,
			setDescription,
			resetForm,
		}),
		[photos, photosBase64, tags, description]
	);

	return (
		<SubmitFormContext.Provider value={value}>
			<Stack
				screenOptions={{
					contentStyle: {
						backgroundColor: themes["light"]["--color-neutral-200"],
					},
					...headerOptions,
				}}
				initialRouteName="step1"
			>
				<Stack.Screen
					name="step1"
					options={{
						headerTitle: "Reportar foco de lixo",
					}}
				/>
				<Stack.Screen
					name="step2"
					options={{
						headerTitle: "E aí, gostou da foto? ",
					}}
				/>
				<Stack.Screen
					name="step3"
					options={{
						headerTitle: "Descreva um pouco o foco",
					}}
				/>
				<Stack.Screen
					name="step4"
					options={{
						headerTitle: "Quer ser ainda mais descritivo?",
					}}
				/>
			</Stack>
		</SubmitFormContext.Provider>
	);
}

type SubmitFormContextType = {
	photos: string[];
	photosBase64: string[];
	addPhoto: (uri: string, base64?: string) => void;
	removePhoto: (uri: string) => void;
	tags: string[];
	setTags: (tags: string[]) => void;
	description: string;
	setDescription: (d: string) => void;
	resetForm: () => void;
};

const SubmitFormContext = createContext<SubmitFormContextType | null>(null);

export function useSubmitForm() {
	const ctx = useContext(SubmitFormContext);
	if (!ctx) throw new Error("useSubmitForm must be used within SubmitFormLayout");
	return ctx;
}
