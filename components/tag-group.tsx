import { ScrollView } from "react-native";

import { Tag } from "./tag";

interface TagItem {
	id: string;
	name: string;
}

interface TagGroupProps {
	tags: TagItem[];
	selected: string[];
	onSelect: (selected: string[]) => void;
	unique?: boolean;
}

export function TagGroup({ tags, selected, onSelect, unique = false }: TagGroupProps) {
	const handlePress = (id: string) => {
		if (unique) {
			onSelect(selected.includes(id) ? [] : [id]);
		} else {
			if (selected.includes(id)) {
				onSelect(selected.filter((s) => s !== id));
			} else {
				onSelect([...selected, id]);
			}
		}
	};

	return (
		<ScrollView
			horizontal
			showsHorizontalScrollIndicator={false}
			className="w-full flex-1"
			contentContainerClassName="flex-row items-center justify-start gap-2 pr-5"
		>
			{tags.map((tag) => (
				<Tag
					key={tag.id}
					name={tag.name}
					selected={selected.includes(tag.id)}
					onPress={() => handlePress(tag.id)}
				/>
			))}
		</ScrollView>
	);
}
