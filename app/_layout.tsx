import { TabList, Tabs, TabSlot, TabTrigger } from 'expo-router/ui';

import { TabButton } from '@/components/tab-button';
import { AppTabList } from '@/components/tab-list';
import "../global.css";

export default function Layout() {
  return (
    <Tabs>
      <TabSlot />
      <TabList asChild>
        <AppTabList>
          <TabTrigger asChild name="community" href="/community">
            <TabButton />
          </TabTrigger>
          <TabTrigger asChild name="reports" href="/reports">
            <TabButton />
          </TabTrigger>
          <TabTrigger asChild name="home" href="/">
            <TabButton />
          </TabTrigger>
          <TabTrigger asChild name="account" href="/account">
            <TabButton />
          </TabTrigger>
        </AppTabList>
      </TabList>
    </Tabs>
  )
}
