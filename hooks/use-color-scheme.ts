import { useThemePreference } from "@/providers/theme-provider";

export function useColorScheme() {
	const { colorScheme } = useThemePreference();
	return colorScheme;
}
