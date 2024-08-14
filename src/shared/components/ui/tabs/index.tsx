import { Tabs as RadixTabs } from '@radix-ui/themes';

const Tabs = RadixTabs.Root;
const TabsList = RadixTabs.List;
const TabsTrigger = RadixTabs.Trigger;
const TabsContent = RadixTabs.Content;

Tabs.displayName = 'Tabs';
TabsList.displayName = 'TabsList';
TabsTrigger.displayName = 'TabsTrigger';
TabsContent.displayName = 'TabsContent';

export { Tabs, TabsList, TabsTrigger, TabsContent };
