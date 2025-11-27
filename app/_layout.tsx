import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { VariableContextProvider } from "nativewind";
import { GestureHandlerRootView } from "react-native-gesture-handler";

// Types
import { ExtendedStackNavigationOptions } from "expo-router/build/layouts/StackClient";

import { themes } from "@/constants/theme";
import { useColorScheme } from "react-native";
import "../global.css";

// Set the animation options for the splash screen
SplashScreen.setOptions({
	duration: 1000,
	fade: true,
});

const screenWithHeaderOptions = (title: string) =>
	({
		headerShown: true,
		headerTitle: title,
		headerStyle: {
			backgroundColor: "#346259",
		},
		headerTitleAlign: "center",
		headerTitleStyle: {
			color: "#FFFFFF",
		},
		headerTintColor: "#FFFFFF",
		presentation: "modal",
	}) as ExtendedStackNavigationOptions;

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
								backgroundColor: themes["light"]["--color-neutral-100"],
							},
						}}
						initialRouteName="onboarding/index"
					>
						<Stack.Screen name="onboarding/index" />
						<Stack.Screen name="(tabs)" />
						<Stack.Screen
							name="account/credits"
							options={screenWithHeaderOptions("Créditos")}
						/>
						<Stack.Screen
							name="account/profile"
							options={screenWithHeaderOptions("Perfil")}
						/>
						<Stack.Screen
							name="account/settings"
							options={screenWithHeaderOptions("Configurações")}
						/>
						<Stack.Screen
							name="submit"
							options={screenWithHeaderOptions("Adicionar Denúncia")}
						/>
					</Stack>
				</BottomSheetModalProvider>
			</VariableContextProvider>
		</GestureHandlerRootView>
	);
}
