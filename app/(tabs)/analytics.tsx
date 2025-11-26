import { SafeView } from '@/components/SafeView';
import { Text } from 'react-native';

export default function AnalyticsScreen() {
    return (
        <SafeView className="flex-1 bg-background items-center justify-center">
            <Text className="text-primary text-xl font-semibold">Analytics</Text>
        </SafeView>
    );
}
