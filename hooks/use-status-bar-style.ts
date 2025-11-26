import { useFocusEffect } from "expo-router";
import { StatusBarStyle, setStatusBarStyle } from "expo-status-bar";
import { useCallback } from "react";

/**
 * Ensure the desired status bar style is enforced every time the screen gains focus.
 */
export function useStatusBarStyle(style: StatusBarStyle, animated = true) {
	useFocusEffect(
		useCallback(() => {
			setStatusBarStyle(style, animated);
		}, [style, animated])
	);
}
