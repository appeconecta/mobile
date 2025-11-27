import { Link } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// Icons
import AddPhotoIcon from "@/assets/icons/add_photo.svg";
import DeleteIcon from "@/assets/icons/delete.svg";

export default function SubmitFormStep2() {
	const insets = useSafeAreaInsets();

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
					"bg-primary-100 mb-8 w-full flex-1 items-center justify-center rounded-2xl px-12"
				}
			>
				{/* <Image  

				/> */}
				<View className="absolute -bottom-6 flex flex-row items-center justify-center gap-2">
					<TouchableOpacity
						activeOpacity={0.8}
						className="flex-row gap-3 rounded-xl bg-[#D1351B] px-6 py-3"
					>
						<DeleteIcon width={24} height={24} fill={"white"} />
						<Text className="text-lg font-bold text-white">Excluir</Text>
					</TouchableOpacity>
					<TouchableOpacity
						activeOpacity={0.8}
						className="bg-primary-400 flex-row gap-3 rounded-xl px-6 py-3"
					>
						<AddPhotoIcon width={24} height={24} fill={"white"} />
						<Text className="text-lg font-bold text-white">Adicionar</Text>
					</TouchableOpacity>
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
