import { GestureResponderEvent, Pressable, PressableProps } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";
import { SvgProps } from "react-native-svg";

interface FeedButtonProps extends PressableProps {
	icon: React.ComponentType<SvgProps>;
	springConfig?: {
		damping: number;
		stiffness: number;
	};
	// damping controls how quickly oscillations settle, stiffness controls how fast the scale responds
}

export function FeedButton({
	icon: Icon,
	onPressIn,
	onPressOut,
	springConfig = { damping: 30, stiffness: 500 },
	...rest
}: FeedButtonProps) {
	const scale = useSharedValue(1);

	const handlePressIn = (event: GestureResponderEvent) => {
		scale.value = withSpring(0.8, springConfig);
		onPressIn?.(event);
	};

	const handlePressOut = (event: GestureResponderEvent) => {
		scale.value = withSpring(1, springConfig);
		onPressOut?.(event);
	};

	const animatedStyle = useAnimatedStyle(() => ({
		transform: [{ scale: scale.value }],
	}));

	return (
		<Pressable
			{...rest}
			onPressIn={handlePressIn}
			onPressOut={handlePressOut}
			className="bg-primary-600/50 h-18 w-18 rounded-full p-2"
		>
			<Animated.View
				className="bg-primary-600 flex h-full w-full items-center justify-center rounded-full"
				style={animatedStyle}
			>
				<Icon width={24} height={24} fill="#FFFFFF" />
			</Animated.View>
		</Pressable>
	);
}
