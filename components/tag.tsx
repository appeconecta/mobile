import { Text, TouchableOpacity, View } from "react-native";
import Animated, { LinearTransition, ZoomIn, ZoomOut } from "react-native-reanimated";

import CloseSmallIcon from "@/assets/icons/close_small.svg";
import { cn } from "@/lib/utils";

interface TagProps {
	name: string;
	selected?: boolean;
	onPress?: () => void;
	isDisabled?: boolean;
	multiSelect?: boolean; // When true, show plus icon when not selected
}

export function Tag({
	name,
	selected = false,
	onPress,
	isDisabled,
	multiSelect = false,
}: TagProps) {
	const bgClass = selected ? "bg-primary-600" : "bg-primary-300";

	// Animations are GPU-accelerated and avoid layout thrashing.
	// We only animate opacity + scale on mount/unmount for best performance.

	const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

	const Component = onPress ? AnimatedTouchableOpacity : View;

	return (
		<Component
			layout={LinearTransition.duration(70).springify().stiffness(900)}
			activeOpacity={0.9}
			className={cn(
				"flex-row items-center justify-center rounded-full px-4 py-2 transition-colors",
				bgClass,
				{
					"bg-gray-400 opacity-60": isDisabled,
				}
			)}
			disabled={isDisabled}
			onPress={onPress}
		>
			<Text className={`text-base font-bold text-white`}>{name}</Text>
			{multiSelect && !selected && (
				<Animated.View
					className="ml-2"
					entering={ZoomIn.duration(80).springify().stiffness(900)}
					exiting={ZoomOut.duration(60).springify().stiffness(800)}
				>
					{/* Lightweight plus icon (two bars) */}
					<Animated.View
						style={{
							width: 18,
							height: 18,
							alignItems: "center",
							justifyContent: "center",
						}}
					>
						<View
							style={{
								position: "absolute",
								width: 12,
								height: 2,
								backgroundColor: "white",
								borderRadius: 1,
							}}
						/>
						<View
							style={{
								position: "absolute",
								width: 12,
								height: 2,
								backgroundColor: "white",
								borderRadius: 1,
								transform: [{ rotate: "90deg" }],
							}}
						/>
					</Animated.View>
				</Animated.View>
			)}
			{selected && (
				<Animated.View
					className="ml-2"
					entering={ZoomIn.duration(100).springify().stiffness(1000)}
					exiting={ZoomOut.duration(80).springify().stiffness(900)}
				>
					<CloseSmallIcon width={18} height={18} fill={"white"} />
				</Animated.View>
			)}
		</Component>
	);
}
