import { headerOptions } from "@/constants/header";
import { Stack } from "expo-router";

export default function AccountLayout() {
	return (
		<Stack screenOptions={headerOptions}>
			<Stack.Screen
				name="credits"
				options={{
					headerTitle: "Créditos",
				}}
			/>
			<Stack.Screen
				name="profile"
				options={{
					headerTitle: "Perfil",
				}}
			/>
			<Stack.Screen
				name="settings"
				options={{
					headerTitle: "Configurações",
				}}
			/>
		</Stack>
	);
}
