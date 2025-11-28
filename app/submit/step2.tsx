import { Link } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// Icons
import AddPhotoIcon from "@/assets/icons/add_photo.svg";
import DeleteIcon from "@/assets/icons/delete.svg";
import { useSubmitForm } from "./_layout";

export default function SubmitFormStep2() {
	const insets = useSafeAreaInsets();
 	const { photos, removePhoto } = useSubmitForm();

	return (
		<View
			className="flex flex-1 items-start justify-start gap-4 px-5"
			style={{
				paddingTop: insets.bottom + 10,
				paddingBottom: insets.bottom + 10,
			}}
		>
			<View
				className={
					"bg-primary-100 mb-8 w-full flex-1 items-center justify-center rounded-2xl px-4"
				}
			>
				{photos.length === 0 ? (
					<Text className="text-primary-600">Nenhuma foto adicionada ainda</Text>
				) : (
					<View className="w-full flex-row flex-wrap items-center justify-center gap-3">
						{photos.map((uri) => (
							<View key={uri} className="relative">
								<Image
									source={{ uri }}
									className="h-28 w-28 rounded-lg"
									resizeMode="cover"
								/>
								<TouchableOpacity
									className="absolute -right-2 -top-2 rounded-full bg-[#D1351B] p-2"
									activeOpacity={0.8}
									onPress={() => removePhoto(uri)}
								>
									<DeleteIcon width={16} height={16} fill={"white"} />
								</TouchableOpacity>
							</View>
						))}
					</View>
				)}
				<View className="absolute -bottom-6 flex flex-row items-center justify-center gap-2">
					<Link href="/submit/step1" asChild>
						<TouchableOpacity
							activeOpacity={0.8}
							className="bg-primary-400 flex-row gap-3 rounded-xl px-6 py-3"
						>
							<AddPhotoIcon width={24} height={24} fill={"white"} />
							<Text className="text-lg font-bold text-white">Adicionar</Text>
						</TouchableOpacity>
					</Link>
				</View>
			</View>
			<Link href="/submit/step3" asChild>
				<TouchableOpacity className="bg-primary-400 mt-auto w-full items-center justify-center rounded-lg px-9 py-3">
					<Text className="text-center text-lg font-medium text-white">
						Próximo passo
					</Text>
				</TouchableOpacity>
			</Link>
		</View>
	);
}
