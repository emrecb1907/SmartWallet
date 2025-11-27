import { SafeView } from '@/components/SafeView';
import LottieView from 'lottie-react-native';
import { useEffect, useRef } from 'react';
import { Button, StyleSheet, View } from 'react-native';

export default function AnalyticsScreen() {
    const animation = useRef<LottieView>(null);

    useEffect(() => {
        // You can control the ref programmatically, rather than using autoPlay
        // animation.current?.play();
    }, []);

    return (
        <SafeView className="flex-1 bg-background">
            <View style={styles.animationContainer}>
                <LottieView
                    autoPlay
                    ref={animation}
                    style={{
                        width: 200,
                        height: 200,
                        backgroundColor: '#eee',
                    }}
                    // Find more Lottie files at https://lottiefiles.com/featured
                    source={require('../../assets/CreditCard.json')}
                />
                <View style={styles.buttonContainer}>
                    <Button
                        title="Restart Animation"
                        onPress={() => {
                            animation.current?.reset();
                            animation.current?.play();
                        }}
                    />
                </View>
            </View>
        </SafeView>
    );
}

const styles = StyleSheet.create({
    animationContainer: {
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
    buttonContainer: {
        paddingTop: 20,
    },
});
