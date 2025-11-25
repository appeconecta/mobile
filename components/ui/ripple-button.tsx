import { Platform, Pressable, PressableProps, StyleProp, ViewStyle } from "react-native";

interface RippleButtonProps extends PressableProps {
	onPress?: () => void;
	activeOpacity?: number;
	style?: StyleProp<ViewStyle>;
	children: React.ReactNode;
}

export function RippleButton({ children, activeOpacity = 0.6, style, ...rest }: RippleButtonProps) {
	return (
		<Pressable
			android_ripple={{
				color: "rgba(0,0,0,0.08)",
				foreground: true,
			}}
			style={({ pressed }) => [
				Platform.OS === "ios" && { opacity: pressed ? activeOpacity : 1 },
				style,
			]}
			{...rest}
		>
			{children}
		</Pressable>
	);
}
