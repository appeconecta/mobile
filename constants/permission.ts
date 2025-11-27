import { getPermissionsAsync } from "expo-maps";

export const checkLocationPermission = async (): Promise<boolean> => {
	const hasPermission = await getPermissionsAsync();
	return hasPermission.granted;
};
