import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import "../global.css";

// Set the animation options for the splash screen
SplashScreen.setOptions({
	duration: 1000,
	fade: true,
});

export default function RootLayout() {
	return (
		<GestureHandlerRootView style={{ flex: 1 }}>
			<Stack
				screenOptions={{
					headerShown: false,
				}}
			>
				<Stack.Screen name="(onboarding)/index" />
				<Stack.Screen name="(tabs)" />
				<Stack.Screen
					name="submit"
					options={{
						headerShown: true,
						headerTitle: "Adicionar Relatório",
						headerStyle: {
							backgroundColor: "#346259",
						},
						headerTitleAlign: "center",
						headerTitleStyle: {
							color: "#FFFFFF",
						},
						headerTintColor: "#FFFFFF",
						presentation: "modal",
					}}
				/>
			</Stack>
		</GestureHandlerRootView>
	);
}
