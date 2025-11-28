import { useStatusBarStyle } from "@/hooks/use-status-bar-style";
import { BottomSheetBackdrop, BottomSheetModal } from "@gorhom/bottom-sheet";
import { FlashList } from "@shopify/flash-list";
import { useCallback, useEffect, useRef, useState } from "react";
import {
	Dimensions,
	NativeScrollEvent,
	NativeSyntheticEvent,
	Pressable,
	ScrollView,
	Text,
	TouchableOpacity,
	View,
	ViewStyle,
} from "react-native";
import Animated, {
	AnimatedStyle,
	useAnimatedStyle,
	useSharedValue,
	withSpring,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { SvgProps } from "react-native-svg";

import { cn } from "@/lib/utils";
import { styled } from "nativewind";

// Components
import { BottomSheet } from "@/components/bottom-sheet";
import { Image } from "@/components/ui/image";
import { LinearGradient } from "@/components/ui/linear-gradient";

// Icons
import AnalyticsIcon from "@/assets/icons/analytics.svg";
import CheckCircleIcon from "@/assets/icons/check_circle.svg";
import DehazeIcon from "@/assets/icons/dehaze.svg";
import GridViewIcon from "@/assets/icons/grid_view.svg";
import PendingIcon from "@/assets/icons/pending.svg";

import ForYouIcon from "@/assets/icons/for_you.svg";
import InfoIcon from "@/assets/icons/info.svg";
import LogoutIcon from "@/assets/icons/logout.svg";
import SettingsIcon from "@/assets/icons/settings.svg";
import { useSession } from "@/providers/session-provider";
import { Link } from "expo-router";
import Toast from "react-native-toast-message";

const StyledDehazeIcon = styled(DehazeIcon);
const StyledAnalyticsIcon = styled(AnalyticsIcon);
const StyledGridViewIcon = styled(GridViewIcon);
const StyledCheckCircleIcon = styled(CheckCircleIcon);
const StyledPendingIcon = styled(PendingIcon);

const StyledForYouIcon = styled(ForYouIcon);
const StyledSettingsIcon = styled(SettingsIcon);
const StyledInfoIcon = styled(InfoIcon);
const StyledLogoutIcon = styled(LogoutIcon);

const springConfig = {
	damping: 12,
	stiffness: 100,
	mass: 0.6,
	velocity: 20,
};

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

const BAR_WIDTH = SCREEN_WIDTH / 5;
const ITEM_HEIGHT = 128;

const POSTS_POSITION = SCREEN_WIDTH / 4 - BAR_WIDTH / 2;
const ANALYTICS_POSITION = (3 * SCREEN_WIDTH) / 4 - BAR_WIDTH / 2;

export default function Account() {
	const insets = useSafeAreaInsets();
	useStatusBarStyle("dark");

	const { signOut, token } = useSession();

	const [currentSection, setCurrentSection] = useState<"posts" | "analytics">("posts");
	const [userData, setUserData] = useState<UserData | null>(null);
	const [feedData, setFeedData] = useState<FeedItemData[] | null>([]);
	const sectionsScrollRef = useRef<ScrollView | null>(null);
	const hasSyncedInitialSection = useRef(false);

	const position = useSharedValue(POSTS_POSITION);

	const fetchUserData = async () => {
		try {
			const res = await fetch("https://econecta-api.vercel.app/api/users/me", {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
			});
			const data = await res.json();
			setUserData(data.data);
		} catch (e) {
			console.error("Error fetching user data:", e);
			Toast.show({
				type: "error",
				text1: "Erro de pesquisa",
				text2: "Não foi possível receber os dados do usuário. Tente novamente.",
				position: "bottom",
			});
		}
	};

	const fetchFeedData = async () => {
		try {
			const res = await fetch("https://econecta-api.vercel.app/api/trashspots", {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
			});
			const data = await res.json();
			const formattedData = data.data.map((item: any) => ({
				id: item.id,
				date: item.createdAt.split("T")[0],
				// Colocar bairro tbm, é que nos exemplos que eu adicionei n tem ainda
				address: item.location.postalCode + ", " + item.location.city,
				description: item.description,
				status: "SOLVED",
				imageUrl: "https://i.imgur.com/oF6I8fT.jpeg",
			}));
			setFeedData(formattedData);
		} catch (e) {
			console.error("Error fetching user data:", e);
			Toast.show({
				type: "error",
				text1: "Erro de pesquisa",
				text2: "Não foi possível receber os dados do feed. Tente novamente.",
				position: "bottom",
			});
		}
	};

	useEffect(() => {
		if (currentSection === "posts") {
			position.value = withSpring(POSTS_POSITION, springConfig);
		} else {
			position.value = withSpring(ANALYTICS_POSITION, springConfig);
		}
	}, [currentSection, position]);

	useEffect(() => {
		const offset = currentSection === "posts" ? 0 : SCREEN_WIDTH;
		sectionsScrollRef.current?.scrollTo({
			x: offset,
			animated: hasSyncedInitialSection.current,
		});
		hasSyncedInitialSection.current = true;
	}, [currentSection]);

	useEffect(() => {
		if (token) {
			fetchUserData();
			fetchFeedData();
		}
	}, [token]);

	const animatedStyle = useAnimatedStyle(() => {
		return {
			transform: [
				{
					translateX: position.value,
				},
			],
		};
	});

	const handleMomentumScrollEnd = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
		const offsetX = event.nativeEvent.contentOffset.x;
		const nextSection = offsetX >= SCREEN_WIDTH / 2 ? "analytics" : "posts";
		if (nextSection !== currentSection) {
			setCurrentSection(nextSection);
		}
	};

	const handleSectionChange = (section: "posts" | "analytics") => {
		if (section !== currentSection) {
			setCurrentSection(section);
		}
	};

	const bottomSheetRef = useRef<BottomSheetModal>(null);

	const handleModalOpen = useCallback(() => {
		const sheet = bottomSheetRef.current;
		if (!sheet) return;
		sheet.present();
	}, []);

	const handleModalClose = useCallback(() => {
		const sheet = bottomSheetRef.current;
		if (!sheet) return;
		sheet.dismiss();
	}, []);

	return (
		<ScrollView
			className="bg-bg-300 flex-1"
			showsVerticalScrollIndicator={false}
			contentContainerStyle={{
				minHeight: SCREEN_HEIGHT + insets.top,
				paddingBottom: insets.bottom + 128,
			}}
		>
			<View className="flex flex-1 items-center justify-start">
				{/* Header */}
				<View
					className="flex w-full gap-7 bg-[#f2f7f1] shadow-lg"
					style={{
						paddingTop: insets.top + 16,
					}}
				>
					<View className="flex w-full flex-row items-center justify-between px-5">
						<View className="w-5" />
						<Text className="text-primary-600 text-xl font-bold">{userData ? userData.user.name : "Carregando..."}</Text>
						<Pressable
							android_ripple={{
								radius: 24,
								foreground: true,
								color: "rgba(0, 0, 0, 0.05)",
							}}
							className="overflow-hidden rounded-full p-2"
							onPress={handleModalOpen}
						>
							<StyledDehazeIcon className="fill-primary-600" width={20} height={20} />
						</Pressable>
					</View>

					<View className="flex flex-col items-center justify-center gap-3">
						<Image
							source={userData?.user?.image || "https://i.imgur.com/5Hsj4tJ.jpeg"}
							contentFit="cover"
							transition={1000}
							className="h-24 w-24 rounded-full"
						/>
						<Text className="text-primary-600 text-lg font-bold">{userData ? ("@" + userData.user.email.split("@")?.[0]) : "Carregando..."}</Text>
					</View>

					<View className="flex w-full flex-row items-center justify-evenly">
						<View className="flex flex-col items-center justify-center gap-1">
							<Text className="text-primary-600 text-2xl font-black">
								{userData ? userData.trashSpotsCount : "..."}
							</Text>
							<Text className="text-primary-300 text-sm font-medium">Relatórios</Text>
						</View>
						<View className="flex flex-col items-center justify-center gap-1">
							<Text className="text-primary-600 text-2xl font-black">
								{userData ? userData.confirmationsCount : "..."}
							</Text>
							<Text className="text-primary-300 text-sm font-medium">
								Confirmações
							</Text>
						</View>
						<View className="flex flex-col items-center justify-center gap-1">
							<Text className="text-primary-600 text-2xl font-black">
								{userData ? userData.commentsCount : "..."}
							</Text>
							<Text className="text-primary-300 text-sm font-medium">
								Comentários
							</Text>
						</View>
					</View>

					<View className="flex w-full flex-row items-center justify-center">
						<TouchableOpacity
							activeOpacity={0.8}
							className={cn(
								"border-primary-300 flex-1 flex-row items-center justify-center gap-2 border-b-0 py-4 opacity-40",
								{
									"opacity-100": currentSection === "posts",
								}
							)}
							onPress={() => {
								handleSectionChange("posts");
							}}
						>
							<StyledGridViewIcon
								className="fill-primary-300"
								width={24}
								height={24}
							/>
						</TouchableOpacity>
						<TouchableOpacity
							activeOpacity={0.8}
							className={cn(
								"border-primary-300 flex-1 flex-row items-center justify-center gap-2 border-b-0 opacity-40",
								{
									"opacity-100": currentSection === "analytics",
								}
							)}
							onPress={() => {
								handleSectionChange("analytics");
							}}
						>
							<StyledAnalyticsIcon
								className="fill-primary-300"
								width={24}
								height={24}
							/>
						</TouchableOpacity>

						<Animated.View
							className="bg-primary-300 absolute bottom-0 left-0 h-0.5 -translate-x-1/2 rounded-full"
							style={[animatedStyle, { width: BAR_WIDTH }]}
						></Animated.View>
					</View>
				</View>

				<ScrollView
					ref={sectionsScrollRef}
					horizontal
					pagingEnabled
					showsHorizontalScrollIndicator={false}
					onMomentumScrollEnd={handleMomentumScrollEnd}
					scrollEventThrottle={16}
					className="w-full"
				>
					<View style={{ width: SCREEN_WIDTH }}>
						<FlashList
							data={feedData}
							renderItem={({ item, index }) => <FeedItem {...item} />}
							keyExtractor={(item) => item.id}
							scrollEnabled={false}
							showsVerticalScrollIndicator={false}
							className="relative w-full"
							style={{ width: "100%" }}
							contentContainerStyle={{
								paddingTop: 20,
								paddingHorizontal: 20,
								paddingBottom: 24,
							}}
						/>
					</View>
					<View
						className="flex flex-1 items-center justify-start"
						style={{ width: SCREEN_WIDTH }}
					>
						<Text className="text-primary-600 mt-16 text-center">Em breve!</Text>
					</View>
				</ScrollView>
			</View>

			<BottomSheet
				ref={bottomSheetRef}
				backgroundStyle={{ borderTopLeftRadius: 24, borderTopRightRadius: 24 }}
				className="flex-1 items-center"
				handleStyle={{ display: "none" }}
				snapPoints={["85%"]}
				index={1}
				backdropComponent={BottomSheetBackdrop}
				enableDismissOnClose
				enablePanDownToClose
			>
				<LinearGradient
					colors={["#AED296", "#7FB883"]}
					className="h-40 w-full items-center justify-center gap-1 rounded-tl-2xl rounded-tr-2xl"
					start={{ x: 0, y: 0.5 }}
					end={{ x: 1, y: 0.5 }}
				>
					<Text className="text-3xl font-bold text-white">
						{userData ? userData.user.name : "Carregando..."}
					</Text>
					<Text className="text-base font-medium text-white">
						{userData ? userData.user.email : "Carregando..."}
					</Text>
				</LinearGradient>
				<View className="w-[80%] flex-1 items-center">
					<Pressable
						className="absolute -top-6 h-12 w-12 items-center justify-center rounded-full bg-white shadow-lg"
						onPress={() => bottomSheetRef.current?.dismiss()}
					>
						<Text className="text-primary-200 text-2xl font-bold">X</Text>
					</Pressable>
				</View>

				<View className="flex w-full flex-col items-start justify-start gap-4 p-12">
					<Link href="/account/profile" asChild>
						<AccountModalButton
							icon={StyledForYouIcon}
							title="Perfil"
							description="como a comunidade lhe vê"
							onPress={handleModalClose}
						/>
					</Link>
					<Link href="/account/settings" asChild>
						<AccountModalButton
							icon={StyledSettingsIcon}
							title="Conta"
							description="configurações"
							onPress={handleModalClose}
						/>
					</Link>
					<Link href="/account/credits" asChild>
						<AccountModalButton
							icon={StyledInfoIcon}
							title="Info"
							description="agradecimentos e detalhes técnicos"
							onPress={handleModalClose}
						/>
					</Link>
					<AccountModalButton
						icon={StyledLogoutIcon}
						title="Log-out"
						description="nos vemos em breve!"
						onPress={() => signOut()}
						isLast
					/>
				</View>
			</BottomSheet>
		</ScrollView>
	);
}

