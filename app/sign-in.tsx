import React, { useCallback, useRef, useState } from "react";
import {
	Image,
	NativeScrollEvent,
	NativeSyntheticEvent,
	ScrollView,
	Text,
	TouchableOpacity,
	useWindowDimensions,
	View,
} from "react-native";

import { useSession } from "@/providers/session-provider";
import { useRouter } from "expo-router";

// Icons
import GoogleIcon from "@/assets/icons/google.svg";
import LogoFull from "@/assets/logo/logo-full.svg";

// Components
import { RippleButton } from "@/components/ui/ripple-button";

// Data
import { steps } from "@/constants/onboarding";

export default function SignIn() {
	const { signIn } = useSession();
	const { width } = useWindowDimensions();

	const router = useRouter();

	const [activeIndex, setActiveIndex] = useState(0);
	const scrollRef = useRef<ScrollView | null>(null);

	const onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
		const slide = Math.round(e.nativeEvent.contentOffset.x / width);
		setActiveIndex(slide);
	};

	const goToSlide = (index: number) => {
		if (!scrollRef.current) return;
		scrollRef.current.scrollTo({ x: index * width, animated: true });
	};

	const login = useCallback(async () => {
		try {
			await signIn();
			router.replace("/");
		} catch (error) {
			console.error("Error during sign-in:", error);
		}
	}, [signIn]);

	return (
		<View className="flex flex-1 items-stretch gap-8 py-16">
			{/* <Background /> */}

			<View className="items-center px-3 pt-9">
				<LogoFull />
			</View>

			<View className="flex flex-1 items-stretch justify-center gap-6">
				<ScrollView
					ref={scrollRef}
					horizontal
					pagingEnabled
					showsHorizontalScrollIndicator={false}
					onScroll={onScroll}
					scrollEventThrottle={16}
					className="flex-1"
				>
					{steps.map((s, i) => (
						<View
							key={i}
							style={{ width }}
							className="flex flex-1 items-center gap-2 px-6 pt-2"
						>
							<Text className="text-center text-[36px] font-bold text-[#103218]">
								{s.title}
							</Text>

							<Text className="px-2 text-center text-[16px] font-medium text-[#2E4B35]">
								{s.text}
							</Text>

							<View className="flex flex-1 items-center justify-center">
								<Image
									source={s.image}
									className="max-h-[254px] max-w-[348px]"
									resizeMode="contain"
								/>
							</View>
						</View>
					))}
				</ScrollView>

				<View className="mt-6 flex-row justify-center">
					{steps.map((_, i) => (
						<TouchableOpacity
							key={i}
							onPress={() => goToSlide(i)}
							accessibilityRole="button"
							accessibilityLabel={`Ir para slide ${i + 1}`}
							className={`mx-1.5 h-2 w-2 transition-all ${
								activeIndex === i
									? "bg-primary-300 w-5 rounded-lg"
									: "rounded-full bg-[#DADADA]"
							}`}
						/>
					))}
				</View>
			</View>

			<View className="mx-12 mb-6 overflow-hidden rounded-3xl">
				<RippleButton
					className="flex flex-row items-center justify-center gap-3 rounded-3xl border border-[#E6E6E6] bg-white py-3"
					activeOpacity={0.6}
					onPress={login}
				>
					<GoogleIcon width={16} height={16} />
					<Text className="text-[16px] font-semibold text-[#222]">
						Continuar com Google
					</Text>
				</RippleButton>
			</View>
		</View>
	);
}
