import BottomSheet, { BottomSheetProps, BottomSheetView } from "@gorhom/bottom-sheet";
import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import React, { forwardRef, useMemo } from "react";
import { StyleProp, Text, ViewStyle } from "react-native";

interface AccountSheetProps extends Omit<BottomSheetProps, "children"> {
	className?: string;
	contentStyle?: StyleProp<ViewStyle>;
	children?: React.ReactNode;
}

const AccountSheetComponent = (
	{
		className,
		contentStyle,
		children,
		snapPoints,
		index = -1,
		// onChange,
		...rest
	}: AccountSheetProps,
	ref: React.Ref<BottomSheetMethods>
) => {
	/* const handleSheetChanges = useCallback(
		(nextIndex: number) => {
			console.log("handleSheetChanges", nextIndex);
			onChange?.(nextIndex);
		},
		[onChange]
	); */

	// BottomSheet requires snap points, so provide sensible defaults when not supplied.
	const sheetSnapPoints = useMemo(() => snapPoints ?? ["35%", "60%"], [snapPoints]);

	return (
		<BottomSheet
			ref={ref}
			index={index}
			snapPoints={sheetSnapPoints}
			// onChange={handleSheetChanges}
			{...rest}
		>
			<BottomSheetView className={className} style={contentStyle}>
				{children ?? <Text>Awesome 🎉</Text>}
			</BottomSheetView>
		</BottomSheet>
	);
};

export const AccountSheet = forwardRef<BottomSheetMethods, AccountSheetProps>(
	AccountSheetComponent
);

AccountSheet.displayName = "AccountSheet";