interface UserData {
	user: {
		id: string;
		name: string;
		email: string;
		image?: string;
	};
	commentsCount: number;
	confirmationsCount: number;
	trashSpotsCount: number;
}
interface FeedItemData {
	id: string;
	imageUrl: string;
	status: "PENDING" | "SOLVED";
	date: string;
	address: string;
	description: string;
}

interface FeedItemProps extends FeedItemData {
	style?: AnimatedStyle<ViewStyle>;
}

const ICONS = {
	PENDING: <StyledPendingIcon className="fill-red-300" width={16} height={16} />,
	SOLVED: <StyledCheckCircleIcon className="fill-primary-200" width={16} height={16} />,
};

const STATUS_TEXT = {
	PENDING: "Pendente",
	SOLVED: "Resolvido",
};

function FeedItem({ status, date, address, description, imageUrl, style }: FeedItemProps) {
	return (
		<Animated.View
			className="bg-bg-100 mb-4 w-full flex-row overflow-hidden rounded-lg"
			style={[{ height: ITEM_HEIGHT }, style]}
		>
			<View className="flex flex-1 flex-col items-start justify-start gap-2 p-3">
				<Text className="text-primary-600 mb-2 font-medium">{address}</Text>
				<Text className="text-primary-400 font-normal line-clamp-3">{description}</Text>

				<View className="mt-auto flex w-full flex-row items-center justify-between">
					<View className="flex flex-row items-center justify-start gap-1">
						{ICONS[status]}
						<Text
							className={cn("text-sm font-medium", {
								"text-red-300": status === "PENDING",
								"text-primary-200": status === "SOLVED",
							})}
						>
							{STATUS_TEXT[status]}
						</Text>
					</View>
					<Text className="text-primary-300 font-light">
						{new Date(date).toLocaleDateString("pt-BR", {
							day: "2-digit",
							month: "2-digit",
						})}
					</Text>
				</View>
			</View>
			<Image source={imageUrl} contentFit="cover" transition={250} className="h-full w-2/5" />
		</Animated.View>
	);
}

interface AccountModalButtonProps {
	onPress?: () => void;
	icon: React.ComponentType<SvgProps>;
	title: string;
	description: string;
	isLast?: boolean;
}

function AccountModalButton({
	onPress,
	icon: Icon,
	title,
	description,
	isLast,
}: AccountModalButtonProps) {
	return (
		<>
			<TouchableOpacity
				activeOpacity={0.8}
				onPress={onPress}
				className="flex flex-row items-center justify-start gap-9"
			>
				<View className="h-12 w-12 items-center justify-center">
					<Icon width={32} height={32} className="fill-primary-400" />
				</View>
				<View className="flex flex-1 flex-col items-start justify-start gap-1">
					<Text className="text-primary-400 text-3xl font-bold">{title}</Text>
					<Text className="text-primary-200 text-sm font-normal">{description}</Text>
				</View>
			</TouchableOpacity>
			{!isLast && <View className="bg-primary-200 my-2 h-px w-full opacity-20" />}
		</>
	);
}
