import { CameraType, CameraView, useCameraPermissions } from "expo-camera";
import { useState } from "react";
import { Button, Text, TouchableOpacity, View } from "react-native";

export function Camera() {
	const [facing, setFacing] = useState<CameraType>("back");
	const [permission, requestPermission] = useCameraPermissions();

	if (!permission) {
		// Camera permissions are still loading.
		return <View />;
	}

	if (!permission.granted) {
		// Camera permissions are not granted yet.
		return (
			<View className="flex-1 justify-center">
				<Text className="pb-6 text-center text-red-400">
					We need your permission to show the camera
				</Text>
				<Button onPress={requestPermission} title="grant permission" />
			</View>
		);
	}

	function toggleCameraFacing() {
		setFacing((current) => (current === "back" ? "front" : "back"));
	}

	return (
		<View className="flex-1 justify-center">
			<CameraView className="flex-1" facing={facing} />
			<TouchableOpacity
				className="bg-primary-400 absolute bottom-16 flex-row self-center rounded-full px-4 py-2"
				onPress={toggleCameraFacing}
			>
				<Text className="text-white">Flip Camera</Text>
			</TouchableOpacity>
		</View>
	);
}
