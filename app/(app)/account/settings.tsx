import { Card } from "@/components/card";
import { useStatusBarStyle } from "@/hooks/use-status-bar-style";
import { styled } from "nativewind";
import { useState } from "react";
import { Pressable, ScrollView, Switch, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const notificationDefaults = {
	pushAlerts: true,
	weeklyDigest: true,
	newBadges: false,
};

const sessions = [
	{
		id: "session-01",
		device: "Pixel 6 · Android 14",
		location: "Maceió, AL",
		lastSeen: "há 3 horas",
	},
	{
		id: "session-02",
		device: "iPad · iPadOS 17",
		location: "Viçosa, AL",
		lastSeen: "ontem, 22h13",
	},
];

const dataControls = [
	{
		title: "Exportar histórico",
		description: "Receba um .csv com relatórios e confirmações",
	},
	{
		title: "Solicitar remoção de dados",
		description: "Processo leva até 10 dias úteis",
	},
];

const StyledScrollView = styled(ScrollView, {
	contentContainerClassName: { target: "contentContainerStyle" },
});

export default function Settings() {
	const insets = useSafeAreaInsets();
	const [notifications, setNotifications] = useState(notificationDefaults);
	useStatusBarStyle("light");

	const toggleNotification = (key: keyof typeof notificationDefaults) => {
		setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));
	};

	return (
		<StyledScrollView
			className="flex-1 bg-[#030705]"
			contentContainerClassName="gap-6 px-6 pb-8"
			contentContainerStyle={{ paddingTop: insets.top }}
			showsVerticalScrollIndicator={false}
		>
			<Card className="gap-2">
				<Text className="text-xl font-bold text-white">Preferências da conta</Text>
				<Text className="text-sm text-white/70">
					Ajuste alertas, privacidade e dados sincronizados com a rede Appe Conecta.
				</Text>
			</Card>

			<View className="gap-3">
				<Text className="text-primary-100 text-sm font-semibold tracking-wide uppercase">
					Notificações
				</Text>
				<View className="rounded-3xl border border-white/10 bg-white/5">
					{[
						{
							key: "pushAlerts" as const,
							label: "Alertas imediatos",
							description: "Receba push sempre que um foco próximo for registrado",
						},
						{
							key: "weeklyDigest" as const,
							label: "Resumo semanal",
							description: "Consolida estatísticas e missões prioritárias",
						},
						{
							key: "newBadges" as const,
							label: "Novas conquistas",
							description: "Avise quando um selo ou streak for desbloqueado",
						},
					].map((item, index, array) => (
						<View
							key={item.key}
							className="flex flex-row items-center justify-between gap-4 px-5 py-4"
							style={{
								borderBottomWidth: index === array.length - 1 ? 0 : 1,
								borderColor: "rgba(255,255,255,0.07)",
							}}
						>
							<View className="flex-1">
								<Text className="text-base font-semibold text-white">
									{item.label}
								</Text>
								<Text className="mt-1 text-sm text-white/70">
									{item.description}
								</Text>
							</View>
							<Switch
								value={notifications[item.key]}
								onValueChange={() => toggleNotification(item.key)}
								thumbColor="#F3F7F4"
								trackColor={{ false: "rgba(255,255,255,0.25)", true: "#4F9D69" }}
							/>
						</View>
					))}
				</View>
			</View>

			<View className="gap-3">
				<Text className="text-primary-100 text-sm font-semibold tracking-wide uppercase">
					Privacidade
				</Text>
				<View className="rounded-3xl border border-white/10 bg-white/5 p-5">
					<View className="flex flex-row items-center justify-between">
						<Text className="text-base font-semibold text-white">Perfil público</Text>
						<Text className="text-primary-100 text-sm">Visível para a comunidade</Text>
					</View>
					<Text className="mt-2 text-sm text-white/70">
						Seu nome e foto aparecem nos murais, mas e-mail e telefone ficam ocultos.
					</Text>
					<View className="mt-5 rounded-2xl bg-white/10 p-4">
						<Text className="text-sm font-semibold text-white">
							Compartilhamento com o poder público
						</Text>
						<Text className="mt-2 text-xs text-white/70">
							Você autorizou envio de relatórios consolidados para a SLUM. Revisão
							anual em março/2026.
						</Text>
					</View>
				</View>
			</View>

			<View className="gap-3">
				<Text className="text-primary-100 text-sm font-semibold tracking-wide uppercase">
					Sessões ativas
				</Text>
				<View className="rounded-3xl border border-white/10 bg-white/5">
					{sessions.map((session, index) => (
						<View
							key={session.id}
							className="gap-1 px-5 py-4"
							style={{
								borderBottomWidth: index === sessions.length - 1 ? 0 : 1,
								borderColor: "rgba(255,255,255,0.07)",
							}}
						>
							<Text className="text-base font-semibold text-white">
								{session.device}
							</Text>
							<Text className="text-sm text-white/70">{session.location}</Text>
							<Text className="text-primary-100 mt-1 text-xs tracking-wide uppercase">
								{session.lastSeen}
							</Text>
							<Pressable
								android_ripple={{ color: "rgba(255,255,255,0.2)", radius: 120 }}
								className="mt-3 self-start rounded-full border border-white/30 px-4 py-1"
							>
								<Text className="text-xs font-semibold tracking-wide text-white uppercase">
									Encerrar sessão
								</Text>
							</Pressable>
						</View>
					))}
				</View>
			</View>

			<View className="gap-3">
				<Text className="text-primary-100 text-sm font-semibold tracking-wide uppercase">
					Dados e suporte
				</Text>
				<View className="gap-3 rounded-3xl border border-white/10 bg-white/5 p-5">
					{dataControls.map((item) => (
						<Pressable
							key={item.title}
							android_ripple={{ color: "rgba(255,255,255,0.15)", radius: 180 }}
							className="rounded-2xl bg-white/5 p-4"
						>
							<Text className="text-base font-semibold text-white">{item.title}</Text>
							<Text className="mt-1 text-sm text-white/70">{item.description}</Text>
						</Pressable>
					))}
					<Pressable className="rounded-2xl border border-white/20 p-4">
						<Text className="text-base font-semibold text-white">Central de ajuda</Text>
						<Text className="mt-1 text-sm text-white/70">
							Perguntas frequentes, contato e status das solicitações.
						</Text>
					</Pressable>
				</View>
			</View>

			<View className="rounded-3xl border border-red-500/40 bg-red-500/10 p-5">
				<Text className="text-base font-semibold text-red-100">Zona crítica</Text>
				<Text className="mt-2 text-sm text-red-100/80">
					Encerrar conta remove acesso e histórico após 30 dias. Solicite somente se tiver
					feito backup dos dados.
				</Text>
				<Pressable className="mt-4 rounded-full bg-red-500 px-5 py-3">
					<Text className="text-center text-base font-semibold text-white">
						Desativar minha conta
					</Text>
				</Pressable>
			</View>
		</StyledScrollView>
	);
}
