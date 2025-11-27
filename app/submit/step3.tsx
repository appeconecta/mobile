import { FlashList } from "@shopify/flash-list";
import { Link } from "expo-router";
import { useCallback, useRef, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { TagGroup } from "@/components/tag-group";
import { CATEGORIES } from "@/constants/category";

type Category = (typeof CATEGORIES)[number];

const CategorySeparator = () => <View className="h-4" />;

const arraysShallowEqual = (left: string[], right: string[]) => {
	if (left.length !== right.length) {
		return false;
	}

	for (let index = 0; index < left.length; index += 1) {
		if (left[index] !== right[index]) {
			return false;
		}
	}

	return true;
};

export default function SubmitFormStep3() {
	const insets = useSafeAreaInsets();
	const [selectedTagsByCategory, setSelectedTagsByCategory] = useState<Record<string, string[]>>(
		{}
	);
	const selectHandlersRef = useRef<Record<string, (selection: string[]) => void>>({});

	const handleCategorySelect = useCallback((categoryId: string, selection: string[]) => {
		setSelectedTagsByCategory((prev) => {
			const previousSelection = prev[categoryId] ?? [];
			if (arraysShallowEqual(previousSelection, selection)) {
				return prev;
			}

			return {
				...prev,
				[categoryId]: selection,
			};
		});
	}, []);

	const getCategorySelectHandler = useCallback(
		(categoryId: string) => {
			if (!selectHandlersRef.current[categoryId]) {
				selectHandlersRef.current[categoryId] = (selection: string[]) =>
					handleCategorySelect(categoryId, selection);
			}

			return selectHandlersRef.current[categoryId];
		},
		[handleCategorySelect]
	);

	const renderCategory = useCallback(
		({ item }: { item: Category }) => {
			const selected = selectedTagsByCategory[item.id] ?? [];
			return (
				<View className="flex w-full flex-col gap-2">
					<Text className="text-primary-600 pl-5 text-lg font-medium">{item.name}</Text>
					<TagGroup
						className="pl-5"
						tags={item.tags}
						selected={selected}
						onSelect={getCategorySelectHandler(item.id)}
					/>
				</View>
			);
		},
		[getCategorySelectHandler, selectedTagsByCategory]
	);

	const keyExtractor = useCallback((item: Category) => item.id, []);

	return (
		<View
			className="flex flex-1 items-start justify-start"
			style={{
				paddingBottom: insets.bottom + 10,
			}}
		>
			<FlashList
				data={CATEGORIES}
				extraData={selectedTagsByCategory}
				renderItem={renderCategory}
				keyExtractor={keyExtractor}
				ItemSeparatorComponent={CategorySeparator}
				showsVerticalScrollIndicator={false}
				className="relative w-full flex-1"
				style={{ flex: 1, width: "100%" }}
				contentContainerStyle={{
					paddingTop: 20,
					paddingBottom: insets.bottom,
				}}
			/>
			<View className="w-full px-5">
				<Link href="/submit/step4" asChild>
					<TouchableOpacity className="bg-primary-400 mt-auto w-full items-center justify-center rounded-lg px-9 py-3">
						<Text className="text-center text-lg font-medium text-white">
							Próximo passo
						</Text>
					</TouchableOpacity>
				</Link>
			</View>
		</View>
	);
}
