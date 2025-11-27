import { BottomSheetModal, BottomSheetModalProps, BottomSheetView } from "@gorhom/bottom-sheet";
import { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import React, { forwardRef, useMemo } from "react";
import { StyleProp, ViewStyle } from "react-native";

interface BottomSheetProps extends Omit<BottomSheetModalProps, "children"> {
	className?: string;
	contentStyle?: StyleProp<ViewStyle>;
	children?: React.ReactNode;
}

const BottomSheetComponent = (
	{
		className,
		contentStyle,
		children,
		snapPoints,
		// onChange,
		...rest
	}: BottomSheetProps,
	ref: React.Ref<BottomSheetModalMethods>
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
		<BottomSheetModal
			ref={ref}
			snapPoints={sheetSnapPoints}
			// onChange={handleSheetChanges}
			{...rest}
		>
			<BottomSheetView className={className} style={contentStyle}>
				{children}
			</BottomSheetView>
		</BottomSheetModal>
	);
};

export const BottomSheet = forwardRef<BottomSheetModalMethods, BottomSheetProps>(
	BottomSheetComponent
);

BottomSheet.displayName = "AccountSheet";
