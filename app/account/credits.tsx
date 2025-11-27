import { Card } from "@/components/card";
import { LinearGradient } from "@/components/ui/linear-gradient";
import { useStatusBarStyle } from "@/hooks/use-status-bar-style";
import { ScrollView, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const contributors = [
	{
		role: "Pesquisa e campo",
		members: ["Eduardo Maciel", "Bárbara Costa"],
	},
	{
		role: "UX & Conteúdo",
		members: ["Lívia Barros", "Marina Falcão"],
	},
	{
		role: "Engenharia",
		members: ["Appe Conecta", "Squad ACE 2"],
	},
];

const acknowledgements = [
	{
		title: "Comunidade de Maceió",
		description:
			"Moradores que compartilharam relatos, rotas e imagens para mapear os focos prioritários",
	},
	{
		title: "Agentes comunitários",
		description:
			"Profissionais de saúde e limpeza urbana que revisaram fluxos e métricas do painel",
	},
	{
		title: "Parceiros acadêmicos",
		description: "Laboratórios da UFAL que emprestaram infraestrutura e mentorias técnicas",
	},
];

const techStack = ["Expo", "React Native", "NativeWind", "EAS Build", "Expo Maps", "TypeScript"];

const buildInfo = {
	version: "1.0.0",
	codename: "Ipê Roxo",
	updatedAt: "Novembro/2025",
	contact: "appeconecta@ufal.br",
};

export default function Credits() {
	const insets = useSafeAreaInsets();
	useStatusBarStyle("light");

	return (
		<ScrollView
			className="flex-1 bg-[#050F0B]"
			contentContainerClassName="gap-6 px-6 pb-16"
			contentContainerStyle={{ paddingTop: insets.top + 32 }}
			showsVerticalScrollIndicator={false}
		>
			<LinearGradient
				colors={["#12241B", "#173624", "#13271D"]}
				start={{ x: 0, y: 0 }}
				end={{ x: 1, y: 1 }}
				className="rounded-3xl p-6"
			>
				<Text className="text-primary-100 text-xs font-semibold tracking-[0.2em] uppercase">
					Projeto ACE 2
				</Text>
				<Text className="mt-2 text-3xl font-bold text-white">Créditos & bastidores</Text>
				<Text className="text-primary-100 mt-3 text-base leading-6">
					Metas climáticas, vigilância ativa e educação ambiental se encontram aqui. Esta
					versão do app sintetiza meses de entrevistas, testes de campo e ciclos de
					aprendizado com comunidades locais.
				</Text>
			</LinearGradient>

			<Card className="gap-2">
				<Text className="text-xl font-bold text-white">Build atual</Text>
				<Text className="text-sm text-white/70">
					Versão {buildInfo.version} · Codinome {buildInfo.codename}
				</Text>
				<View className="mt-3 w-full rounded-2xl bg-white/10 p-4">
					<Text className="text-sm font-semibold text-white">Atualizado</Text>
					<Text className="text-lg font-bold text-white">{buildInfo.updatedAt}</Text>
					<Text className="mt-2 text-sm text-white/70">Contato: {buildInfo.contact}</Text>
				</View>
			</Card>

			<View className="gap-4">
				<Text className="text-primary-100 text-sm font-semibold tracking-wide uppercase">
					Quem fez acontecer
				</Text>
				<View className="gap-4">
					{contributors.map((group) => (
						<View
							key={group.role}
							className="rounded-2xl border border-white/5 bg-white/5 p-5"
						>
							<Text className="text-lg font-semibold text-white">{group.role}</Text>
							<Text className="mt-2 text-base leading-6 text-white/70">
								{group.members.join(" · ")}
							</Text>
						</View>
					))}
				</View>
			</View>

			<View className="gap-3">
				<Text className="text-primary-100 text-sm font-semibold tracking-wide uppercase">
					Gratidão
				</Text>
				<View className="gap-3">
					{acknowledgements.map((item) => (
						<View
							key={item.title}
							className="rounded-2xl border border-white/5 bg-white/5 p-5"
						>
							<Text className="text-base font-semibold text-white">{item.title}</Text>
							<Text className="mt-2 text-sm leading-5 text-white/70">
								{item.description}
							</Text>
						</View>
					))}
				</View>
			</View>

			<View className="gap-3">
				<Text className="text-primary-100 text-sm font-semibold tracking-wide uppercase">
					Tecnologias & stack
				</Text>
				<View className="flex flex-row flex-wrap gap-2">
					{techStack.map((tech) => (
						<View key={tech} className="rounded-full bg-white/10 px-4 py-2">
							<Text className="text-xs font-semibold tracking-wide text-white uppercase">
								{tech}
							</Text>
						</View>
					))}
				</View>
			</View>
		</ScrollView>
	);
}
