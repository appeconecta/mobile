import { FlashList } from "@shopify/flash-list";
import { usePathname } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { Dimensions, RefreshControl, Share, StyleProp, Text, View } from "react-native";
import Animated, {
	useAnimatedStyle,
	useSharedValue,
	withSpring,
	withTiming,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// Icons
import FlagCheckIcon from "@/assets/icons/flag_check.svg";
import FlagCheckFilledIcon from "@/assets/icons/flag_check_filled.svg";
import PinIcon from "@/assets/icons/pin.svg";
import ShareIcon from "@/assets/icons/share.svg";

// Components
import { FeedButton } from "@/components/feed-button";
import { Image } from "@/components/ui/image";
import { useStatusBarStyle } from "@/hooks/use-status-bar-style";
import { useCache } from "@/providers/cache-provider";

const INITIAL_POSITION = 165;
const SELECTED_POSITION = 0;
const MIN_FEED_ITEM_HEIGHT = 520;
const { height: SCREEN_HEIGHT } = Dimensions.get("window");

type FeedItemData = {
	id: string;
	author: string;
	address: string;
	imageUrl: string;
};

const springConfig = {
	damping: 12,
	stiffness: 100,
	mass: 0.6,
	velocity: 20,
};

export default function Reports() {
	const insets = useSafeAreaInsets();
	useStatusBarStyle("light");
	const { trashspots, refreshTrashspots } = useCache();
	const [refreshing, setRefreshing] = useState(false);

	const pageHeight = Math.max(MIN_FEED_ITEM_HEIGHT, SCREEN_HEIGHT - (insets.top + insets.bottom));

	const isSelected = usePathname() === "/reports";
	const position = useSharedValue(isSelected ? SELECTED_POSITION : INITIAL_POSITION);
	const opacity = useSharedValue(isSelected ? 1 : 0);

	useEffect(() => {
		if (isSelected) {
			position.value = withSpring(SELECTED_POSITION, springConfig);
			opacity.value = withTiming(1, { duration: 650 });
		} else {
			position.value = INITIAL_POSITION;
			opacity.value = 0;
		}
	}, [isSelected, position]);

	useEffect(() => {
		// Auto refresh on mount
		refreshTrashspots();
	}, []);

	const animatedStyle = useAnimatedStyle(() => {
		return {
			transform: [
				{
					translateY: position.value,
				},
			],
		};
	});

	const onRefresh = useCallback(async () => {
		setRefreshing(true);
		await refreshTrashspots();
		setRefreshing(false);
	}, [refreshTrashspots]);

	return (
		<View
			className="flex flex-1 items-start justify-start bg-black"
			style={{
				paddingBottom: insets.bottom + 16,
			}}
		>
			<View className="w-full bg-black" style={{ height: insets.top }} />

			{/* <Animated.View
				className="bg-primary-400 absolute bottom-0 left-0 z-60 h-68 w-full rounded-tl-2xl rounded-tr-2xl"
				style={animatedStyle}
			/> */}

			<FlashList
				data={trashspots || []}
				renderItem={({ item, index }) => (
					<FeedItem
						{...item}
						height={pageHeight}
						style={index === 0 ? animatedStyle : undefined}
					/>
				)}
				keyExtractor={(item) => item.id}
				pagingEnabled
				snapToInterval={pageHeight}
				snapToAlignment="start"
				disableIntervalMomentum
				showsVerticalScrollIndicator={false}
				className="relative w-full flex-1"
				style={{ flex: 1, width: "100%" }}
				contentContainerStyle={{
					paddingBottom: insets.bottom + 32,
				}}
				refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
			/>
		</View>
	);
}
interface FeedItemProps extends FeedItemData {
	height: number;
	style?: StyleProp<any>;
}

function FeedItem({ author, address, imageUrl, height, style }: FeedItemProps) {
	const [isReported, setIsReported] = useState(false);

	const handleShare = () => {
		Share.share({
			message: `Confira esse relato de foco de lixo encontrado por ${author} em ${address}: ${imageUrl}`,
		});
	};

	return (
		<View className="relative w-full overflow-hidden" style={{ height }}>
			<Image
				source={imageUrl}
				contentFit="cover"
				transition={250}
				className="h-full w-full"
			/>

			<View className="absolute right-0 bottom-60 flex flex-col items-center justify-start gap-4 px-5">
				<FeedButton
					icon={isReported ? FlagCheckFilledIcon : FlagCheckIcon}
					onPress={() => setIsReported(!isReported)}
				/>
				<FeedButton
					icon={ShareIcon}
					onPress={handleShare}
					springConfig={{ damping: 100, stiffness: 800 }}
				/>
			</View>

			{/* <View className="absolute bottom-0 left-0 z-50 ">
				
			</View> */}

			<Animated.View
				className="bg-primary-400 absolute bottom-0 left-0 z-60 flex h-48 w-full flex-row items-start rounded-tl-2xl rounded-tr-2xl px-5"
				style={style}
			>
				<View className="mt-4 flex flex-col items-start justify-start gap-1">
					<Text className="text-lg font-bold text-white">{author}</Text>
					<View className="flex flex-row items-center justify-center gap-2">
						<PinIcon width={16} height={16} fill="#FFFFFF" />
						<Text className="text-base font-medium text-white">{address}</Text>
					</View>
				</View>
			</Animated.View>
		</View>
	);
}
