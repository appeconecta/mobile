import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function SubmitFormStep4() {
	const insets = useSafeAreaInsets();

	return (
		<View
			className="flex flex-1 items-start justify-start gap-4 px-5"
			style={{
				paddingTop: insets.bottom + 10,
				paddingBottom: insets.bottom + 10,
			}}
		>
			<View className="flex w-full flex-col items-start justify-start gap-2">
				<Text className="text-primary-600 text-lg font-medium">Descrição (opcional)</Text>
				<TextInput
					className="min-h-20 w-full rounded-lg border border-gray-300 bg-white/50 p-4 text-base text-gray-800 placeholder:text-[#737373]"
					placeholder="Descreva o estado do foco de lixo aqui"
					textAlignVertical="top"
					multiline
				/>
				<Text className="text-base text-gray-600">
					Adicione uma descrição detalhada do foco de poluição para ajudar na
					identificação e resolução do problema.
				</Text>
			</View>
			<TouchableOpacity className="bg-primary-400 mt-auto w-full items-center justify-center rounded-lg px-9 py-3">
				<Text className="text-center text-lg font-medium text-white">Enviar Relatório</Text>
			</TouchableOpacity>
		</View>
	);
}
