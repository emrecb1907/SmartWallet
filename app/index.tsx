import { useEffect } from 'react';
import { useRouter } from 'expo-router';
import { View, ActivityIndicator } from 'react-native';

export default function Index() {
    const router = useRouter();

    useEffect(() => {
        // Redirect to onboarding on app start
        router.replace('/onboarding');
    }, []);

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F8F9FA' }}>
            <ActivityIndicator size="large" color="#3B82F6" />
        </View>
    );
}

