import { LinearGradient } from "@/components/ui/linear-gradient";

export function Background({ children }: { children?: React.ReactNode }) {
	return (
		<LinearGradient
			// Background Linear Gradient
			colors={["#F6F7EB", "#F3F7F4", "red"]}
			className="absolute top-0 right-0 left-0 h-full w-full"
		>
			{children}
		</LinearGradient>
	);
}
