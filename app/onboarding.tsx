import { useRef, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, FlatList, StatusBar } from 'react-native';
import LottieView from 'lottie-react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
    withSpring,
    interpolate,
    Extrapolate,
    Easing,
} from 'react-native-reanimated';
import { SafeView } from '@/components/SafeView';
import { useTranslation } from 'react-i18next';

const ONBOARDING_COMPLETED_KEY = '@onboarding_completed';
const THEME_KEY = '@app_theme';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

interface OnboardingSlide {
    id: number;
    title: string;
    description: string;
    animation: any;
    backgroundColor: string;
}

const getOnboardingData = (t: any): OnboardingSlide[] => [
    {
        id: 1,
        title: t('onboarding:title1'),
        description: t('onboarding:description1'),
        animation: require('../assets/MoneyWallet.json'),
        backgroundColor: '#F8F9FA', // Soft gri-beyaz
    },
    {
        id: 2,
        title: t('onboarding:title2'),
        description: t('onboarding:description2'),
        animation: require('../assets/MoneyInvestment.json'),
        backgroundColor: '#F0F4F8', // Soft mavi-beyaz
    },
    {
        id: 3,
        title: t('onboarding:title3'),
        description: t('onboarding:description3'),
        animation: require('../assets/CreditCard.json'),
        backgroundColor: '#E8F0FE', // Soft mavi
    },
];

