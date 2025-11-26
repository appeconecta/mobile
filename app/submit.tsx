import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";

export default function SubmitReport() {
	return (
		<>
			<View className="flex flex-1 items-center justify-center bg-gray-600">
				<Text className="text-white">Submit</Text>
			</View>
			<StatusBar style="light" />
		</>
	);
}
