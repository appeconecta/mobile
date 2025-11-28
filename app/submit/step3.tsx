import { Link } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// Components
import { TagGroup } from "@/components/tag-group";

// Data
import { CATEGORIES } from "@/constants/category";
import { useState } from "react";

export default function SubmitFormStep3() {
	const insets = useSafeAreaInsets();
	const [selectedTags, setSelectedTags] = useState<string[]>([]);

	return (
		<View
			className="flex flex-1 items-start justify-start"
			style={{
				paddingBottom: insets.bottom + 10,
			}}
		>
			<ScrollView
				className="mt-4 flex w-full flex-1 flex-col gap-4"
				contentContainerClassName="pb-4 gap-4"
			>
				{/* <Text className="mt-4 pl-5 text-[24px] font-bold text-[#103218]">
					Quais tipos de lixo estão presentes no foco de poluição?
				</Text> */}
				{CATEGORIES.map((category) => (
					<View key={category.id} className="flex w-full flex-col gap-2">
						<Text className="text-primary-600 pl-5 text-lg font-medium">
							{category.name}
						</Text>
						<TagGroup
							className="pl-5"
							tags={category.tags}
							selected={selectedTags}
							onSelect={(selected) => {
								console.log("Selected tags for category", category.id, selected);
								setSelectedTags(selected);
							}}
							unique={false}
						/>
					</View>
				))}
			</ScrollView>
			<View className="w-full px-5">
				<Link href="/submit/step4" asChild>
					<TouchableOpacity className="bg-primary-400 w-full items-center justify-center rounded-lg px-9 py-3">
						<Text className="text-center text-lg font-medium text-white">
							Próximo passo
						</Text>
					</TouchableOpacity>
				</Link>
			</View>
		</View>
	);
}
