import { CameraType, CameraView, useCameraPermissions } from "expo-camera";
import { styled } from "nativewind";
import { useState } from "react";
import { Linking, Text, TouchableOpacity, View } from "react-native";

// Icons
import FlipCameraIcon from "@/assets/icons/flip_camera.svg";
import { cn } from "@/lib/utils";
import { useRouter } from "expo-router";

const StyledFlipCameraIcon = styled(FlipCameraIcon);

interface CameraProps {
	className?: string;
}

export function Camera({ className }: CameraProps) {
	const [facing, setFacing] = useState<CameraType>("back");
	const [permission] = useCameraPermissions();
	const router = useRouter();

	if (permission === null) {
		return (
			<View
				className={cn("bg-primary-100 flex-1 rounded-tl-2xl rounded-tr-2xl", className)}
			/>
		);
	}

	if (!permission.granted) {
		if (!permission.canAskAgain) {
			return (
				<View
					className={cn(
						"bg-primary-100 flex-1 items-center justify-center rounded-tl-2xl rounded-tr-2xl",
						className
					)}
				>
					<Text>
						Permissão de câmera negada. Por favor, habilite nas configurações do
						dispositivo.
					</Text>
					<TouchableOpacity onPress={goToSettings}>
						<Text className="text-primary-400">Requerer permissão</Text>
					</TouchableOpacity>
				</View>
			);
		} else {
			return (
				<View
					className={cn("bg-primary-100 flex-1 rounded-tl-2xl rounded-tr-2xl", className)}
				>
					<Text className="mb-4">Precisamos de sua permissão para acessar a câmera.</Text>
					<TouchableOpacity
						className="bg-primary-400 rounded px-4 py-2"
						onPress={() => router.replace("/(permissions)/camera")}
					>
						<Text className="text-white">Requerer permissão</Text>
					</TouchableOpacity>
				</View>
			);
		}
	}

	function goToSettings() {
		Linking.openSettings();
	}

	function toggleCameraFacing() {
		setFacing((current) => (current === "back" ? "front" : "back"));
	}

	return (
		<View
			className={cn(
				"relative flex w-full flex-1 flex-col items-center justify-center overflow-hidden rounded-tl-2xl rounded-tr-2xl",
				className
			)}
		>
			<CameraView style={{ flex: 1, width: "100%" }} facing={facing} />
			<TouchableOpacity
				className="bg-primary-400 absolute right-6 bottom-6 flex-row self-center rounded-full px-4 py-4"
				onPress={toggleCameraFacing}
			>
				<StyledFlipCameraIcon width={24} height={24} className="fill-white" />
			</TouchableOpacity>
		</View>
	);
}
