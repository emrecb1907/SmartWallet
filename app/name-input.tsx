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
        <View style={styles.container}>
            <SafeView className="flex-1" style={{ backgroundColor: '#E8F0FE' }}>
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    style={styles.container}
                >
                    <Animated.View style={[styles.content, containerAnimatedStyle]}>
                        <Animated.View style={styles.iconWrapper}>
                            <View style={styles.iconContainer}>
                                <Sparkles size={40} color="#3B82F6" />
                            </View>
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
                            placeholderTextColor="#9CA3AF"
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
                            <Text style={[
                                styles.buttonText,
                                name.trim().length >= 2 && styles.buttonTextActive
                            ]}>
                                {t('button')}
                            </Text>
                        </TouchableOpacity>
                    </Animated.View>

                    <Text style={styles.hint}>
                        {t('hint')}
                    </Text>
                </Animated.View>
            </KeyboardAvoidingView>
        </SafeView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E8F0FE',
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
        backgroundColor: '#FFFFFF',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
    },
    title: {
        fontSize: 32,
        fontWeight: '700',
        color: '#1A1A1A',
        textAlign: 'center',
        marginBottom: 12,
        letterSpacing: -0.5,
    },
    subtitle: {
        fontSize: 16,
        fontWeight: '400',
        color: '#6B7280',
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
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        paddingHorizontal: 20,
        fontSize: 18,
        fontWeight: '500',
        color: '#1A1A1A',
        borderWidth: 2,
        borderColor: '#E5E7EB',
    },
    inputFocused: {
        borderColor: '#3B82F6',
        backgroundColor: '#FFFFFF',
    },
    charCount: {
        position: 'absolute',
        right: 16,
        top: 16,
    },
    charCountText: {
        fontSize: 12,
        color: '#9CA3AF',
        fontWeight: '500',
    },
    button: {
        width: '100%',
        backgroundColor: '#FFFFFF',
        paddingVertical: 16,
        paddingHorizontal: 20,
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#E5E7EB',
        marginBottom: 16,
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
    buttonActive: {
        backgroundColor: '#3B82F6',
        borderColor: '#3B82F6',
    },
    buttonText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1A1A1A',
    },
    buttonTextActive: {
        color: '#FFFFFF',
    },
    hint: {
        fontSize: 12,
        color: '#6B7280',
        textAlign: 'center',
        marginTop: 8,
    },
});

