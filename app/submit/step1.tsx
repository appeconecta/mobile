import { useIsFocused } from "@react-navigation/native";
import { Link } from "expo-router";
import { styled } from "nativewind";
import { TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// Icons
import CameraIcon from "@/assets/icons/camera.svg";
import { Camera } from "@/components/camera";

const StyledCameraIcon = styled(CameraIcon);

export default function SubmitFormStep1() {
	const insets = useSafeAreaInsets();
	const isFocused = useIsFocused();

	return (
		<View
			className="flex flex-1 items-start justify-start px-5"
			style={{
				paddingTop: insets.bottom + 10,
				paddingBottom: insets.bottom + 10,
			}}
		>
			{isFocused && <Camera />}
			<Link href="/submit/step2" asChild>
				<TouchableOpacity className="bg-primary-400 w-full items-center justify-center rounded-br-lg rounded-bl-lg px-9 py-4">
					<StyledCameraIcon className="fill-white" width={28} height={28} />
				</TouchableOpacity>
			</Link>
		</View>
	);
}
