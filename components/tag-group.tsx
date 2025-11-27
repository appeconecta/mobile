import { FlashList, ListRenderItem } from "@shopify/flash-list";
import { memo, useCallback, useMemo } from "react";
import { StyleSheet, View } from "react-native";

import { cn } from "@/lib/utils";
import { Tag } from "./tag";

interface TagItem {
	id: string;
	name: string;
}

interface TagGroupProps {
	className?: string;
	tags: TagItem[];
	selected: string[];
	onSelect: (selected: string[]) => void;
	unique?: boolean;
}

function TagGroupComponent({ className, tags, selected, onSelect, unique = false }: TagGroupProps) {
	const selectedSet = useMemo(() => new Set(selected), [selected]);

	const handlePress = useCallback(
		(id: string) => {
			if (unique) {
				onSelect(selectedSet.has(id) ? [] : [id]);
				return;
			}

			if (selectedSet.has(id)) {
				onSelect(selected.filter((value) => value !== id));
			} else {
				onSelect([...selected, id]);
			}
		},
		[selected, selectedSet, unique, onSelect]
	);

	const renderTag = useCallback<ListRenderItem<TagItem>>(
		({ item }) => (
			<Tag
				name={item.name}
				selected={selectedSet.has(item.id)}
				onPress={() => handlePress(item.id)}
			/>
		),
		[handlePress, selectedSet]
	);

	const keyExtractor = useCallback((item: TagItem) => item.id, []);

	return (
		<View className={cn("w-full", className)}>
			<FlashList
				data={tags}
				extraData={selected}
				horizontal
				showsHorizontalScrollIndicator={false}
				keyExtractor={keyExtractor}
				renderItem={renderTag}
				ItemSeparatorComponent={HorizontalSeparator}
				contentContainerStyle={styles.contentContainer}
				style={styles.list}
				// @ts-expect-error FlashList 2.0 types miss this prop but runtime requires it for horizontal lists.
				estimatedItemSize={ESTIMATED_TAG_WIDTH}
			/>
		</View>
	);
}

const HorizontalSeparator = () => <View style={styles.separator} />;

const ESTIMATED_TAG_WIDTH = 120;

function arraysShallowEqual(a: string[], b: string[]) {
	if (a.length !== b.length) {
		return false;
	}

	for (let index = 0; index < a.length; index += 1) {
		if (a[index] !== b[index]) {
			return false;
		}
	}

	return true;
}

export const TagGroup = memo(TagGroupComponent, (prev, next) => {
	return (
		prev.className === next.className &&
		prev.onSelect === next.onSelect &&
		prev.unique === next.unique &&
		prev.tags === next.tags &&
		arraysShallowEqual(prev.selected, next.selected)
	);
});

TagGroup.displayName = "TagGroup";

const styles = StyleSheet.create({
	separator: {
		width: 8,
	},
	contentContainer: {
		paddingRight: 20,
		alignItems: "center",
	},
	list: {
		width: "100%",
		minHeight: 44,
	},
});
