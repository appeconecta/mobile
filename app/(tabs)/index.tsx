import { GoogleMaps } from "expo-maps";
import { styled } from "nativewind";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Link } from "expo-router";

// Components
import { Card } from "@/components/card";
import { Image } from "@/components/ui/image";

// Icons
import AddIcon from "@/assets/icons/add.svg";
import RecycleIcon from "@/assets/icons/recycle.svg";

// Types
import { GoogleMapsColorScheme } from "expo-maps/build/google/GoogleMaps.types";

const StyledRecycleIcon = styled(RecycleIcon);

const blurhash =
	"|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

export default function Index() {
	const insets = useSafeAreaInsets();

	return (
		<ScrollView
			nestedScrollEnabled
			showsVerticalScrollIndicator={false}
			contentContainerClassName="flex items-start justify-start gap-4 pt-5"
		>
			{/* Header */}
			<View
				className="flew mt-3 w-full flex-row items-center justify-between px-5"
				style={{ paddingTop: insets.top }}
			>
				<View className="flex flex-col items-start justify-start gap-1">
					<Text className="text-primary-300 text-lg font-semibold">
						Bem vindo, Fulano
					</Text>
					<Text className="text-primary-600 text-4xl font-bold">Seu engajamento</Text>
				</View>
				<TouchableOpacity activeOpacity={0.8}>
					<Image
						source={"https://i.imgur.com/5Hsj4tJ.jpeg"}
						placeholder={{ blurhash }}
						contentFit="cover"
						transition={1000}
						className="border-primary-500 h-16 w-16 rounded-full border-2"
					/>
				</TouchableOpacity>
			</View>

			<Link href={"/submit"} asChild>
				<TouchableOpacity activeOpacity={0.8} className="w-full px-5">
					<Card className="w-full flex-row gap-3 py-6">
						<AddIcon />
						<Text className="text-2xl font-bold text-white">Adicionar relatório</Text>
						<StyledRecycleIcon className="absolute -top-4 right-0 rotate-9" />
					</Card>
				</TouchableOpacity>
			</Link>

			<Text className="text-primary-600 self-start pl-5 text-2xl font-bold">Resumo</Text>

			<View className="flex flex-row items-center justify-start gap-4 px-5">
				<Card className="flex-1 gap-3">
					<Text className="font-medium text-white">Focos reportados este mês</Text>
					<Text className="text-4xl font-bold text-white">12 focos</Text>
				</Card>
				<Card className="flex-1 gap-3">
					<Text className="font-medium text-white">Focos reportados resolvidos</Text>
					<Text className="text-4xl font-bold text-white">3 focos</Text>
				</Card>
			</View>

			<Text className="text-primary-600 self-start pl-5 text-2xl font-bold">Comunidade</Text>

			<ScrollView
				horizontal
				nestedScrollEnabled
				showsHorizontalScrollIndicator={false}
				className=""
				contentContainerClassName="flex flex-row items-center justify-start gap-4 px-5"
			>
				<View className="flex w-80 flex-col overflow-hidden rounded-xl">
					<GoogleMaps.View
						style={{ flex: 1 }}
						uiSettings={{
							zoomControlsEnabled: false,
						}}
						cameraPosition={{
							coordinates: {
								latitude: -9.669745,
								longitude: -35.721262,
							},
							zoom: 14,
						}}
						/* properties={{
							isMyLocationEnabled: true,
						}} */
						colorScheme={GoogleMapsColorScheme.LIGHT}
					/>
					<Card className="gap-1 rounded-tl-none rounded-tr-none">
						<Text className="text-3xl font-bold text-white">28 focos de lixo</Text>
						<Text className="font-regular text-white">
							foram encontrados em seu bairro este mês
						</Text>
					</Card>
				</View>
				<Card className="h-full w-48 gap-3" colors={["#26413C", "#7FB883"]}>
					<Text className="font-regular text-white">
						Com o esforço coletivo de{" "}
						<Text className="font-bold">pessoas como você,</Text>
					</Text>
					<Text className="text-4xl font-bold text-white">+ de 500 focos</Text>
					<Text className="font-normal text-white">
						foram recolhidos no Brasil até o momento!
					</Text>

					<View className="mt-auto h-0.5 w-full bg-white/30" />

					<Text className="mt-auto font-normal text-white">
						<Text className="font-bold">Você e sua cidade</Text> contribuíram com 2.5%
						desse número!
					</Text>
				</Card>
			</ScrollView>
		</ScrollView>
	);
}
