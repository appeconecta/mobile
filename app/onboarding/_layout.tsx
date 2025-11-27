import { useStatusBarStyle } from "@/hooks/use-status-bar-style";
import { Stack } from "expo-router";

export default function OnboardingLayout() {
	useStatusBarStyle("dark");

	return <Stack />;
}
