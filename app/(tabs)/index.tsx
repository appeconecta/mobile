import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function Index() {
	return (
		<View className="flex flex-1 items-center justify-center bg-green-500">
			<Text className="text-white">Home</Text>
			<Link href="/submit" className="pt-5 text-lg">
				Open modal
			</Link>
		</View>
	);
}
