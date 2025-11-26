import { styled } from "nativewind";
import { Text, View } from "react-native";

import CloseSmallIcon from "@/assets/icons/close_small.svg";
const StyledCloseSmallIcon = styled(CloseSmallIcon);

interface TagProps {
	name: string;
}

export function Tag({ name }: TagProps) {
	return (
		<View className="bg-primary-600 flex-row items-center justify-center gap-2 rounded-full px-4 py-2">
			<Text className="text-base font-bold text-white">{name}</Text>
			<StyledCloseSmallIcon width={18} height={18} className="fill-white" />
		</View>
	);
}
