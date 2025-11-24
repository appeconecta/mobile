import { TabList, Tabs, TabSlot, TabTrigger } from 'expo-router/ui';
import { Text } from 'react-native';

export default function Layout() {
	return (
		<Tabs>
			<TabSlot />
			<TabList className='flex absolute bottom-8 items-center justify-center border border-red-500 p-2 w-full'>
				<TabTrigger className='flex-1 border border-blue-500 items-center justify-center' name="community" href="/community">
					<Text>Community</Text>
				</TabTrigger>
				<TabTrigger className='flex-1 border border-blue-500 items-center justify-center' name="reports" href="/reports">
					<Text>Reports</Text>
				</TabTrigger>
				<TabTrigger className='flex-1 border border-blue-500 items-center justify-center' name="home" href="/">
					<Text>Home</Text>
				</TabTrigger>
				<TabTrigger className='flex-1 border border-blue-500 items-center justify-center' name="account" href="/account">
					<Text>Account</Text>
				</TabTrigger>
			</TabList>
		</Tabs>
	)
}
