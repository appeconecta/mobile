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

	return (
		<Animated.View
			// Smoothly animates width/size changes when icon appears/disappears
			layout={LinearTransition.duration(160)}
		>
			<TouchableOpacity
				activeOpacity={0.8}
				className={`${bgClass} flex-row items-center justify-center rounded-full px-4 py-2 transition-colors`}
				onPress={onPress}
			>
				<Text className={`text-base font-bold text-white`}>{name}</Text>
				{selected && (
					<Animated.View
						// Keep spacing static to avoid expensive reflows
						className="ml-2"
						entering={ZoomIn.duration(140).springify().damping(18).stiffness(220)}
						exiting={ZoomOut.duration(120).springify().damping(16).stiffness(200)}
					>
						<CloseSmallIcon width={18} height={18} fill={"white"} />
					</Animated.View>
				)}
			</TouchableOpacity>
		</Animated.View>
	);
}
