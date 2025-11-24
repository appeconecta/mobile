import GoogleIcon from '@/assets/icons/google.svg';
import LogoFull from '@/assets/logo/logo-full.svg';
import React, { useRef, useState } from 'react';
import {
	Image,
	NativeScrollEvent,
	NativeSyntheticEvent,
	ScrollView,
	Text,
	TouchableOpacity,
	useWindowDimensions,
	View,
} from 'react-native';
import steps from './steps';

const OnBoarding: React.FC = () => {
	const { width } = useWindowDimensions();

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

	return (
		<View className="flex flex-1 items-stretch gap-12 bg-[#F6FBF6]">
			<View className="items-center px-3 py-[38px]">
				<LogoFull className="max-h-[49px] max-w-[291px]" />
			</View>

			<View className="flex-1 flex items-stretch justify-center gap-6">
				<ScrollView
					ref={scrollRef}
					horizontal
					pagingEnabled
					showsHorizontalScrollIndicator={false}
					onScroll={onScroll}
					scrollEventThrottle={16}
					className="flex-1 max-h-[540px]">
					{steps.map((s, i) => (
						<View key={i} style={{ width }} className="flex-1 flex items-center gap-2 px-6 pt-2">
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

				<View className="mb-9 flex-row justify-center">
					{steps.map((_, i) => (
						<TouchableOpacity
							key={i}
							onPress={() => goToSlide(i)}
							accessibilityRole="button"
							accessibilityLabel={`Ir para slide ${i + 1}`}
							className={`mx-1.5 h-2 w-2 transition-all ${
								activeIndex === i
									? 'w-5 rounded-lg bg-[#7FB883]'
									: 'rounded-full bg-[#DADADA]'
							}`}
						/>
					))}
				</View>
			</View>

			<View className="p-5">
				<TouchableOpacity
					activeOpacity={0.8}
					className="flex flex-row items-center justify-center gap-3 rounded-full border border-[#E6E6E6] bg-white py-3">
					<GoogleIcon width={16} height={16} />
					<Text className="text-[16px] font-semibold text-[#222]">
						Continuar com Google
					</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
};

export default OnBoarding;
