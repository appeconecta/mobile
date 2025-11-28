import { Camera } from "expo-camera";
import { useRouter } from "expo-router";
import { Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// Icons
import LogoFull from "@/assets/logo/logo-full.svg";

// Images
const image = require("@/assets/illustrations/onboarding/step-3.png");

// Components
import { Image } from "@/components/ui/image";
import { RippleButton } from "@/components/ui/ripple-button";
import { useCallback } from "react";

export default function CameraPermissionRequest() {
	const insets = useSafeAreaInsets();
	const router = useRouter();

	const requestPermission = useCallback(async () => {
		await Camera.requestCameraPermissionsAsync();
		router.replace("/submit/step1");
	}, []);

	return (
		<View
			className="flex flex-1 items-stretch gap-8 py-16"
			style={{
				paddingTop: insets.top + 20,
				paddingBottom: insets.bottom + 20,
			}}
		>
			{/* <Background /> */}

			<View className="items-center px-3 pt-9">
				<LogoFull />
			</View>

			<View className="flex flex-1 items-stretch justify-center gap-6">
				<View className="flex w-full flex-1 items-center gap-2 px-6 pt-2">
					<Text className="text-center text-[36px] font-bold text-[#103218]">
						Seu relato começa com uma foto.
					</Text>

					<Text className="px-8 text-center text-[16px] font-medium text-[#2E4B35]">
						Fotografar o foco de lixo é o primeiro passo para resolver os problemas com
						poluição em seu bairro.
					</Text>

					<View className="bg-primary-100 mx-8 my-4 rounded-2xl px-4 py-2">
						<Text className="text-primary-300 text-center text-sm font-normal">
							Ao permitir, selecione a opção{" "}
							<Text className="font-bold">“Durante o uso do app”</Text> para que a
							permissão não seja requerida a todo momento.
						</Text>
					</View>

					<View className="flex w-full flex-1 items-center justify-center">
						<Image
							source={image}
							transition={250}
							className="h-full w-full"
							contentFit="contain"
						/>
					</View>
				</View>
			</View>

			<View className="mx-18 mb-6 overflow-hidden rounded-lg">
				<RippleButton
					className="bg-primary-400 flex flex-row items-center justify-center gap-3 rounded-lg py-4"
					activeOpacity={0.6}
					onPress={requestPermission}
				>
					<Text className="text-lg font-semibold text-white">
						Permitir acesso à câmera
					</Text>
				</RippleButton>
			</View>
		</View>
	);
}