export default function OnboardingScreen() {
    const { t } = useTranslation();
    const router = useRouter();
    const flatListRef = useRef<FlatList>(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const animationRefs = useRef<(LottieView | null)[]>([]);
    const fadeAnim = useSharedValue(1);
    const scaleAnim = useSharedValue(1);
    const slideOpacity = useSharedValue(1);
    const scrollX = useSharedValue(0);
    const onboardingData = getOnboardingData(t);

    useEffect(() => {
        // Reset and play animation when screen changes
        if (animationRefs.current[currentIndex]) {
            animationRefs.current[currentIndex]?.reset();
            animationRefs.current[currentIndex]?.play();
        }
        
        // Fade animation for slide transition
        slideOpacity.value = 0;
        slideOpacity.value = withTiming(1, {
            duration: 300,
            easing: Easing.out(Easing.ease),
        });
    }, [currentIndex]);

    const handleNext = () => {
        if (currentIndex < onboardingData.length - 1) {
            // Button scale animation
            scaleAnim.value = withSpring(0.95, {
                damping: 15,
                stiffness: 300,
            });
            setTimeout(() => {
                scaleAnim.value = withSpring(1, {
                    damping: 15,
                    stiffness: 300,
                });
            }, 150);

            const nextIndex = currentIndex + 1;
            flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
        } else {
            handleGetStarted();
        }
    };

    const handleGetStarted = async () => {
        fadeAnim.value = withTiming(0, {
            duration: 250,
            easing: Easing.out(Easing.ease),
        });
        scaleAnim.value = withTiming(0.95, {
            duration: 250,
            easing: Easing.out(Easing.ease),
        });
        
        // Mark onboarding as completed and set theme to dark
        try {
            await AsyncStorage.setItem(ONBOARDING_COMPLETED_KEY, 'true');
            await AsyncStorage.setItem(THEME_KEY, 'dark');
        } catch (error) {
            console.error('Error saving onboarding status:', error);
        }
        
        setTimeout(() => {
            router.replace('/name-input');
        }, 250);
    };

    const handleSkip = async () => {
        // Mark onboarding as completed when skipped and set theme to dark
        try {
            await AsyncStorage.setItem(ONBOARDING_COMPLETED_KEY, 'true');
            await AsyncStorage.setItem(THEME_KEY, 'dark');
        } catch (error) {
            console.error('Error saving onboarding status:', error);
        }
        handleGetStarted();
    };

    const onViewableItemsChanged = useRef(({ viewableItems }: any) => {
        if (viewableItems.length > 0) {
            const index = viewableItems[0].index;
            if (index !== null && index !== currentIndex) {
                setCurrentIndex(index);
            }
        }
    }).current;

    const viewabilityConfig = useRef({
        itemVisiblePercentThreshold: 50,
    }).current;

    const buttonAnimatedStyle = useAnimatedStyle(() => {
        return {
            opacity: fadeAnim.value,
            transform: [{ scale: scaleAnim.value }],
        };
    });

    const slideAnimatedStyle = useAnimatedStyle(() => {
        return {
            opacity: slideOpacity.value,
        };
    });

    const renderItem = ({ item, index }: { item: OnboardingSlide; index: number }) => {
        const isActive = index === currentIndex;
        
        return (
            <Animated.View
                style={[
                    styles.slide,
                    { backgroundColor: item.backgroundColor, width: SCREEN_WIDTH },
                    isActive && slideAnimatedStyle,
                ]}
            >
                <View style={styles.content}>
                    <Text style={styles.title}>{item.title}</Text>
                    <Text style={styles.description}>{item.description}</Text>

                    <View style={styles.animationContainer}>
                        <LottieView
                            ref={(ref) => {
                                animationRefs.current[index] = ref;
                            }}
                            source={item.animation}
                            autoPlay={index === 0}
                            loop
                            style={styles.animation}
                        />
                    </View>
                </View>
            </Animated.View>
        );
    };

    const renderPageIndicator = () => {
        return (
            <View style={styles.indicatorContainer}>
                {onboardingData.map((_, index) => {
                    const isActive = index === currentIndex;
                    return (
                        <Animated.View
                            key={index}
                            style={[
                                styles.indicator,
                                isActive && styles.indicatorActive,
                            ]}
                        />
                    );
                })}
            </View>
        );
    };

    const backgroundAnimatedStyle = useAnimatedStyle(() => {
        return {
            backgroundColor: onboardingData[currentIndex]?.backgroundColor || '#F8F9FA',
        };
    });

    return (
        <Animated.View style={[styles.container, backgroundAnimatedStyle]}>
            <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
            <SafeView className="flex-1" style={{ backgroundColor: 'transparent' }}>
                {/* Skip Button */}
                <TouchableOpacity
                    onPress={handleSkip}
                    style={styles.skipButton}
                    activeOpacity={0.7}
                >
                    <Text style={styles.skipText}>{t('onboarding:skip')}</Text>
                </TouchableOpacity>

            {/* Slides */}
            <FlatList
                ref={flatListRef}
                data={onboardingData}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                scrollEnabled={true}
                onViewableItemsChanged={onViewableItemsChanged}
                viewabilityConfig={viewabilityConfig}
                getItemLayout={(_, index) => ({
                    length: SCREEN_WIDTH,
                    offset: SCREEN_WIDTH * index,
                    index,
                })}
                decelerationRate="fast"
                snapToInterval={SCREEN_WIDTH}
                snapToAlignment="center"
            />

            {/* Page Indicator */}
            {renderPageIndicator()}

            {/* Action Button */}
            <Animated.View style={[styles.buttonContainer, buttonAnimatedStyle]}>
                <TouchableOpacity
                    onPress={handleNext}
                    style={[
                        styles.button,
                        currentIndex === onboardingData.length - 1 && styles.buttonPrimary,
                    ]}
                    activeOpacity={0.8}
                >
                    <Text
                        style={[
                            styles.buttonText,
                            currentIndex === onboardingData.length - 1 && styles.buttonTextPrimary,
                        ]}
                    >
                        {currentIndex === onboardingData.length - 1 ? t('onboarding:getStarted') : t('onboarding:next')}
                    </Text>
                </TouchableOpacity>
            </Animated.View>
            </SafeView>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    slide: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 32,
        paddingTop: 80,
        paddingBottom: 120,
    },
    title: {
        fontSize: 32,
        fontWeight: '700',
        color: '#1A1A1A',
        textAlign: 'center',
        marginBottom: 16,
        letterSpacing: -0.5,
    },
    description: {
        fontSize: 16,
        fontWeight: '400',
        color: '#6B7280',
        textAlign: 'center',
        lineHeight: 24,
        marginBottom: 48,
        paddingHorizontal: 16,
    },
    animationContainer: {
        width: SCREEN_WIDTH * 0.8,
        height: SCREEN_WIDTH * 0.8,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    animation: {
        width: '100%',
        height: '100%',
    },
    skipButton: {
        position: 'absolute',
        top: 60,
        right: 24,
        zIndex: 10,
        paddingVertical: 8,
        paddingHorizontal: 16,
    },
    skipText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#6B7280',
    },
    indicatorContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: 140,
        left: 0,
        right: 0,
        gap: 8,
    },
    indicator: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#D1D5DB',
    },
    indicatorActive: {
        width: 24,
        backgroundColor: '#3B82F6',
    },
    buttonContainer: {
        position: 'absolute',
        bottom: 50,
        left: 0,
        right: 0,
        paddingHorizontal: 24,
    },
    button: {
        backgroundColor: '#FFFFFF',
        paddingVertical: 16,
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#E5E7EB',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
        overflow: 'hidden',
    },
    buttonPrimary: {
        backgroundColor: '#3B82F6',
        borderColor: '#3B82F6',
    },
    buttonText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1A1A1A',
    },
    buttonTextPrimary: {
        color: '#FFFFFF',
    },
});

