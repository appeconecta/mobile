import { useStatusBarStyle } from "@/hooks/use-status-bar-style";
import { Text, View } from "react-native";

export default function Account() {
	useStatusBarStyle("dark");

	return (
		<View className="flex flex-1 items-center justify-center bg-purple-500">
			<Text className="text-white">Account</Text>
		</View>
	);
}
