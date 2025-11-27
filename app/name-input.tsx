import { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withSpring,
    withTiming,
    Easing,
} from 'react-native-reanimated';
import { SafeView } from '@/components/SafeView';
import { LinearGradient } from 'expo-linear-gradient';
import { Sparkles } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';

const USER_NAME_KEY = '@user_name';

export default function NameInputScreen() {
    const { t } = useTranslation('name-input');
    const router = useRouter();
    const [name, setName] = useState('');
    const [isFocused, setIsFocused] = useState(false);
    const scaleAnim = useSharedValue(1);
    const opacityAnim = useSharedValue(0);

    const handleContinue = async () => {
        if (name.trim().length < 2) {
            // Shake animation for invalid input
            scaleAnim.value = withSpring(0.95, {
                damping: 10,
                stiffness: 200,
            });
            setTimeout(() => {
                scaleAnim.value = withSpring(1, {
                    damping: 10,
                    stiffness: 200,
                });
            }, 100);
            return;
        }

        // Save name to AsyncStorage
        try {
            await AsyncStorage.setItem(USER_NAME_KEY, name.trim());
        } catch (error) {
            console.error('Error saving name:', error);
        }

        // Fade out animation
        opacityAnim.value = withTiming(0, {
            duration: 300,
            easing: Easing.out(Easing.ease),
        });

        setTimeout(() => {
            router.replace('/(tabs)');
        }, 300);
    };

    const buttonAnimatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ scale: scaleAnim.value }],
        };
    });

    const containerAnimatedStyle = useAnimatedStyle(() => {
        return {
            opacity: opacityAnim.value || 1,
        };
    });

    return (
        <LinearGradient
            colors={['#0F172A', '#1E293B', '#334155']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.gradientBackground}
        >
            <SafeView className="flex-1" style={{ backgroundColor: 'transparent' }}>
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    style={styles.container}
                >
                    <Animated.View style={[styles.content, containerAnimatedStyle]}>
                        <Animated.View style={styles.iconWrapper}>
                            <LinearGradient
                                colors={['#3B82F6', '#2563EB', '#1D4ED8']}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 1 }}
                                style={styles.iconContainer}
                            >
                                <Sparkles size={40} color="#FFFFFF" />
                            </LinearGradient>
                        </Animated.View>

                        <Text style={styles.title}>{t('title')}</Text>
                        <Text style={styles.subtitle}>
                            {t('subtitle')}
                        </Text>

                    <View style={styles.inputContainer}>
                        <TextInput
                            style={[
                                styles.input,
                                isFocused && styles.inputFocused,
                            ]}
                            placeholder={t('placeholder')}
                            placeholderTextColor="#6B7280"
                            value={name}
                            onChangeText={setName}
                            onFocus={() => setIsFocused(true)}
                            onBlur={() => setIsFocused(false)}
                            autoFocus
                            autoCapitalize="words"
                            maxLength={30}
                            returnKeyType="done"
                            onSubmitEditing={handleContinue}
                        />
                        {name.length > 0 && (
                            <Animated.View
                                style={[
                                    styles.charCount,
                                    { opacity: name.length > 0 ? 1 : 0 },
                                ]}
                            >
                                <Text style={styles.charCountText}>
                                    {name.length}/30
                                </Text>
                            </Animated.View>
                        )}
                    </View>

                    <Animated.View style={buttonAnimatedStyle}>
                        <TouchableOpacity
                            style={[
                                styles.button,
                                name.trim().length >= 2 && styles.buttonActive,
                            ]}
                            onPress={handleContinue}
                            activeOpacity={0.8}
                        >
                            <LinearGradient
                                colors={
                                    name.trim().length >= 2
                                        ? ['#3B82F6', '#2563EB']
                                        : ['#374151', '#4B5563']
                                }
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                                style={styles.buttonGradient}
                            >
                                <Text style={styles.buttonText}>{t('button')}</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </Animated.View>

                    <Text style={styles.hint}>
                        {t('hint')}
                    </Text>
                </Animated.View>
            </KeyboardAvoidingView>
        </SafeView>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    gradientBackground: {
        flex: 1,
    },
    container: {
        flex: 1,
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 32,
        paddingTop: 60,
        paddingBottom: 40,
    },
    iconWrapper: {
        marginBottom: 32,
    },
    iconContainer: {
        width: 100,
        height: 100,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#3B82F6',
        shadowOffset: {
            width: 0,
            height: 8,
        },
        shadowOpacity: 0.5,
        shadowRadius: 20,
        elevation: 12,
    },
    title: {
        fontSize: 32,
        fontWeight: '700',
        color: '#FFFFFF',
        textAlign: 'center',
        marginBottom: 12,
        letterSpacing: -0.5,
    },
    subtitle: {
        fontSize: 16,
        fontWeight: '400',
        color: '#9CA3AF',
        textAlign: 'center',
        lineHeight: 24,
        marginBottom: 48,
        paddingHorizontal: 16,
    },
    inputContainer: {
        width: '100%',
        marginBottom: 24,
        position: 'relative',
    },
    input: {
        width: '100%',
        height: 56,
        backgroundColor: '#1F2937',
        borderRadius: 16,
        paddingHorizontal: 20,
        fontSize: 18,
        fontWeight: '500',
        color: '#FFFFFF',
        borderWidth: 2,
        borderColor: '#374151',
    },
    inputFocused: {
        borderColor: '#3B82F6',
        backgroundColor: '#111827',
    },
    charCount: {
        position: 'absolute',
        right: 16,
        top: 16,
    },
    charCountText: {
        fontSize: 12,
        color: '#6B7280',
        fontWeight: '500',
    },
    button: {
        width: '100%',
        borderRadius: 16,
        overflow: 'hidden',
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 4,
    },
    buttonActive: {
        shadowColor: '#3B82F6',
        shadowOpacity: 0.4,
    },
    buttonGradient: {
        paddingVertical: 18,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        fontSize: 18,
        fontWeight: '600',
        color: '#FFFFFF',
    },
    hint: {
        fontSize: 12,
        color: '#6B7280',
        textAlign: 'center',
        marginTop: 8,
    },
});

