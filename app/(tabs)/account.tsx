import { useStatusBarStyle } from "@/hooks/use-status-bar-style";
import { FlashList } from "@shopify/flash-list";
import { useEffect, useRef, useState } from "react";
import {
	Dimensions,
	NativeScrollEvent,
	NativeSyntheticEvent,
	Pressable,
	ScrollView,
	Text,
	TouchableOpacity,
	View,
	ViewStyle,
} from "react-native";
import Animated, {
	AnimatedStyle,
	useAnimatedStyle,
	useSharedValue,
	withSpring,
} from "react-native-reanimated";
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
import { AccountSheet } from "@/components/account-sheet";
import BottomSheet from "@gorhom/bottom-sheet";

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

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

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

	const [currentSection, setCurrentSection] = useState<"posts" | "analytics">("posts");
	const sectionsScrollRef = useRef<ScrollView | null>(null);
	const hasSyncedInitialSection = useRef(false);

	const position = useSharedValue(POSTS_POSITION);

	useEffect(() => {
		if (currentSection === "posts") {
			position.value = withSpring(POSTS_POSITION, springConfig);
		} else {
			position.value = withSpring(ANALYTICS_POSITION, springConfig);
		}
	}, [currentSection, position]);

	useEffect(() => {
		const offset = currentSection === "posts" ? 0 : SCREEN_WIDTH;
		sectionsScrollRef.current?.scrollTo({
			x: offset,
			animated: hasSyncedInitialSection.current,
		});
		hasSyncedInitialSection.current = true;
	}, [currentSection]);

	const animatedStyle = useAnimatedStyle(() => {
		return {
			transform: [
				{
					translateX: position.value,
				},
			],
		};
	});

	const handleMomentumScrollEnd = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
		const offsetX = event.nativeEvent.contentOffset.x;
		const nextSection = offsetX >= SCREEN_WIDTH / 2 ? "analytics" : "posts";
		if (nextSection !== currentSection) {
			setCurrentSection(nextSection);
		}
	};

	const handleSectionChange = (section: "posts" | "analytics") => {
		if (section !== currentSection) {
			setCurrentSection(section);
		}
	};

	const bottomSheetRef = useRef<BottomSheet>(null);

	return (
		<ScrollView
			className="bg-bg-300 flex-1"
			showsVerticalScrollIndicator={false}
			contentContainerStyle={{
				minHeight: SCREEN_HEIGHT + insets.top,
				paddingBottom: insets.bottom + 128,
			}}
		>
			<View className="flex flex-1 items-center justify-start">
				{/* Header */}
				<View
					className="flex w-full gap-7 bg-[#f2f7f1] shadow-lg"
					style={{
						paddingTop: insets.top + 16,
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
							onPress={() => {
								bottomSheetRef.current?.expand();
							}}
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

				<ScrollView
					ref={sectionsScrollRef}
					horizontal
					pagingEnabled
					showsHorizontalScrollIndicator={false}
					onMomentumScrollEnd={handleMomentumScrollEnd}
					scrollEventThrottle={16}
					className="w-full"
				>
					<View style={{ width: SCREEN_WIDTH }}>
						<FlashList
							data={ITEMS}
							renderItem={({ item, index }) => <FeedItem {...item} />}
							keyExtractor={(item) => item.id}
							scrollEnabled={false}
							showsVerticalScrollIndicator={false}
							className="relative w-full"
							style={{ width: "100%" }}
							contentContainerStyle={{
								paddingTop: 20,
								paddingHorizontal: 20,
								paddingBottom: 24,
							}}
						/>
					</View>
					<View
						className="flex flex-1 items-center justify-start"
						style={{ width: SCREEN_WIDTH }}
					>
						<Text className="text-primary-600 mt-16 text-center">Em breve!</Text>
					</View>
				</ScrollView>
			</View>

			<AccountSheet ref={bottomSheetRef} className="flex-1 items-center p-9" />
		</ScrollView>
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
	style?: AnimatedStyle<ViewStyle>;
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
		<Animated.View
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
		</Animated.View>
	);
}
