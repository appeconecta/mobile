import { Pressable, Text } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { TabTriggerSlotProps } from "expo-router/ui";
import { styled } from "nativewind";

import { useEffect } from "react";
import { SvgProps } from "react-native-svg";

import TrashBinTop from "@/assets/illustrations/trashbin-top.svg";
import { cn } from "@/lib/utils";

interface TabButtonProps extends TabTriggerSlotProps {
	title: string;
	icon: React.ComponentType<SvgProps>;
	isSelected?: boolean;
}

const StyledTrashBinTop = styled(TrashBinTop, {
	className: { target: "style" },
});

export function TabButton({
	title,
	icon: Icon,
	className,
	isSelected,
	style,
	...rest
}: TabButtonProps) {
	const insets = useSafeAreaInsets();
	const position = useSharedValue(isSelected ? 0 : 20);

	useEffect(() => {
		if (isSelected) {
			position.value = withSpring(0, {
				damping: 12,
				stiffness: 100,
				mass: 0.6,
				velocity: 20,
			});
		} else {
			position.value = withSpring(20, {
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
		<Pressable className="h-36 flex-1" {...rest}>
			<Animated.View
				className={cn(
					"bg-primary-600 flex-1 items-center justify-center rounded-tl-lg rounded-tr-lg",
					className
				)}
				style={[{ paddingBottom: insets.bottom }, animatedStyle]}
			>
				<Text className="text-sm font-medium text-white">{title}</Text>
				<Icon
					width={36}
					height={36}
					fill="white"
					style={{ marginTop: 4, marginBlock: 16 }}
				/>
				<StyledTrashBinTop className="fill-primary-600 absolute -top-6.5 left-1/2 h-6 w-full -translate-x-1/2" />
			</Animated.View>
		</Pressable>
	);
}
