import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

import "../global.css";

export default function RootLayout() {
	return (
		<>
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
						presentation: "modal",
					}}
				/>
			</Stack>
			<StatusBar style="dark" />
		</>
	);
}
