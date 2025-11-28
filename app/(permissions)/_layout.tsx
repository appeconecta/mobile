import { themes } from "@/constants/theme";
import { Stack } from "expo-router";

export default function PermissionsLayout() {
	return (
		<Stack
			screenOptions={{
				headerShown: false,
				contentStyle: {
					backgroundColor: themes["light"]["--color-neutral-200"],
				},
			}}
		/>
	);
}
