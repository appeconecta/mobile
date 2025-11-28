import { useCache } from "@/providers/cache-provider";
import { useSession } from "@/providers/session-provider";
import { SplashScreen } from "expo-router";

SplashScreen.preventAutoHideAsync();

export function SplashScreenController() {
	const { isLoading } = useSession();
	const { isLoadingCache } = useCache();

	if (!isLoading && !isLoadingCache) {
		SplashScreen.hide();
	}

	return null;
}
