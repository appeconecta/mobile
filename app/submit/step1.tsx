import { Link } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

export default function SubmitFormStep1() {
	return (
		<View className="flex items-start justify-start gap-4 p-5">
			{/* <Camera /> */}
			<Link href="/submit/step2" asChild>
				<TouchableOpacity className="bg-primary-400 w-full rounded px-4 py-2">
					<Text className="text-white">Câmera</Text>
				</TouchableOpacity>
			</Link>
		</View>
	);
}
