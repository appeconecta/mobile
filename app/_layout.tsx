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

	return (
		<Providers>
			<LayoutWithAuth />
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

function LayoutWithAuth() {
	const { session } = useSession();
	console.log("Session:", { session });

	if (!session) {
		return (
			<>
				<SplashScreenController />
				{/* Redirect to sign-in when not authenticated */}
				{/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
				{/* @ts-ignore - Redirect is provided by expo-router */}
				<Stack>
					<Stack.Screen name="sign-in" options={{ headerShown: false }} />
				</Stack>
			</>
		);
	}

	return (
		<>
			<SplashScreenController />
			<Stack
				screenOptions={{
					headerShown: false,
					contentStyle: {
						backgroundColor: themes["light"]["--color-neutral-200"],
					},
				}}
			>
				<Stack.Screen name="(app)" />
			</Stack>
		</>
	);
}
