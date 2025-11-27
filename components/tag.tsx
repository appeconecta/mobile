import { Text, TouchableOpacity, View } from "react-native";

import CloseSmallIcon from "@/assets/icons/close_small.svg";

interface TagProps {
	name: string;
	selected?: boolean;
	onPress?: () => void;
}

export function Tag({ name, selected = false, onPress }: TagProps) {
	const bgClass = selected ? "bg-primary-600" : "bg-primary-300";

	/* const scale = useSharedValue(selected ? 1 : 0);

	useEffect(() => {
		if (selected) {
			scale.value = withSpring(1, { stiffness: 500 });
		} else {
			scale.value = withSpring(0, { stiffness: 500 });
		}
	}, [selected]);

	const animatedStyle = useAnimatedStyle(() => {
		const width = interpolate(scale.value, [0, 1], [0, 18]);
		const marginLeft = interpolate(scale.value, [0, 1], [0, 8]);
		const opacity = scale.value;
		return {
			width,
			marginLeft,
			opacity,
			transform: [{ scale: scale.value }],
		};
	}); */

	return (
		<TouchableOpacity
			activeOpacity={0.8}
			className={`${bgClass} flex-row items-center justify-center rounded-full px-4 py-2 transition-colors`}
			onPress={onPress}
		>
			<Text className={`text-base font-bold text-white`}>{name}</Text>
			{selected && (
				<View /* style={animatedStyle} */>
					<CloseSmallIcon width={18} height={18} fill={"white"} />
				</View>
			)}
		</TouchableOpacity>
	);
}
