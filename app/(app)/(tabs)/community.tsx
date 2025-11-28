import { useImage } from "expo-image";
import { GoogleMaps } from "expo-maps";
import { styled } from "nativewind";
import { useCallback, useMemo, useRef, useState } from "react";
import { Pressable, Text, TextInput, TouchableOpacity, View } from "react-native";
import { FadeIn, FadeOut } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// Components
import { Callout } from "@/components/callout";
import { Tag } from "@/components/tag";
import { TagGroup } from "@/components/tag-group";
import { useStatusBarStyle } from "@/hooks/use-status-bar-style";

// Types
import { GoogleMapsColorScheme, GoogleMapsMarker } from "expo-maps/build/google/GoogleMaps.types";

// Icons
import RefreshIcon from "@/assets/icons/refresh.svg";
const StyledRefreshIcon = styled(RefreshIcon);

import VerifiedIcon from "@/assets/icons/verified.svg";
import { LinearGradient } from "@/components/ui/linear-gradient";
const StyledVerifiedIcon = styled(VerifiedIcon);

import SearchIcon from "@/assets/icons/search.svg";
const StyledSearchIcon = styled(SearchIcon);

import ShareIcon from "@/assets/icons/share.svg";
const StyledShareIcon = styled(ShareIcon);

import TrashIcon from "@/assets/icons/trash.svg";
const StyledTrashIcon = styled(TrashIcon);

import FilterIcon from "@/assets/icons/filter.svg";
import { BottomSheet } from "@/components/bottom-sheet";
import { Image } from "@/components/ui/image";
import { markerConfigs, markerIcons } from "@/constants/marker";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { ScrollView } from "react-native-gesture-handler";

// Data
const StyledFilterIcon = styled(FilterIcon);

const filterTags = [
	{ id: "lixo", name: "Focos de Lixo" },
	{ id: "coleta", name: "Pontos de Coleta" },
	{ id: "lixeiras", name: "Lixeiras", disabled: true },
];

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

	const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
	const [selectedMarker, setSelectedMarker] = useState<GoogleMapsMarker | null>(null);

	const mapRef = useRef<GoogleMaps.MapView>(null);
	const bottomSheetRef = useRef<BottomSheetModal>(null);

	const selectedTags = [
		{ id: "2-3", name: "Vidro" },
		{ id: "2-4", name: "Papel e papelão" },
		{ id: "2-5", name: "Orgânico" },
		{ id: "2-6", name: "Eletrônico" },
		{ id: "3-2", name: "Médio (1m² a 5m²)" },
		{ id: "4-2", name: "Raramente limpo" },
		{ id: "4-3", name: "Às vezes limpo" },
		{ id: "5-3", name: "Vegetação moderada" },
		{ id: "8-3", name: "Animais selvagens" },
		{ id: "8-4", name: "Insetos" },
		{ id: "8-5", name: "Aves" },
		{ id: "9-1", name: "Fácil acesso" },
	];

	const handleModalOpen = useCallback(() => {
		const sheet = bottomSheetRef.current;
		if (!sheet) return;
		sheet.present();
	}, []);

	const handleModalClose = useCallback(() => {
		const sheet = bottomSheetRef.current;
		if (!sheet) return;
		sheet.dismiss();
	}, []);

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
				ref={mapRef}
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
				onMarkerClick={(marker) => {
					if (!marker) return;
					console.log("Marker clicked:", marker.id);

					setSelectedMarker(marker);

					mapRef.current?.setCameraPosition({
						coordinates: {
							latitude: (marker.coordinates?.latitude ?? 0) - 0.0025,
							longitude: marker.coordinates?.longitude ?? 0,
						},
						zoom: 15,
					});

					handleModalOpen();
				}}
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
			{selectedMarker && (
				<Callout
					title={selectedMarker.title || ""}
					distance="0.5 km"
					confirmationsCount={10}
					entering={FadeIn}
					exiting={FadeOut.duration(100)}
				/>
			)}
			<BottomSheet
				ref={bottomSheetRef}
				snapPoints={["40%"]}
				index={0}
				backdropComponent={() => (
					<Pressable
						className="absolute top-0 right-0 bottom-0 left-0 flex-1 bg-black/0"
						onPress={handleModalClose}
					/>
				)}
				onDismiss={() => {
					if (selectedMarker) {
						mapRef.current?.setCameraPosition({
							coordinates: selectedMarker?.coordinates,
							zoom: 14,
						});
						setSelectedMarker(null);
					}
				}}
				handleIndicatorStyle={{ backgroundColor: "#E5E5E5", width: 60, marginTop: 8 }}
				enableDismissOnClose
			>
				<View className="gap-4 pt-1 pb-6">
					{/* Header */}
					<View className="flex flex-col px-6">
						<Text className="text-primary-600 mb-1 text-xl font-semibold">
							1672 R. Al. da Paz, Maceió, Alagoas
						</Text>
						<View className="flex flex-row items-center justify-start gap-2">
							<Text className="text-primary-500 font-regular text-base">
								Relatório
							</Text>
							<View className="bg-primary-500 h-1 w-1 rounded-full" />
							<Image
								className="h-4 w-4 rounded-full"
								source="https://avatars.githubusercontent.com/u/9919?s=200&v=4"
							/>
							<Text className="text-primary-500 font-regular text-base">
								postado por <Text className="font-bold">@theduardomaciel</Text>
							</Text>
						</View>
					</View>
					{/* Buttons */}
					<ScrollView
						horizontal
						showsHorizontalScrollIndicator={false}
						contentContainerClassName="gap-2 px-6"
					>
						<TouchableOpacity
							activeOpacity={0.8}
							className="bg bg-primary-200 flex flex-row items-center justify-center gap-2 rounded-full px-4 py-2"
						>
							<StyledTrashIcon width={16} height={16} className="fill-white" />
							<Text className="text-base font-bold text-white">Confirmar foco</Text>
						</TouchableOpacity>
						<TouchableOpacity
							activeOpacity={0.8}
							className="border-primary-200 flex flex-row items-center justify-center gap-2 rounded-full border px-4 py-2"
						>
							<StyledShareIcon width={16} height={16} className="fill-primary-200" />
							<Text className="text-primary-200 text-base font-bold">
								Compartilhar
							</Text>
						</TouchableOpacity>
					</ScrollView>
					{/* Images */}
					<View className="px-6">
						<Image
							source={"https://i.imgur.com/d8G9K7p.jpeg"}
							className="h-36 w-full self-center rounded-md"
						/>
					</View>
					{/* Description */}
					<View className="px-6">
						<Text className="text-primary-600 font-regular text-base">
							Informações detalhadas sobre o ponto selecionado no mapa aparecerão
							aqui.
						</Text>
					</View>
					{/* Tags */}
					<Text className="text-primary-600 px-6 text-lg font-semibold">
						Tags associadas
					</Text>
					<View className="px-6">
						<View className="flex-row flex-wrap gap-2">
							{selectedTags.map((tag) => (
								<Tag key={tag.id} name={tag.name} />
							))}
						</View>
					</View>
				</View>
			</BottomSheet>
		</View>
	);
}
