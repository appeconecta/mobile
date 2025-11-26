import { ColorValue, View } from "react-native";

import { cn } from "@/lib/utils";

// Components
import { LinearGradient } from "@/components/ui/linear-gradient";

interface CardProps extends React.ComponentProps<typeof View> {
	colors?: readonly [ColorValue, ColorValue, ...ColorValue[]];
}

export function Card({ className, children, colors }: CardProps) {
	return (
		<LinearGradient
			colors={colors ? colors : ["#4F9D69", "#7FB883"]}
			className={cn(
				"relative flex items-start justify-start rounded-xl px-5 py-4",
				className
			)}
			start={{ x: 0, y: 0.5 }}
			end={{ x: 1, y: 0.5 }}
		>
			{children}
		</LinearGradient>
	);
}
