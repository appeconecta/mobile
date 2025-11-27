import { Text, TouchableOpacity, View } from "react-native";

export default function SubmitFormStep4() {
	return (
		<View className="flex items-start justify-start gap-4 p-5">
			<TouchableOpacity className="bg-primary-400 mt-auto w-full items-center justify-center rounded-lg px-9 py-3">
				<Text className="text-center text-lg font-medium text-white">Enviar Relatório</Text>
			</TouchableOpacity>
		</View>
	);
}
