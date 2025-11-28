import { Card } from "@/components/card";
import { Image } from "@/components/ui/image";
import { LinearGradient } from "@/components/ui/linear-gradient";
import { useStatusBarStyle } from "@/hooks/use-status-bar-style";
import { styled } from "nativewind";
import { Dimensions, ScrollView, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const profile = {
	name: "Fulano da Silva",
	handle: "@theduardomaciel",
	role: "Mobilizador comunitário",
	base: "Maceió · AL",
	streak: 18,
};

const stats = [
	{
		label: "Relatórios enviados",
		value: "128",
		detail: "+12% vs. último mês",
	},
	{
		label: "Confirmações recebidas",
		value: "47",
		detail: "14 bairros diferentes",
	},
	{
		label: "Horas em campo",
		value: "62h",
		detail: "mutirões e visitas guiadas",
	},
	{
		label: "Impacto estimado",
		value: "3.5k pessoas",
		detail: "alcance das notificações",
	},
];

const badges = [
	{
		short: "GV",
		title: "Guardião Verde",
		description: "10 focos resolvidos com evidências validadas",
	},
	{
		short: "RC",
		title: "Radar Comunitário",
		description: "alertas ativos em 6 bairros diferentes",
	},
	{
		short: "ML",
		title: "Mentor local",
		description: "facilitou 2 roteiros educativos em escolas",
	},
];

const activity = [
	{
		title: "Mutirão porta a porta",
		description: "Benedito Bentes · 24 residências visitadas",
		time: "há 2 dias",
	},
	{
		title: "Rota de coleta colaborativa",
		description: "Ponta Verde · confirmação conjunta com SLUM",
		time: "há 1 semana",
	},
	{
		title: "Oficina Jovens Observadores",
		description: "Escola Maria Lenita · 42 participantes",
		time: "há 3 semanas",
	},
];

const roadmap = [
	{
		title: "Mapa de lotes ociosos",
		status: "Em andamento",
		eta: "previsto para dez/2025",
	},
	{
		title: "Kit educativo para agentes mirins",
		status: "Pesquisa",
		eta: "coleta de insumos",
	},
];

const blurhash =
	"|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const CARD_WIDTH = SCREEN_WIDTH - 40;

const StyledScrollView = styled(ScrollView, {
	contentContainerClassName: { target: "contentContainerStyle" },
});

export default function Profile() {
	const insets = useSafeAreaInsets();
	useStatusBarStyle("light");

	return (
		<StyledScrollView
			className="flex-1 bg-[#040A08]"
			showsVerticalScrollIndicator={false}
			contentContainerClassName="flex items-start justify-start flex-col gap-6"
			contentContainerStyle={{ paddingTop: insets.top, paddingBottom: insets.bottom + 20 }}
		>
			<View className="w-full px-5">
				<LinearGradient
					colors={["#09150F", "#0F2418", "#0B1B14"]}
					start={{ x: 0, y: 0 }}
					end={{ x: 1, y: 1 }}
					className="w-full rounded-3xl p-6"
				>
					<View className="flex flex-row items-center gap-4">
						<Image
							source="https://i.imgur.com/5Hsj4tJ.jpeg"
							placeholder={{ blurhash }}
							contentFit="cover"
							transition={500}
							className="h-20 w-20 rounded-2xl"
						/>
						<View className="flex-1">
							<Text className="text-2xl font-bold text-white">{profile.name}</Text>
							<Text className="text-primary-100 text-base">{profile.handle}</Text>
							<Text className="mt-1 text-sm text-white/70">{profile.base}</Text>
						</View>
					</View>
					<View className="mt-4 flex flex-row items-center justify-between">
						<Text className="text-primary-100 text-sm font-semibold tracking-wide uppercase">
							{profile.role}
						</Text>
						<View className="rounded-full bg-white/10 px-4 py-2">
							<Text className="text-sm font-semibold text-white">
								{profile.streak} dias ativos
							</Text>
						</View>
					</View>
				</LinearGradient>
			</View>

			<View className="flex w-full flex-row flex-wrap gap-4 px-5">
				{stats.map((stat) => (
					<View
						key={stat.label}
						className="min-h-[120px] rounded-2xl border border-white/10 bg-white/5 p-4"
						style={{ width: CARD_WIDTH / 2 - 8 }}
					>
						<Text className="text-3xl font-bold text-white">{stat.value}</Text>
						<Text className="text-primary-100 mt-1 text-sm font-semibold uppercase">
							{stat.label}
						</Text>
						<Text className="mt-2 text-xs text-white/70">{stat.detail}</Text>
					</View>
				))}
			</View>

			<View className="w-full gap-3">
				<Text className="text-primary-100 pl-5 text-sm font-semibold tracking-wide uppercase">
					Reconhecimentos
				</Text>
				<StyledScrollView
					horizontal
					showsHorizontalScrollIndicator={false}
					contentContainerClassName="px-5"
				>
					<View className="flex h-40 flex-row gap-4">
						{badges.map((badge) => (
							<View
								key={badge.title}
								className="h-full w-60 rounded-2xl border border-white/10 bg-white/5 p-4"
							>
								<View className="h-12 w-12 items-center justify-center rounded-2xl bg-white/10">
									<Text className="text-base font-bold text-white">
										{badge.short}
									</Text>
								</View>
								<Text className="mt-3 text-lg font-semibold text-white">
									{badge.title}
								</Text>
								<Text className="mt-2 text-sm leading-5 text-white/70">
									{badge.description}
								</Text>
							</View>
						))}
					</View>
				</StyledScrollView>
			</View>

			<View className="w-full gap-3 px-5">
				<Text className="text-primary-100 text-sm font-semibold tracking-wide uppercase">
					Últimas ações
				</Text>
				<View className="w-full gap-3">
					{activity.map((item) => (
						<View
							key={item.title}
							className="w-full rounded-2xl border border-white/5 bg-white/5 p-4"
						>
							<Text className="text-base font-semibold text-white">{item.title}</Text>
							<Text className="mt-1 text-sm text-white/70">{item.description}</Text>
							<Text className="text-primary-100 mt-3 text-xs tracking-wide uppercase">
								{item.time}
							</Text>
						</View>
					))}
				</View>
			</View>

			<View className="w-full px-5">
				<Card className="w-full gap-3">
					<Text className="text-lg font-bold text-white">Próximos focos</Text>
					{roadmap.map((goal) => (
						<View key={goal.title} className="w-full rounded-2xl bg-white/10 p-4">
							<Text className="text-base font-semibold text-white">{goal.title}</Text>
							<Text className="mt-2 text-sm text-white/70">{goal.eta}</Text>
							<Text className="text-primary-100 mt-1 text-xs tracking-wide uppercase">
								{goal.status}
							</Text>
						</View>
					))}
				</Card>
			</View>
		</StyledScrollView>
	);
}
