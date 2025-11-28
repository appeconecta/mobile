import { useImage } from "expo-image";
import { GoogleMaps } from "expo-maps";
import { styled } from "nativewind";
import { useMemo, useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// Components
import { TagGroup } from "@/components/tag-group";
import { useStatusBarStyle } from "@/hooks/use-status-bar-style";

// Types
import { GoogleMapsColorScheme } from "expo-maps/build/google/GoogleMaps.types";

// Icons
import RefreshIcon from "@/assets/icons/refresh.svg";
const StyledRefreshIcon = styled(RefreshIcon);

import VerifiedIcon from "@/assets/icons/verified.svg";
import { LinearGradient } from "@/components/ui/linear-gradient";
const StyledVerifiedIcon = styled(VerifiedIcon);

import SearchIcon from "@/assets/icons/search.svg";
const StyledSearchIcon = styled(SearchIcon);

import FilterIcon from "@/assets/icons/filter.svg";
import { markerConfigs, markerIcons } from "@/constants/marker";

// Data
const StyledFilterIcon = styled(FilterIcon);

export default function Community() {
	const insets = useSafeAreaInsets();
	useStatusBarStyle("dark");

	const markerIconRefs = {
		marker1: useImage(markerIcons.marker1),
		marker2: useImage(markerIcons.marker2),
	} as const;

	const renderedMarkers = useMemo(
		() =>
			markerConfigs.map((marker) => {
				const icon = markerIconRefs[marker.iconName];
				return icon ? { ...marker, icon } : marker;
			}),
		[]
	);

	const filterTags = [
		{ id: "lixo", name: "Focos de Lixo" },
		{ id: "coleta", name: "Pontos de Coleta" },
		{ id: "lixeiras", name: "Lixeiras" },
	];

	const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

	return (
		<View
			className="bg-bg-200 flex flex-1 items-center justify-start"
			style={{
				paddingTop: insets.top + 24,
				paddingBottom: insets.bottom + 16,
			}}
		>
			<GoogleMaps.View
				style={{
					flex: 1,
					position: "absolute",
					top: 0,
					left: 0,
					right: 0,
					bottom: 0,
				}}
				contentPadding={{
					top: insets.top + 256,
					bottom: insets.bottom + 128,
				}}
				cameraPosition={{
					coordinates: {
						latitude: -9.669745,
						longitude: -35.721262,
					},
					zoom: 14,
				}}
				colorScheme={GoogleMapsColorScheme.LIGHT}
				markers={renderedMarkers}
			/>
			{/* Header */}
			{/* Title */}
			<View className="z-50 mb-4 flex flex-col items-start justify-start gap-1 px-5">
				<View className="flex w-full flex-row items-center justify-between">
					<Text className="text-primary-600 text-5xl font-medium">Sua Cidade</Text>
					<TouchableOpacity className="bg-bg-100 rounded-full p-2">
						<StyledRefreshIcon width={24} height={24} />
					</TouchableOpacity>
				</View>
				<View className="flex flex-row items-center justify-center gap-2">
					<Text className="text-primary-600 text-start text-xl font-medium">
						Maceió, AL
					</Text>
					<StyledVerifiedIcon width={14} height={14} className="fill-primary-100" />
				</View>
			</View>
			{/* Search */}
			<View className="z-50 mb-1 flex w-full flex-col items-start justify-start gap-3 px-5">
				<View className="relative w-full rounded-full shadow-md">
					<TextInput
						className="bg-bg-100 text-primary-600 font-regular w-full rounded-full py-3 pl-12 text-base placeholder:text-[#A3A3A3]"
						placeholder="Pesquisar por focos de lixo e muito mais..."
					/>
					<StyledSearchIcon
						className="fill-border-primary absolute top-1/2 left-4 -translate-y-1/2"
						width={20}
						height={20}
					/>
				</View>
				<View className="h-0 w-full" />
			</View>
			<View className="ml-5 flex flex-row items-center justify-start gap-2">
				<View className="bg-primary-400 flex-row items-center justify-center gap-2 rounded-full px-4 py-2">
					<StyledFilterIcon width={18} height={18} className="fill-white" />
					<Text className="text-base font-bold text-white">Filtros</Text>
				</View>
				<TagGroup
					tags={filterTags}
					selected={selectedFilters}
					onSelect={setSelectedFilters}
					unique={true}
				/>
			</View>
			{/* Gradient for header readability */}
			<LinearGradient
				pointerEvents="none"
				colors={["#C9E2C9", "rgba(243, 247, 244, 0)"]}
				className="absolute top-0 left-0 h-64 w-full opacity-80"
			/>
		</View>
	);
}
