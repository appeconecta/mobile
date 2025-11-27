import type { ExtendedStackNavigationOptions } from "expo-router/build/layouts/StackClient";

export const headerOptions: ExtendedStackNavigationOptions = {
	headerShown: true,
	headerStyle: {
		backgroundColor: "#346259",
	},
	headerTitleAlign: "center",
	headerTitleStyle: {
		color: "#FFFFFF",
	},
	headerTintColor: "#FFFFFF",
	presentation: "modal",
};
