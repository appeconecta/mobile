import { useFocusEffect } from "expo-router";
import { useCallback, useEffect, useRef, useState } from "react";
import { AppState, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Camera as ExpoCamera } from "expo-camera";

// Components
import { Camera } from "@/components/camera";
import { useSubmitForm } from "./_layout";

export default function SubmitFormStep1() {
	const insets = useSafeAreaInsets();
	const appState = useRef(AppState.currentState);
	const { addPhoto } = useSubmitForm();

	const [isFocused, setIsFocused] = useState(false);
	const [permission, setPermission] = useState<{
		granted: boolean;
		canAskAgain: boolean;
	} | null>(null);

	// TODO: Expo is bugged, so when the user selects "Ask everytime", Expo thinks the permission is denied.

	useEffect(() => {
		const subscription = AppState.addEventListener("change", (nextAppState) => {
			if (appState.current.match(/inactive|background/) && nextAppState === "active") {
				console.log("App has come to the foreground!");
				// Re-check camera permission
				checkCameraPermissions();
			}

			appState.current = nextAppState;
			console.log("AppState", appState.current);
		});

		return () => {
			subscription.remove();
		};
	}, []);

	useFocusEffect(
		// Callback should be wrapped in `React.useCallback` to avoid running the effect too often.
		useCallback(() => {
			// Invoked whenever the route is focused.

			setIsFocused(true);
			console.log("Checking camera permission...");
			// Check camera permission
			checkCameraPermissions();

			// Return function is invoked whenever the route gets out of focus.
			return () => {
				setIsFocused(false);
			};
		}, [])
	);

	function checkCameraPermissions() {
		ExpoCamera.getCameraPermissionsAsync().then((perm) => {
			console.log("Camera permission:", perm);
			setPermission({
				granted: perm.granted,
				canAskAgain: perm.canAskAgain,
			});
		});
	}

	function handlePhotoTaken(uri: string) {
		addPhoto(uri);
	}

	return (
		<View
			className="flex flex-1 items-start justify-start px-5"
			style={{
				paddingTop: insets.bottom + 10,
				paddingBottom: insets.bottom + 10,
			}}
		>
			{isFocused && (
				<Camera
					permission={permission}
					onCapture={(photoUri: string) => handlePhotoTaken(photoUri)}
				/>
			)}
		</View>
	);
}
