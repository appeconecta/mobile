import { useStatusBarStyle } from "@/hooks/use-status-bar-style";
import { FlashList } from "@shopify/flash-list";
import { useEffect, useState } from "react";
import { Dimensions, Pressable, StyleProp, Text, TouchableOpacity, View } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { cn } from "@/lib/utils";
import { styled } from "nativewind";

// Components
import { Image } from "@/components/ui/image";

// Icons
import AnalyticsIcon from "@/assets/icons/analytics.svg";
import CheckCircleIcon from "@/assets/icons/check_circle.svg";
import DehazeIcon from "@/assets/icons/dehaze.svg";
import GridViewIcon from "@/assets/icons/grid_view.svg";
import PendingIcon from "@/assets/icons/pending.svg";

const StyledDehazeIcon = styled(DehazeIcon);
const StyledAnalyticsIcon = styled(AnalyticsIcon);
const StyledGridViewIcon = styled(GridViewIcon);
const StyledCheckCircleIcon = styled(CheckCircleIcon);
const StyledPendingIcon = styled(PendingIcon);

const springConfig = {
	damping: 12,
	stiffness: 100,
	mass: 0.6,
	velocity: 20,
};

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const BAR_WIDTH = SCREEN_WIDTH / 5;
const ITEM_HEIGHT = 128;

const POSTS_POSITION = SCREEN_WIDTH / 4 - BAR_WIDTH / 2;
const ANALYTICS_POSITION = (3 * SCREEN_WIDTH) / 4 - BAR_WIDTH / 2;

const ITEMS: FeedItemData[] = [
	{
		id: "1",
		imageUrl: "https://i.imgur.com/5Hsj4tJ.jpeg",
		status: "PENDING",
		date: "2024-06-01",
		address: "1672 R. Al. da Paz, Maceió, Alagoas",
		description: "Lorem ipsum dolor sit amet.",
	},
	{
		id: "2",
		imageUrl: "https://i.imgur.com/d8G9K7p.jpeg",
		status: "SOLVED",
		date: "2024-06-02",
		address: "Av. da Paz, Maceió, Alagoas",
		description: "Consectetur adipiscing elit.",
	},
	{
		id: "3",
		imageUrl: "https://i.imgur.com/oF6I8fT.jpeg",
		status: "PENDING",
		date: "2024-06-24",
		address: "Praia da Pajuçara, Maceió",
		description: "Sed do eiusmod tempor incididunt.",
	},
];

