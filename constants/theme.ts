const lightPalette = {
	primary100: "#C9E2C9",
	primary200: "#AED296",
	primary300: "#77B883",
	primary400: "#4F9D69",
	primary500: "#346259",
	primary600: "#26413C",
	bg100: "#F3F7F4",
	bg200: "#F6F7EB",
	bg300: "#E6EADA",
	surface: "#F2F7F1",
	surfaceMuted: "#E4EDDF",
	border: "#A3A3A3",
	onPrimary: "#F3F7F4",
	onSurface: "#1F2A24",
};

const darkPalette = {
	primary100: "#E0F5E5",
	primary200: "#B4DFC5",
	primary300: "#78C4A1",
	primary400: "#4F9D69",
	primary500: "#2F7350",
	primary600: "#173624",
	bg100: "#050F0B",
	bg200: "#0B1811",
	bg300: "#14241B",
	surface: "#0F1C15",
	surfaceMuted: "#1C2B23",
	border: "#3C4B43",
	onPrimary: "#05150D",
	onSurface: "#E9F4ED",
};

const baseColors = {
	tint: "#4F9D69",
	icon: "#77B883",
};

const buildCssVariables = (palette: typeof lightPalette) => ({
	"--palette-primary-100": palette.primary100,
	"--palette-primary-200": palette.primary200,
	"--palette-primary-300": palette.primary300,
	"--palette-primary-400": palette.primary400,
	"--palette-primary-500": palette.primary500,
	"--palette-primary-600": palette.primary600,
	"--palette-bg-100": palette.bg100,
	"--palette-bg-200": palette.bg200,
	"--palette-bg-300": palette.bg300,
	"--palette-surface": palette.surface,
	"--palette-surface-muted": palette.surfaceMuted,
	"--palette-border-primary": palette.border,
	"--palette-primary-foreground": palette.onPrimary,
});

export const ThemeCssVariables = {
	light: buildCssVariables(lightPalette),
	dark: buildCssVariables(darkPalette),
} as const;

export const Colors = {
	light: {
		...lightPalette,
		text: lightPalette.onSurface,
		background: lightPalette.bg100,
		card: lightPalette.surface,
		borderColor: lightPalette.border,
		tint: baseColors.tint,
		icon: baseColors.icon,
		tabIconDefault: lightPalette.primary200,
		tabIconSelected: lightPalette.primary400,
	},
	dark: {
		...darkPalette,
		text: darkPalette.onSurface,
		background: darkPalette.bg100,
		card: darkPalette.surface,
		borderColor: darkPalette.border,
		tint: darkPalette.primary200,
		icon: darkPalette.primary300,
		tabIconDefault: darkPalette.primary500,
		tabIconSelected: darkPalette.primary200,
	},
} as const;

export type SupportedColorScheme = keyof typeof Colors;
export type ThemeColorToken = keyof typeof Colors.light;
export type ThemeCssVariableName = keyof typeof ThemeCssVariables.light;

export function getThemeColor(token: ThemeColorToken, scheme: SupportedColorScheme = "light") {
	return Colors[scheme][token];
}
