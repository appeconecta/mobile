import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SystemUI from "expo-system-ui";
import { vars } from "nativewind";
import {
	PropsWithChildren,
	createContext,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useRef,
	useState,
} from "react";
import { ColorSchemeName, useColorScheme as useSystemColorScheme } from "react-native";

import { Colors, SupportedColorScheme, ThemeCssVariables } from "@/constants/theme";

export type ThemePreference = "system" | "light" | "dark";

interface ThemeContextValue {
	colorScheme: NonNullable<ColorSchemeName>;
	preference: ThemePreference;
	isHydrated: boolean;
	themeStyle: ReturnType<typeof vars>;
	setPreference: (preference: ThemePreference) => void;
}

const STORAGE_KEY = "@appeconecta:theme-preference";

const themeStyleMap: Record<SupportedColorScheme, ReturnType<typeof vars>> = {
	light: vars(ThemeCssVariables.light),
	dark: vars(ThemeCssVariables.dark),
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: PropsWithChildren) {
	const systemColorScheme = useSystemColorScheme() ?? "light";
	const [preference, setPreferenceState] = useState<ThemePreference>("system");
	const [isHydrated, setIsHydrated] = useState(false);
	const hasPersisted = useRef(false);

	useEffect(() => {
		let isMounted = true;
		AsyncStorage.getItem(STORAGE_KEY)
			.then((stored) => {
				if (!stored || !["system", "light", "dark"].includes(stored)) {
					return;
				}
				if (isMounted) {
					setPreferenceState(stored as ThemePreference);
				}
			})
			.finally(() => {
				if (isMounted) {
					setIsHydrated(true);
				}
			});

		return () => {
			isMounted = false;
		};
	}, []);

	const resolvedColorScheme = preference === "system" ? systemColorScheme : preference;
	const themeStyle = themeStyleMap[resolvedColorScheme];

	useEffect(() => {
		SystemUI.setBackgroundColorAsync(Colors[resolvedColorScheme].background).catch(() => null);
	}, [resolvedColorScheme]);

	const persistPreference = useCallback(async (nextPreference: ThemePreference) => {
		try {
			await AsyncStorage.setItem(STORAGE_KEY, nextPreference);
		} catch (error) {
			// noop - persistence failure should not block UI updates
		}
	}, []);

	const setPreference = useCallback(
		(nextPreference: ThemePreference) => {
			setPreferenceState(nextPreference);

			// avoid persisting the initial "system" default twice
			hasPersisted.current = true;
			persistPreference(nextPreference);
		},
		[persistPreference]
	);

	useEffect(() => {
		if (!isHydrated || hasPersisted.current) return;
		persistPreference(preference);
		hasPersisted.current = true;
	}, [isHydrated, persistPreference, preference]);

	const value = useMemo<ThemeContextValue>(
		() => ({
			colorScheme: resolvedColorScheme,
			preference,
			isHydrated,
			themeStyle,
			setPreference,
		}),
		[resolvedColorScheme, preference, isHydrated, themeStyle, setPreference]
	);

	return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useThemePreferenceContext() {
	const context = useContext(ThemeContext);
	if (!context) {
		throw new Error("useThemePreferenceContext must be used within ThemeProvider");
	}
	return context;
}

export function useThemePreference() {
	return useThemePreferenceContext();
}