export default function Account() {
	const insets = useSafeAreaInsets();
	useStatusBarStyle("dark");

	const [currentSection, setCurrentSection] = useState<"posts" | "analytics">("analytics");

	const position = useSharedValue(POSTS_POSITION);

	useEffect(() => {
		if (currentSection === "posts") {
			position.value = withSpring(POSTS_POSITION, springConfig);
		} else {
			position.value = withSpring(ANALYTICS_POSITION, springConfig);
		}
	}, [currentSection, position]);

	const animatedStyle = useAnimatedStyle(() => {
		return {
			transform: [
				{
					translateX: position.value,
				},
			],
		};
	});

	const handleSectionChange = (section: "posts" | "analytics") => {
		if (section !== currentSection) {
			setCurrentSection(section);
		}
	};

	const listData = currentSection === "posts" ? ITEMS : [];

	return (
		<View className="bg-bg-300 flex-1">
			<FlashList
				data={listData}
				extraData={currentSection}
				renderItem={({ item }) => (
					<View className="px-5">
						<FeedItem {...item} />
					</View>
				)}
				keyExtractor={(item) => item.id}
				estimatedItemSize={ITEM_HEIGHT}
				showsVerticalScrollIndicator={false}
				ListHeaderComponent={
					<View
						className="flex w-full gap-7 bg-[#f2f7f1] shadow-2xl"
						style={{
							paddingTop: insets.top + 16,
							marginBottom: 20,
						}}
					>
						<View className="flex w-full flex-row items-center justify-between px-5">
							<View className="w-5" />
							<Text className="text-primary-600 text-xl font-bold">Fulano da Silva</Text>
							<Pressable
								android_ripple={{
									radius: 24,
									foreground: true,
									color: "rgba(0, 0, 0, 0.05)",
								}}
								className="overflow-hidden rounded-full p-2"
							>
								<StyledDehazeIcon className="fill-primary-600" width={20} height={20} />
							</Pressable>
						</View>

						<View className="flex flex-col items-center justify-center gap-3">
							<Image
								source={"https://i.imgur.com/5Hsj4tJ.jpeg"}
								contentFit="cover"
								transition={1000}
								className="h-24 w-24 rounded-full"
							/>
							<Text className="text-primary-600 text-lg font-bold">@theduardomaciel</Text>
						</View>

						<View className="flex w-full flex-row items-center justify-evenly">
							<View className="flex flex-col items-center justify-center gap-1">
								<Text className="text-primary-600 text-2xl font-black">115</Text>
								<Text className="text-primary-300 text-sm font-medium">Relatórios</Text>
							</View>
							<View className="flex flex-col items-center justify-center gap-1">
								<Text className="text-primary-600 text-2xl font-black">45</Text>
								<Text className="text-primary-300 text-sm font-medium">
									Confirmações
								</Text>
							</View>
							<View className="flex flex-col items-center justify-center gap-1">
								<Text className="text-primary-600 text-2xl font-black">24</Text>
								<Text className="text-primary-300 text-sm font-medium">
									Comentários
								</Text>
							</View>
						</View>

						<View className="flex w-full flex-row items-center justify-center">
							<TouchableOpacity
								activeOpacity={0.8}
								className={cn(
									"border-primary-300 flex-1 flex-row items-center justify-center gap-2 border-b-0 py-4 opacity-40",
									{
										"opacity-100": currentSection === "posts",
									}
								)}
								onPress={() => {
									handleSectionChange("posts");
								}}
							>
								<StyledGridViewIcon
									className="fill-primary-300"
									width={24}
									height={24}
								/>
							</TouchableOpacity>
							<TouchableOpacity
								activeOpacity={0.8}
								className={cn(
									"border-primary-300 flex-1 flex-row items-center justify-center gap-2 border-b-0 opacity-40",
									{
										"opacity-100": currentSection === "analytics",
									}
								)}
								onPress={() => {
									handleSectionChange("analytics");
								}}
							>
								<StyledAnalyticsIcon
									className="fill-primary-300"
									width={24}
									height={24}
								/>
							</TouchableOpacity>

							<Animated.View
								className="bg-primary-300 absolute bottom-0 left-0 h-0.5 -translate-x-1/2 rounded-full"
								style={[animatedStyle, { width: BAR_WIDTH }]}
							></Animated.View>
						</View>
					</View>
				}
				ListEmptyComponent={
					<View className="px-5 pt-16">
						<Text className="text-primary-600 text-center">
							{currentSection === "analytics"
								? "Em breve!"
								: "Nenhum relatório disponível ainda."}
						</Text>
					</View>
				}
				contentContainerStyle={{
					paddingBottom: insets.bottom + 32,
					flexGrow: 1,
				}}
				style={{ flex: 1 }}
			/>
		</View>
	);
}

interface FeedItemData {
	id: string;
	imageUrl: string;
	status: "PENDING" | "SOLVED";
	date: string;
	address: string;
	description: string;
}

interface FeedItemProps extends FeedItemData {
	style?: StyleProp<any>;
}

const ICONS = {
	PENDING: <StyledPendingIcon className="fill-red-300" width={16} height={16} />,
	SOLVED: <StyledCheckCircleIcon className="fill-primary-200" width={16} height={16} />,
};

const STATUS_TEXT = {
	PENDING: "Pendente",
	SOLVED: "Resolvido",
};

function FeedItem({ status, date, address, description, imageUrl, style }: FeedItemProps) {
	return (
		<View
			className="bg-bg-100 mb-4 w-full flex-row overflow-hidden rounded-lg"
			style={[{ height: ITEM_HEIGHT }, style]}
		>
			<View className="flex flex-1 flex-col items-start justify-start gap-2 p-3">
				<Text className="text-primary-600 mb-2 font-medium">{address}</Text>
				<Text className="text-primary-400 font-normal">{description}</Text>

				<View className="mt-auto flex w-full flex-row items-center justify-between">
					<View className="flex flex-row items-center justify-start gap-1">
						{ICONS[status]}
						<Text
							className={cn("text-sm font-medium", {
								"text-red-300": status === "PENDING",
								"text-primary-200": status === "SOLVED",
							})}
						>
							{STATUS_TEXT[status]}
						</Text>
					</View>
					<Text className="text-primary-300 font-light">
						{new Date(date).toLocaleDateString("pt-BR", {
							day: "2-digit",
							month: "2-digit",
						})}
					</Text>
				</View>
			</View>
			<Image source={imageUrl} contentFit="cover" transition={250} className="h-full w-2/5" />
		</View>
	);
}
