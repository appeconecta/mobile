import { styled } from "nativewind";
import { Dimensions, Text, View } from "react-native";
import Animated from "react-native-reanimated";

import PhoneIcon from "@/assets/icons/phone.svg";
import TrashIcon from "@/assets/icons/trash.svg";
import Triangle from "@/assets/illustrations/triangle.svg";
import { cn } from "@/lib/utils";

const StyledPhoneIcon = styled(PhoneIcon);
const StyledTrashIcon = styled(TrashIcon);
const StyledTriangle = styled(Triangle);

interface CalloutProps {
	className?: string;
	title: string;
	distance: string;
	phoneNumber?: string;
	confirmationsCount?: number;
	entering?: any;
	exiting?: any;
}

const { width: SCREEN_WIDTH } = Dimensions.get("window");

export function Callout({
	className,
	title,
	distance,
	phoneNumber,
	confirmationsCount,
	entering,
	exiting,
}: CalloutProps) {
	if (!phoneNumber && !confirmationsCount) {
		return null;
	}

	return (
		<Animated.View
			className="absolute bottom-120 left-1/2 h-22 -translate-x-1/2"
			entering={entering}
			exiting={exiting}
		>
			<StyledTriangle className="fill-primary-300 absolute -bottom-2 left-1/2 h-6 w-8 -translate-x-1/2 shadow-md" />
			<View
				className={cn(
					"border-b-primary-400 bg-bg-100 gap-2 rounded-md border-b-3 px-4 py-3 shadow-md",
					className
				)}
				style={{ width: SCREEN_WIDTH / 1.5 }}
			>
				<Text className="text-primary-600 text-lg font-medium">{title}</Text>
				<View className="flex w-full flex-row items-center justify-between">
					<View className="flex flex-row items-center justify-center gap-1">
						{phoneNumber ? (
							<StyledPhoneIcon width={16} height={16} className="fill-primary-600" />
						) : (
							<StyledTrashIcon width={16} height={16} className="fill-primary-600" />
						)}
						<Text className="text-primary-600 text-sm font-medium">
							{phoneNumber ? phoneNumber : `${confirmationsCount} confirmações`}
						</Text>
					</View>

					<Text className="text-primary-200 text-sm font-medium">{distance}</Text>
				</View>
			</View>
		</Animated.View>
	);
}
