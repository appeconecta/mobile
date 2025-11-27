import { styled } from "nativewind";
import { Text, TouchableOpacity, View } from "react-native";

import CloseSmallIcon from "@/assets/icons/close_small.svg";
const StyledCloseSmallIcon = styled(CloseSmallIcon);

interface TagProps {
	name: string;
	selected?: boolean;
	onPress?: () => void;
	onClose?: () => void;
}

export function Tag({ name, selected = false, onPress, onClose }: TagProps) {
	const isButton = !!onPress;
	const Component = isButton ? TouchableOpacity : View;
	const bgClass = selected ? "bg-primary-600" : "bg-gray-200";
	const textClass = selected ? "text-white" : "text-black";
	const iconFill = selected ? "fill-white" : "fill-black";

	return (
		<Component
			className={`${bgClass} flex-row items-center justify-center gap-2 rounded-full px-4 py-2`}
			onPress={onPress}
		>
			<Text className={`text-base font-bold ${textClass}`}>{name}</Text>
			{selected && (
				<TouchableOpacity onPress={onClose}>
					<StyledCloseSmallIcon width={18} height={18} className={iconFill} />
				</TouchableOpacity>
			)}
		</Component>
	);
}
