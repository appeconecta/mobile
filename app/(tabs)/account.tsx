import { useStatusBarStyle } from "@/hooks/use-status-bar-style";
import { Dimensions, Pressable, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// Components
import { Image } from "@/components/ui/image";

// Icons
import AnalyticsIcon from "@/assets/icons/analytics.svg";
import DehazeIcon from "@/assets/icons/dehaze.svg";
import GridViewIcon from "@/assets/icons/grid_view.svg";
import { cn } from "@/lib/utils";
import { styled } from "nativewind";
import { useEffect, useState } from "react";
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";

const StyledDehazeIcon = styled(DehazeIcon);
const StyledAnalyticsIcon = styled(AnalyticsIcon);
const StyledGridViewIcon = styled(GridViewIcon);

const springConfig = {
	damping: 12,
	stiffness: 100,
	mass: 0.6,
	velocity: 20,
};

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

const BAR_WIDTH = SCREEN_WIDTH / 5;
const POSTS_POSITION = SCREEN_WIDTH / 4 - BAR_WIDTH / 2;
const ANALYTICS_POSITION = (3 * SCREEN_WIDTH) / 4 - BAR_WIDTH / 2;

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

	return (
		<View className="bg-bg-300 flex flex-1 items-center justify-start">
			{/* Header */}
			<View
				className="bg-bg-200 flex w-full gap-7 shadow-2xl"
				style={{
					paddingTop: insets.top + 24,
				}}
			>
				<View className="flex w-full flex-row items-center justify-between px-5">
					<View className="w-5" />
					<Text className="text-primary-600 text-xl font-bold">Fulano da Silva</Text>
					<Pressable
						android_ripple={{
							radius: 24,
							foreground: true,
							color: "rgba(0, 0, 0, 0.5)",
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
						<Text className="text-primary-300 text-sm font-medium">Confirmações</Text>
					</View>
					<View className="flex flex-col items-center justify-center gap-1">
						<Text className="text-primary-600 text-2xl font-black">24</Text>
						<Text className="text-primary-300 text-sm font-medium">Comentários</Text>
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
							setCurrentSection("posts");
						}}
					>
						<StyledGridViewIcon className="fill-primary-300" width={24} height={24} />
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
							setCurrentSection("analytics");
						}}
					>
						<StyledAnalyticsIcon className="fill-primary-300" width={24} height={24} />
					</TouchableOpacity>

					<Animated.View
						className="bg-primary-300 absolute bottom-0 left-0 h-0.5 -translate-x-1/2 rounded-full"
						style={[animatedStyle, { width: BAR_WIDTH }]}
					></Animated.View>
				</View>
			</View>
		</View>
	);
}
