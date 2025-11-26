import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";

export default function SubmitReport() {
	return (
		<>
			<View className="bg-bg-200 flex flex-1 items-center justify-center">
				<Text className="text-white">Submit</Text>
			</View>
			<StatusBar style="light" />
		</>
	);
}
