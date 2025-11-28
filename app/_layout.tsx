import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { VariableContextProvider } from "nativewind";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { SplashScreenController } from "@/components/splash";
import { themes } from "@/constants/theme";
import { SessionProvider, useSession } from "@/providers/session-provider";

import "../global.css";

// Set the animation options for the splash screen
SplashScreen.setOptions({
	duration: 1000,
	fade: true,
});

export default function RootLayout() {
	// const colorScheme = useColorScheme() as "light" | "dark";
	// console.log("Color scheme:", colorScheme);

	const session = useSession();
	console.log("Session:", session);

	return (
		<Providers>
			<SplashScreenController />
			<Stack
				screenOptions={{
					headerShown: false,
					contentStyle: {
						backgroundColor: themes["light"]["--color-neutral-200"],
					},
				}}
			>
				<Stack.Protected guard={!!session}>
					<Stack.Screen name="(app)" />
				</Stack.Protected>

				<Stack.Protected guard={!session}>
					<Stack.Screen name="sign-in" />
				</Stack.Protected>
			</Stack>
		</Providers>
	);
}

function Providers({ children }: { children: React.ReactNode }) {
	return (
		<GestureHandlerRootView style={{ flex: 1 }}>
			<VariableContextProvider value={themes.light}>
				<BottomSheetModalProvider>
					<SessionProvider>{children}</SessionProvider>
				</BottomSheetModalProvider>
			</VariableContextProvider>
		</GestureHandlerRootView>
	);
}
