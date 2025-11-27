import { useStatusBarStyle } from "@/hooks/use-status-bar-style";
import { Text, View } from "react-native";

export default function Settings() {
	useStatusBarStyle("light");

	return (
		<View className="flex flex-1 items-center justify-center">
			<Text className="text-white">Settings</Text>
		</View>
	);
}
