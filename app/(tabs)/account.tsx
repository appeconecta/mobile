import { useStatusBarStyle } from "@/hooks/use-status-bar-style";
import { Pressable, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// Components
import { Image } from "@/components/ui/image";

// Icons
import AnalyticsIcon from "@/assets/icons/analytics.svg";
import DehazeIcon from "@/assets/icons/dehaze.svg";
import GridViewIcon from "@/assets/icons/grid_view.svg";
import { cn } from "@/lib/utils";
import { styled } from "nativewind";
import { useState } from "react";

const StyledDehazeIcon = styled(DehazeIcon);
const StyledAnalyticsIcon = styled(AnalyticsIcon);
const StyledGridViewIcon = styled(GridViewIcon);

export default function Account() {
	const insets = useSafeAreaInsets();
	useStatusBarStyle("dark");

	const [currentSection, setCurrentSection] = useState<"posts" | "analytics">("analytics");

	return (
		<View
			className="bg-bg-200 flex flex-1 items-center justify-start"
			style={{
				paddingTop: insets.top + 24,
				paddingBottom: insets.bottom + 16,
			}}
		>
			{/* Header */}
			<View className="flex w-full gap-7 shadow-2xl">
				<View className="flex w-full flex-row items-center justify-between px-5">
					<View className="w-5" />
					<Text className="text-primary-600 text-xl font-bold">Fulano da Silva</Text>
					<Pressable
						android_ripple={{
							radius: 24,
							foreground: true,
							color: "rgba(0, 0, 0, 0.5)",
						}}
					>
						<StyledDehazeIcon className="fill-primary-600" width={20} height={20} />
					</Pressable>
				</View>

				<View className="flex flex-col items-center justify-center gap-3">
					<Image
						source={"https://i.imgur.com/5Hsj4tJ.jpeg"}
						contentFit="cover"
						transition={1000}
						className="h-24 w-24 rounded-full"
					/>
					<Text className="text-primary-600 text-lg font-bold">@theduardomaciel</Text>
				</View>

				<View className="flex w-full flex-row items-center justify-evenly">
					<View className="flex flex-col items-center justify-center gap-1">
						<Text className="text-primary-600 text-2xl font-black">115</Text>
						<Text className="text-primary-300 text-sm font-medium">Relatórios</Text>
					</View>
					<View className="flex flex-col items-center justify-center gap-1">
						<Text className="text-primary-600 text-2xl font-black">45</Text>
						<Text className="text-primary-300 text-sm font-medium">Confirmações</Text>
					</View>
					<View className="flex flex-col items-center justify-center gap-1">
						<Text className="text-primary-600 text-2xl font-black">24</Text>
						<Text className="text-primary-300 text-sm font-medium">Comentários</Text>
					</View>
				</View>

				<View className="flex w-full flex-row items-center justify-evenly">
					<TouchableOpacity
						activeOpacity={0.8}
						className={cn(
							"border-primary-300 flex-1 flex-row items-center justify-center gap-2 border-b-0 px-4 py-4",
							{
								"border-b-2": currentSection === "posts",
							}
						)}
						onPress={() => {
							setCurrentSection("posts");
						}}
					>
						<StyledGridViewIcon className="fill-primary-300" width={20} height={20} />
					</TouchableOpacity>
					<TouchableOpacity
						activeOpacity={0.8}
						className={cn(
							"border-primary-300 flex-1 flex-row items-center justify-center gap-2 border-b-0 px-4 py-4",
							{
								"border-b-2": currentSection === "analytics",
							}
						)}
						onPress={() => {
							setCurrentSection("analytics");
						}}
					>
						<StyledAnalyticsIcon className="fill-primary-300" width={20} height={20} />
					</TouchableOpacity>
				</View>
			</View>
		</View>
	);
}
