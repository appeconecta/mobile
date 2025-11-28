import { Text, View } from "react-native";

import PhoneIcon from "@/assets/icons/phone.svg";
import TrashIcon from "@/assets/icons/trash.svg";

interface CalloutProps {
	title: string;
	distance: string;
	phoneNumber?: string;
	confirmationsCount?: number;
}

export function Callout({ title, distance, phoneNumber, confirmationsCount }: CalloutProps) {
	if (!phoneNumber && !confirmationsCount) {
		return null;
	}

	return (
		<View className="gap-2 rounded-md bg-white px-4 py-3 shadow-md">
			<Text className="text-primary-600 text-lg font-medium">{title}</Text>
			<View className="flex w-full flex-row items-center justify-between">
				<View className="flex flex-row items-center justify-start gap-2">
					{phoneNumber ? (
						<PhoneIcon width={16} height={16} />
					) : (
						<TrashIcon width={16} height={16} />
					)}
					<Text className="mb-1 text-sm text-gray-600">
						{phoneNumber ? phoneNumber : `${confirmationsCount} confirmações`}
					</Text>
				</View>
			</View>
		</View>
	);
}
