import { LinearGradient } from "expo-linear-gradient";

export function Background() {
	return (
		<LinearGradient
			// Background Linear Gradient
			colors={["#F6F7EB", "#F3F7F4"]}
			className="absolute top-0 right-0 left-0 flex-1"
		/>
	);
}
