import { Text, View } from "react-native";

import { useStatusBarStyle } from "@/hooks/use-status-bar-style";

export default function SubmitReport() {
	useStatusBarStyle("light");
	return (
		<>
			<View className="bg-bg-200 flex flex-1 items-center justify-center">
				<Text className="text-white">Submit</Text>
			</View>
		</>
	);
}
