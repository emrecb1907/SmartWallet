import { SafeView } from '@/components/SafeView';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ArrowLeft, Bell, Check } from 'lucide-react-native';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { useTranslation } from 'react-i18next';


export default function ConfirmPaymentScreen() {
    const { t } = useTranslation('confirm-payment');
    const router = useRouter();
    const { amount } = useLocalSearchParams();

    return (
        <SafeView className="flex-1 bg-background px-4">
            {/* Header */}
            <View className="flex-row justify-between items-center mt-4 mb-8">
                <TouchableOpacity onPress={() => router.back()} className="w-10 h-10 rounded-full bg-card items-center justify-center border border-border">
                    <ArrowLeft size={20} color="#FFFFFF" />
                </TouchableOpacity>
                <Text className="text-primary text-xl font-semibold">{t('confirmPayment')}</Text>
                <TouchableOpacity className="w-10 h-10 rounded-full bg-card items-center justify-center border border-border">
                    <Bell size={20} color="#FFFFFF" />
                </TouchableOpacity>
            </View>

            <View className="flex-1 items-center justify-center">
                <View className="w-24 h-24 rounded-full bg-accent/20 items-center justify-center mb-6 border border-accent/50">
                    <View className="w-16 h-16 rounded-full bg-accent items-center justify-center">
                        <Text className="text-white text-3xl font-bold">$</Text>
                    </View>
                </View>

                <Text className="text-secondary text-lg mb-2">{t('sendingPayment')}</Text>
                <Text className="text-primary text-4xl font-bold mb-8">${amount || '0.00'}</Text>

                <View className="w-full bg-card rounded-2xl p-6 border border-border mb-8">
                    <View className="flex-row justify-between items-center mb-4 pb-4 border-b border-border">
                        <Text className="text-secondary">{t('to')}</Text>
                        <View className="flex-row items-center gap-2">
                            <Image
                                source={{ uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop' }}
                                className="w-6 h-6 rounded-full"
                            />
                            <Text className="text-primary font-medium">Dipa Luca</Text>
                        </View>
                    </View>
                    <View className="flex-row justify-between items-center mb-4 pb-4 border-b border-border">
                        <Text className="text-secondary">{t('account')}</Text>
                        <Text className="text-primary font-medium">.... 6564</Text>
                    </View>
                    <View className="flex-row justify-between items-center">
                        <Text className="text-secondary">{t('date')}</Text>
                        <Text className="text-primary font-medium">Oct 25, 2025</Text>
                    </View>
                </View>
            </View>

            <View className="mb-8">
                <TouchableOpacity
                    onPress={() => router.push('/(tabs)')}
                    className="w-full bg-accent py-4 rounded-xl items-center flex-row justify-center gap-2"
                >
                    <Text className="text-white font-bold text-lg">{t('confirmPayment')}</Text>
                    <Check size={20} color="#FFFFFF" />
                </TouchableOpacity>
            </View>
        </SafeView>
    );
}
