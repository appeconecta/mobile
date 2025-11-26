import { Image } from "@/components/ui/image";
import { usePathname } from "expo-router";
import { useEffect } from "react";
import { Text, View } from "react-native";
import Animated, {
	useAnimatedStyle,
	useSharedValue,
	withSpring,
	withTiming,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// Icons
import FlagCheckIcon from "@/assets/icons/flag_check.svg";
import PinIcon from "@/assets/icons/pin.svg";
import ShareIcon from "@/assets/icons/share.svg";

// Components
import { FeedButton } from "@/components/feed-button";
import { useStatusBarStyle } from "@/hooks/use-status-bar-style";

const INITIAL_POSITION = 165;
const SELECTED_POSITION = 0;

const springConfig = {
	damping: 12,
	stiffness: 100,
	mass: 0.6,
	velocity: 20,
};

export default function Reports() {
	const insets = useSafeAreaInsets();
	useStatusBarStyle("light");

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

	const animatedStyle = useAnimatedStyle(() => {
		return {
			transform: [
				{
					translateY: position.value,
				},
			],
		};
	});

	const animatedOpacityStyle = useAnimatedStyle(() => {
		return {
			opacity: opacity.value,
		};
	});

	return (
		<View
			className="flex flex-1 items-start justify-start bg-black"
			style={{
				paddingBottom: insets.bottom + 16,
			}}
		>
			<View className="w-full bg-black" style={{ height: insets.top }} />
			<Image
				source={"https://i.imgur.com/5Hsj4tJ.jpeg"}
				contentFit="cover"
				transition={250}
				className="h-full w-full"
			/>

			<View className="absolute right-0 bottom-80 flex flex-col items-center justify-start gap-4 px-5">
				<FeedButton icon={FlagCheckIcon} />
				<FeedButton icon={ShareIcon} />
			</View>

			<Animated.View
				className="absolute bottom-49 left-0 z-50 flex flex-row items-center px-5"
				style={animatedOpacityStyle}
			>
				<View className="flex flex-col items-start justify-start gap-1">
					<Text className="text-lg font-bold text-white">@fulaninho</Text>
					<View className="flex flex-row items-center justify-center gap-2">
						<PinIcon width={16} height={16} fill="#FFFFFF" />
						<Text className="text-base font-medium text-white">
							1672 R. Al. da Paz, Maceió, Alagoas
						</Text>
					</View>
				</View>
			</Animated.View>
			<Animated.View
				className="bg-primary-400 absolute bottom-0 left-0 h-68 w-full rounded-tl-2xl rounded-tr-2xl"
				style={animatedStyle}
			/>
		</View>
	);
}
