import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { VariableContextProvider } from "nativewind";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Toast, { BaseToast, ToastConfig } from "react-native-toast-message";

import { SplashScreenController } from "@/components/splash";
import { themes } from "@/constants/theme";
import { SessionProvider, useSession } from "@/providers/session-provider";

import "../global.css";

// Set the animation options for the splash screen
SplashScreen.setOptions({
	duration: 1000,
	fade: true,
});

const toastConfig = {
	error: ({ text1, text2, ...rest }) => (
		<BaseToast
			{...rest}
			text1={text1}
			text2={text2}
			text1Style={{ fontSize: 18, fontWeight: "bold", color: "#103218" }}
			text2Style={{ fontSize: 14, color: "#2E4B35" }}
			text2NumberOfLines={2}
			style={{ borderLeftColor: "#FF4C4C" }}
		/>
	),
} as ToastConfig;

export default function RootLayout() {
	return (
		<Providers>
			<SplashScreenController />
			<RootNavigator />
			<Toast position="bottom" visibilityTime={4000} config={toastConfig} />
		</Providers>
	);
}

function RootNavigator() {
	const { token } = useSession();

	return (
		<Stack
			screenOptions={{
				headerShown: false,
				contentStyle: {
					backgroundColor: themes["light"]["--color-neutral-200"],
				},
			}}
		>
			<Stack.Protected guard={!!token}>
				<Stack.Screen name="(app)" />
			</Stack.Protected>

			<Stack.Protected guard={!token}>
				<Stack.Screen name="sign-in" />
			</Stack.Protected>
		</Stack>
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
