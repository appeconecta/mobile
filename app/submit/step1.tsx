import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Camera as ExpoCamera } from "expo-camera";

// Components
import { Camera } from "@/components/camera";

export default function SubmitFormStep1() {
	const insets = useSafeAreaInsets();

	const [isFocused, setIsFocused] = useState(false);
	const [permission, setPermission] = useState<{
		granted: boolean;
		canAskAgain: boolean;
	} | null>(null);

	useFocusEffect(
		// Callback should be wrapped in `React.useCallback` to avoid running the effect too often.
		useCallback(() => {
			// Invoked whenever the route is focused.

			setIsFocused(true);
			console.log("Checking camera permission...");
			// Check camera permission
			ExpoCamera.getCameraPermissionsAsync().then((perm) => {
				console.log("Camera permission:", perm);
				setPermission({
					granted: perm.granted,
					canAskAgain: perm.canAskAgain,
				});
			});

			// Return function is invoked whenever the route gets out of focus.
			return () => {
				setIsFocused(false);
			};
		}, [])
	);

	return (
		<View
			className="flex flex-1 items-start justify-start px-5"
			style={{
				paddingTop: insets.bottom + 10,
				paddingBottom: insets.bottom + 10,
			}}
		>
			{isFocused && <Camera permission={permission} />}
		</View>
	);
}
