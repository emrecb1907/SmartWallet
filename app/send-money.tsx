import { SafeView } from '@/components/SafeView';
import { useRouter } from 'expo-router';
import { ArrowLeft, Bell } from 'lucide-react-native';
import React, { useState } from 'react';
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useTranslation } from 'react-i18next';


export default function SendMoneyScreen() {
    const { t } = useTranslation('send-money');
    const router = useRouter();
    const [amount, setAmount] = useState('');

    const handleNumberPress = (num: string) => {
        setAmount(prev => prev + num);
    };

    const handleDelete = () => {
        setAmount(prev => prev.slice(0, -1));
    };

    return (
        <SafeView className="flex-1 bg-background px-4">
            {/* Header */}
            <View className="flex-row justify-between items-center mt-4 mb-8">
                <TouchableOpacity onPress={() => router.back()} className="w-10 h-10 rounded-full bg-card items-center justify-center border border-border">
                    <ArrowLeft size={20} color="#FFFFFF" />
                </TouchableOpacity>
                <Text className="text-primary text-xl font-semibold">{t('sendMoney')}</Text>
                <TouchableOpacity className="w-10 h-10 rounded-full bg-card items-center justify-center border border-border">
                    <Bell size={20} color="#FFFFFF" />
                </TouchableOpacity>
            </View>

            {/* Recipient */}
            <View className="flex-row items-center gap-4 mb-8 bg-card p-4 rounded-2xl border border-border">
                <View className="w-12 h-12 rounded-full bg-gray-700 overflow-hidden">
                    <Image
                        source={{ uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop' }}
                        className="w-full h-full"
                    />
                </View>
                <View>
                    <Text className="text-primary font-semibold text-lg">Dipa Luca</Text>
                    <Text className="text-secondary text-sm">5345 2331 3132 6564</Text>
                </View>
            </View>

            {/* Amount Input */}
            <View className="mb-8">
                <Text className="text-secondary text-sm mb-2">{t('enterAmount')}</Text>
                <View className="bg-card rounded-2xl p-4 border border-border flex-row items-center justify-between">
                    <Text className="text-primary text-3xl font-bold">$</Text>
                    <TextInput
                        className="flex-1 text-primary text-3xl font-bold text-right"
                        value={amount}
                        editable={false}
                        placeholder="0.00"
                        placeholderTextColor="#525252"
                    />
                </View>
            </View>

            {/* Number Pad */}
            <View className="flex-1 justify-end mb-8">
                <View className="flex-row flex-wrap justify-between gap-y-6">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, '.', 0].map((num) => (
                        <TouchableOpacity
                            key={num}
                            onPress={() => handleNumberPress(num.toString())}
                            className="w-[30%] h-16 items-center justify-center rounded-xl bg-card/50"
                        >
                            <Text className="text-primary text-2xl font-medium">{num}</Text>
                        </TouchableOpacity>
                    ))}
                    <TouchableOpacity
                        onPress={handleDelete}
                        className="w-[30%] h-16 items-center justify-center rounded-xl bg-card/50"
                    >
                        <Text className="text-primary text-2xl font-medium">⌫</Text>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity
                    onPress={() => router.push({ pathname: '/confirm-payment', params: { amount } })}
                    className="w-full bg-accent py-4 rounded-xl items-center mt-8"
                >
                    <Text className="text-white font-bold text-lg">{t('next')}</Text>
                </TouchableOpacity>
            </View>
        </SafeView>
    );
}
