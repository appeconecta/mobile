import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";

import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import "../global.css";

// Set the animation options. This is optional.
SplashScreen.setOptions({
	duration: 1000,
	fade: true,
});

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
	const [isReady, setIsReady] = useState(false);

	useEffect(() => {
		async function doAsyncStuff() {
			try {
				// 3 seconds delay to simulate an async task
				await new Promise((resolve) => setTimeout(resolve, 3000));
			} catch (e) {
				console.warn(e);
			} finally {
				setIsReady(true);
			}
		}

		doAsyncStuff();
	}, []);

	useEffect(() => {
		if (isReady) {
			SplashScreen.hide();
		}
	}, [isReady]);

	if (!isReady) {
		return null;
	}

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
			<StatusBar style="dark" />
		</>
	);
}
