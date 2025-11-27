import { GoogleMapsMarker } from "expo-maps/build/google/GoogleMaps.types";
import { ImageSourcePropType } from "react-native";

export const markerIcons = {
	marker1: require("../assets/markers/marker1.png"),
	marker2: require("../assets/markers/marker2.png"),
} as const satisfies Record<string, ImageSourcePropType>;

export type MarkerIconName = keyof typeof markerIcons;

export type MarkerConfig = Omit<GoogleMapsMarker, "icon"> & {
	iconName: MarkerIconName;
};

export const markerConfigs: MarkerConfig[] = [
	{
		id: "1",
		coordinates: {
			latitude: -9.578559,
			longitude: -35.75578,
		},
		title: "Foco de lixo 1",
		snippet: "Lixo acumulado próximo à escola municipal.",
		iconName: "marker1",
	},
	{
		id: "2",
		coordinates: {
			latitude: -9.62337,
			longitude: -35.740119,
		},
		title: "Foco de lixo 2",
		snippet: "Lixo acumulado próximo ao hospital municipal.",
		iconName: "marker2",
	},
	{
		id: "3",
		coordinates: {
			latitude: -9.6689,
			longitude: -35.7205,
		},
		title: "Foco de lixo 3",
		snippet: "Lixo acumulado próximo ao mercado central.",
		iconName: "marker1",
	},
	{
		id: "4",
		coordinates: {
			latitude: -9.616818,
			longitude: -35.712252,
		},
		title: "Foco de lixo 4",
		snippet: "Lixo acumulado próximo à praça central.",
		iconName: "marker1",
	},
	{
		id: "5",
		coordinates: {
			latitude: -9.556661,
			longitude: -35.77759,
		},
		title: "Foco de lixo 5",
		snippet: "Lixo acumulado próximo ao rio.",
		iconName: "marker2",
	},
];
