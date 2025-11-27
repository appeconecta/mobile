import { Link } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function SubmitFormStep3() {
	const insets = useSafeAreaInsets();

	return (
		<View
			className="flex flex-1 items-start justify-start px-5"
			style={{
				paddingTop: insets.bottom + 10,
				paddingBottom: insets.bottom + 10,
			}}
		>
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
