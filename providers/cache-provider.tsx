import { getCollectionspots, getHomeInfo, getSpots, getTrashspots } from "@/lib/api";
import { User } from "@/types/user";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { useSession } from "./session-provider";

interface HomeInfo {
	user: User; // Replace with proper User type
	trashSpotsCount: number;
	confirmationsCount: number;
	commentsCount: number;
}

interface CacheContextType {
	homeData: HomeInfo | null;
	trashspots: any[] | null;
	spots: any[] | null;
	collectionspots: any[] | null;
	refreshHome: () => Promise<void>;
	refreshTrashspots: () => Promise<void>;
	refreshSpots: () => Promise<void>;
	refreshCollectionspots: () => Promise<void>;
	isLoadingCache: boolean;
}

const CacheContext = createContext<CacheContextType | undefined>(undefined);

const CACHE_KEYS = {
	HOME: "cache_home",
	TRASHSPOTS: "cache_trashspots",
	SPOTS: "cache_spots",
	COLLECTIONSPOTS: "cache_collectionspots",
};

export function CacheProvider({ children }: { children: ReactNode }) {
	const { token } = useSession();
	const [homeData, setHomeData] = useState<HomeInfo | null>(null);
	const [trashspots, setTrashspots] = useState<any[] | null>(null);
	const [spots, setSpots] = useState<any[] | null>(null);
	const [collectionspots, setCollectionspots] = useState<any[] | null>(null);
	const [isLoadingCache, setIsLoadingCache] = useState(true);

	useEffect(() => {
		loadCache();
	}, []);

	const loadCache = async () => {
		try {
			const [homeStr, trashspotsStr, spotsStr, collectionspotsStr] = await Promise.all([
				AsyncStorage.getItem(CACHE_KEYS.HOME),
				AsyncStorage.getItem(CACHE_KEYS.TRASHSPOTS),
				AsyncStorage.getItem(CACHE_KEYS.SPOTS),
				AsyncStorage.getItem(CACHE_KEYS.COLLECTIONSPOTS),
			]);

			if (homeStr) setHomeData(JSON.parse(homeStr));
			if (trashspotsStr) setTrashspots(JSON.parse(trashspotsStr));
			if (spotsStr) setSpots(JSON.parse(spotsStr));
			if (collectionspotsStr) setCollectionspots(JSON.parse(collectionspotsStr));
		} catch (error) {
			console.error("Error loading cache:", error);
		} finally {
			setIsLoadingCache(false);
		}
	};

	const refreshHome = async () => {
		if (!token) return;
		try {
			const data = await getHomeInfo(token);
			setHomeData(data);
			await AsyncStorage.setItem(CACHE_KEYS.HOME, JSON.stringify(data));
		} catch (error) {
			console.error("Error refreshing home data:", error);
			throw error; // Re-throw to handle in the component
		}
	};

	const refreshTrashspots = async () => {
		if (!token) return;
		try {
			const data = await getTrashspots(token);
			setTrashspots(data);
			await AsyncStorage.setItem(CACHE_KEYS.TRASHSPOTS, JSON.stringify(data));
		} catch (error) {
			console.error("Error refreshing trashspots:", error);
			throw error; // Re-throw to handle in the component
		}
	};

	const refreshSpots = async () => {
		if (!token) return;
		try {
			const data = await getSpots(token);
			setSpots(data);
			await AsyncStorage.setItem(CACHE_KEYS.SPOTS, JSON.stringify(data));
		} catch (error) {
			console.error("Error refreshing spots:", error);
			throw error; // Re-throw to handle in the component
		}
	};

	const refreshCollectionspots = async () => {
		if (!token) return;
		try {
			const data = await getCollectionspots(token);
			setCollectionspots(data);
			await AsyncStorage.setItem(CACHE_KEYS.COLLECTIONSPOTS, JSON.stringify(data));
		} catch (error) {
			console.error("Error refreshing collectionspots:", error);
			throw error; // Re-throw to handle in the component
		}
	};

	return (
		<CacheContext.Provider
			value={{
				homeData,
				trashspots,
				spots,
				collectionspots,
				refreshHome,
				refreshTrashspots,
				refreshSpots,
				refreshCollectionspots,
				isLoadingCache,
			}}
		>
			{children}
		</CacheContext.Provider>
	);
}

export function useCache() {
	const context = useContext(CacheContext);
	if (context === undefined) {
		throw new Error("useCache must be used within a CacheProvider");
	}
	return context;
}
