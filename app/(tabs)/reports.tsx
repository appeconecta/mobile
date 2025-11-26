import { Image } from "@/components/ui/image";
import { usePathname } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { Text, View } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const INITIAL_POSITION = 175;
const SELECTED_POSITION = 0;

export default function Reports() {
	const insets = useSafeAreaInsets();

	const isSelected = usePathname() === "/reports";
	const position = useSharedValue(isSelected ? SELECTED_POSITION : INITIAL_POSITION);

	useEffect(() => {
		if (isSelected) {
			position.value = withSpring(SELECTED_POSITION, {
				damping: 12,
				stiffness: 100,
				mass: 0.6,
				velocity: 20,
			});
		} else {
			position.value = withSpring(INITIAL_POSITION, {
				damping: 12,
				stiffness: 100,
				mass: 0.6,
				velocity: -20,
			});
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

	return (
		<>
			<View
				className="bg-bg-200 flex flex-1 items-start justify-start"
				style={{
					paddingBottom: insets.bottom + 16,
				}}
			>
				<View className="w-full bg-black" style={{ height: insets.top }} />
				<Image
					source={"https://i.imgur.com/5Hsj4tJ.jpeg"}
					contentFit="cover"
					transition={1000}
					className="h-full w-full"
				/>

				<View className="absolute bottom-48 left-0 z-50 flex flex-row items-center px-5">
					<View className="flex flex-col items-start justify-start gap-2">
						<Text className="text-lg font-bold text-white">@fulaninho</Text>
						<View className="flex flex-row items-center justify-start gap-2">
							<Text className="text-base font-medium text-white">
								1672 R. Al. da Paz, Maceió, Alagoas
							</Text>
						</View>
					</View>
				</View>
				<Animated.View
					className="bg-primary-400 rounded-tl-2x absolute bottom-0 left-0 h-72 w-full rounded-tr-2xl"
					style={animatedStyle}
				/>
			</View>
			<StatusBar style="light" />
		</>
	);
}
