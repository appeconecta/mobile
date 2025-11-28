import { CameraType, CameraView } from "expo-camera";
import { useRouter } from "expo-router";
import { styled } from "nativewind";
import { useRef, useState } from "react";
import { Linking, Text, TouchableOpacity, View } from "react-native";

import { cn } from "@/lib/utils";

// Icons
import CameraIcon from "@/assets/icons/camera.svg";
import FlipCameraIcon from "@/assets/icons/flip_camera.svg";

const StyledCameraIcon = styled(CameraIcon);
const StyledFlipCameraIcon = styled(FlipCameraIcon);

interface CameraProps {
	className?: string;
	permission: {
		granted: boolean;
		canAskAgain: boolean;
	} | null;
	onCapture?: (uri: string, base64?: string) => void;
}

export function Camera({ permission, className, onCapture }: CameraProps) {
	const [facing, setFacing] = useState<CameraType>("back");
	const [isReady, setIsReady] = useState(false);
	const [isCapturing, setIsCapturing] = useState(false);
	const cameraRef = useRef<CameraView | null>(null);
	const router = useRouter();

	if (permission === null) {
		return <View className={cn("bg-primary-100 w-full flex-1 rounded-2xl", className)} />;
	}

	if (!permission.granted) {
		if (!permission.canAskAgain) {
			return (
				<View
					className={cn(
						"bg-primary-100 w-full flex-1 items-center justify-center rounded-2xl px-12",
						className
					)}
				>
					<Text className="text-primary-500 mb-4 text-center text-2xl">
						A permissão para acessar a câmera foi negada.
					</Text>
					<TouchableOpacity
						className="bg-primary-400 rounded-lg px-6 py-3"
						onPress={goToSettings}
					>
						<Text className="text-lg text-white">Ir para configurações</Text>
					</TouchableOpacity>
				</View>
			);
		} else {
			return (
				<View
					className={cn(
						"bg-primary-100 w-full flex-1 items-center justify-center rounded-2xl px-12",
						className
					)}
				>
					<Text className="text-primary-500 mb-4 text-center text-2xl">
						Precisamos de sua permissão para acessar a câmera.
					</Text>
					<TouchableOpacity
						className="bg-primary-400 rounded-lg px-6 py-3"
						onPress={goToPermissionsRequest}
					>
						<Text className="text-lg text-white">Requerer permissão</Text>
					</TouchableOpacity>
				</View>
			);
		}
	}

	function goToSettings() {
		Linking.openSettings();
	}

	function goToPermissionsRequest() {
		router.replace("/(permissions)/camera");
	}

	function toggleCameraFacing() {
		setFacing((current) => (current === "back" ? "front" : "back"));
	}

	async function takePicture() {
		try {
			if (!isReady || !cameraRef.current || isCapturing) return;
			setIsCapturing(true);
			const picture = await cameraRef.current.takePictureAsync({
				quality: 0.8,
				skipProcessing: false,
				base64: true,
			});
			if (picture?.uri) {
				const base64 = picture.base64
					? `data:image/jpg;base64,${picture.base64}`
					: undefined;
				onCapture?.(picture.uri, base64);
				router.push("/submit/step2");
			}
		} catch (e) {
			console.error("Failed to take picture", e);
		} finally {
			setIsCapturing(false);
		}
	}

	return (
		<>
			<View
				className={cn(
					"relative flex w-full flex-1 flex-col items-center justify-center overflow-hidden rounded-tl-2xl rounded-tr-2xl",
					className
				)}
			>
				<CameraView
					ref={(ref) => {
						cameraRef.current = ref;
					}}
					style={{ flex: 1, width: "100%" }}
					facing={facing}
					onCameraReady={() => setIsReady(true)}
				/>
				<TouchableOpacity
					className="bg-primary-400 absolute right-6 bottom-6 flex-row self-center rounded-full px-4 py-4"
					onPress={toggleCameraFacing}
				>
					<StyledFlipCameraIcon width={24} height={24} className="fill-white" />
				</TouchableOpacity>
			</View>
			<TouchableOpacity
				className="bg-primary-400 w-full items-center justify-center rounded-br-lg rounded-bl-lg px-9 py-4"
				onPress={takePicture}
				disabled={!isReady || isCapturing}
				activeOpacity={0.85}
			>
				<StyledCameraIcon className="fill-white" width={28} height={28} />
			</TouchableOpacity>
		</>
	);
}
