import { Stack } from "expo-router";

// Constants
import { headerOptions } from "@/constants/header";
import { themes } from "@/constants/theme";

// Hooks
import { useStatusBarStyle } from "@/hooks/use-status-bar-style";

export default function SubmitFormLayout() {
	useStatusBarStyle("light");

	return (
		<Stack
			screenOptions={{
				contentStyle: {
					backgroundColor: themes["light"]["--color-neutral-200"],
				},
				...headerOptions,
			}}
			initialRouteName="step1"
		>
			<Stack.Screen
				name="step1"
				options={{
					headerTitle: "Reportar foco de lixo",
				}}
			/>
			<Stack.Screen
				name="step2"
				options={{
					headerTitle: "E aí, gostou da foto? ",
				}}
			/>
			<Stack.Screen
				name="step3"
				options={{
					headerTitle: "Descreva um pouco o foco",
				}}
			/>
			<Stack.Screen
				name="step4"
				options={{
					headerTitle: "Quer ser ainda mais descritivo?",
				}}
			/>
		</Stack>
	);
}
