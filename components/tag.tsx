import { Text, TouchableOpacity } from "react-native";
import Animated, { LinearTransition, ZoomIn, ZoomOut } from "react-native-reanimated";

import CloseSmallIcon from "@/assets/icons/close_small.svg";

interface TagProps {
	name: string;
	selected?: boolean;
	onPress?: () => void;
}

export function Tag({ name, selected = false, onPress }: TagProps) {
	const bgClass = selected ? "bg-primary-600" : "bg-primary-300";

	// Animations are GPU-accelerated and avoid layout thrashing.
	// We only animate opacity + scale on mount/unmount for best performance.

	const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

	return (
		<AnimatedTouchableOpacity
			// Animate the pill width/size directly for precise layout transitions
			layout={LinearTransition.duration(50).springify().stiffness(1000)}
			activeOpacity={0.8}
			className={`${bgClass} flex-row items-center justify-center rounded-full px-4 py-2 transition-colors`}
			onPress={onPress}
		>
			<Text className={`text-base font-bold text-white`}>{name}</Text>
			{selected && (
				<Animated.View
					// Keep spacing static to avoid expensive reflows
					className="ml-2"
					entering={ZoomIn.duration(100).springify().stiffness(1000)}
					exiting={ZoomOut.duration(100).springify().stiffness(1000)}
				>
					<CloseSmallIcon width={18} height={18} fill={"white"} />
				</Animated.View>
			)}
		</AnimatedTouchableOpacity>
	);
}
