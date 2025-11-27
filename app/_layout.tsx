import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { VariableContextProvider } from "nativewind";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { themes } from "@/constants/theme";
import { useColorScheme } from "react-native";
import "../global.css";

// Set the animation options for the splash screen
SplashScreen.setOptions({
	duration: 1000,
	fade: true,
});

export default function RootLayout() {
	const colorScheme = useColorScheme() as "light" | "dark";

	return (
		<GestureHandlerRootView style={{ flex: 1 }}>
			<VariableContextProvider value={themes.light}>
				<BottomSheetModalProvider>
					<Stack
						screenOptions={{
							headerShown: false,
							contentStyle: {
								backgroundColor: themes["light"]["--color-neutral-200"],
							},
						}}
						initialRouteName="onboarding"
					/>
				</BottomSheetModalProvider>
			</VariableContextProvider>
		</GestureHandlerRootView>
	);
}
