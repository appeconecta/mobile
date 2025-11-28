import { View } from "react-native";

interface TabListProps {
	children?: React.ReactNode;
}

export function AppTabList({ children }: TabListProps) {
	return (
		<View className="bg-primary-400 absolute bottom-0 z-50 flex h-20 w-full flex-row items-end justify-center gap-1 rounded-tl-2xl rounded-tr-2xl px-4">
			{children}
		</View>
	);
}
