import { usePathname } from "expo-router";
import { TabList, Tabs, TabSlot, TabTrigger } from "expo-router/ui";

// Components
import { TabButton } from "@/components/tab-button";
import { AppTabList } from "@/components/tab-list";

// Icons
import AccountIconFilled from "@/assets/icons/filled/account.svg";
import CommunityIconFilled from "@/assets/icons/filled/community.svg";
import HomeIconFilled from "@/assets/icons/filled/home.svg";
import ReportsIconFilled from "@/assets/icons/filled/reports.svg";

export default function Layout() {
	const pathname = usePathname();

	return (
		<Tabs>
			<TabSlot />
			<TabList asChild>
				<AppTabList>
					<TabTrigger name="community" href="/community" asChild>
						<TabButton
							title="Comunidade"
							isSelected={pathname === "/community"}
							icon={CommunityIconFilled}
						/>
					</TabTrigger>
					<TabTrigger name="reports" href="/reports" asChild>
						<TabButton
							title="Relatórios"
							isSelected={pathname === "/reports"}
							icon={ReportsIconFilled}
						/>
					</TabTrigger>
					<TabTrigger name="home" href="/(tabs)" asChild>
						<TabButton
							title="Início"
							isSelected={pathname === "/"}
							icon={HomeIconFilled}
						/>
					</TabTrigger>
					<TabTrigger name="account" href="/account" asChild>
						<TabButton
							title="Conta"
							isSelected={pathname === "/account"}
							icon={AccountIconFilled}
						/>
					</TabTrigger>
				</AppTabList>
			</TabList>
		</Tabs>
	);
}
