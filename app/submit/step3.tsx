import { Link } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

export default function SubmitFormStep3() {
	return (
		<View className="flex items-start justify-start gap-4 p-5">
			<Link href="/submit/step4" asChild>
				<TouchableOpacity className="bg-primary-400 mt-auto w-full items-center justify-center rounded-lg px-9 py-3">
					<Text className="text-center text-lg font-medium text-white">
						Próximo passo
					</Text>
				</TouchableOpacity>
			</Link>
		</View>
	);
}
