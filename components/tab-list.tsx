import { View } from "react-native";

interface TabButtonProps {
    children?: React.ReactNode;
}

export function AppTabList({ children }: TabButtonProps) {
    return <View className="flex flex-row absolute bottom-8 items-center justify-center border border-red-500 p-2 w-full">
        {children}
    </View>;
}