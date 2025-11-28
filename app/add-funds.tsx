import { SafeView } from '@/components/SafeView';
import { ArrowLeft, Building2, CreditCard, Plus, Circle } from 'lucide-react-native';
import React, { useState } from 'react';
import { ScrollView, Text, TextInput, TouchableOpacity, View, KeyboardAvoidingView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';

interface FundingSource {
    id: number;
    name: string;
    lastDigits: string;
    type: 'bank' | 'card';
    icon: React.ReactNode;
}

export default function AddFundsScreen() {
    const { t } = useTranslation();
    const router = useRouter();
    const [amount, setAmount] = useState('100.00');
    const [selectedAmount, setSelectedAmount] = useState(100);
    const [selectedSource, setSelectedSource] = useState(1);

    const presetAmounts = [25, 50, 100, 200];

    const fundingSources: FundingSource[] = [
        {
            id: 1,
            name: 'Bank Account',
            lastDigits: '1234',
            type: 'bank',
            icon: <Building2 size={24} color="#A3A3A3" />,
        },
        {
            id: 2,
            name: 'Debit Card',
            lastDigits: '5678',
            type: 'card',
            icon: <CreditCard size={24} color="#A3A3A3" />,
        },
    ];

    const handlePresetAmount = (value: number) => {
        setSelectedAmount(value);
        setAmount(value.toFixed(2));
    };

    const handleAmountChange = (text: string) => {
        // Remove non-numeric characters except decimal point
        const cleaned = text.replace(/[^0-9.]/g, '');
        
        // Ensure only one decimal point
        const parts = cleaned.split('.');
        if (parts.length > 2) {
            return;
        }
        
        // Limit to 2 decimal places
        if (parts[1] && parts[1].length > 2) {
            return;
        }
        
        setAmount(cleaned);
        if (cleaned) {
            const numValue = parseFloat(cleaned);
            if (!isNaN(numValue)) {
                setSelectedAmount(numValue);
            }
        }
    };

    const formatAmount = (value: string) => {
        if (!value) return '0.00';
        const num = parseFloat(value);
        if (isNaN(num)) return '0.00';
        return num.toFixed(2);
    };

    return (
        <SafeView className="flex-1 bg-background">
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                className="flex-1"
            >
                <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
                    {/* Header */}
                    <View className="flex-row items-center justify-between px-4 pt-4 pb-6">
                        <TouchableOpacity onPress={() => router.back()}>
                            <ArrowLeft size={24} color="#FFFFFF" />
                        </TouchableOpacity>
                        <Text className="text-primary text-xl font-semibold">Add Funds</Text>
                        <View style={{ width: 24 }} />
                    </View>

                    {/* Amount Input Section */}
                    <View className="px-4 mb-6">
                        <View className="bg-card rounded-2xl p-6 border border-border">
                            <Text className="text-secondary text-sm mb-4">Amount</Text>
                            <View className="flex-row items-baseline">
                                <Text className="text-secondary text-4xl font-normal mr-2">$</Text>
                                <TextInput
                                    className="flex-1 text-primary text-5xl font-bold"
                                    value={amount}
                                    onChangeText={handleAmountChange}
                                    placeholder="0.00"
                                    placeholderTextColor="#A3A3A3"
                                    keyboardType="decimal-pad"
                                    selectTextOnFocus
                                    style={{ padding: 0 }}
                                />
                            </View>
                        </View>
                    </View>

                    {/* Preset Amount Buttons */}
                    <View className="px-4 mb-8">
                        <View className="flex-row gap-3">
                            {presetAmounts.map((value) => (
                                <TouchableOpacity
                                    key={value}
                                    onPress={() => handlePresetAmount(value)}
                                    className={`flex-1 py-3 rounded-xl border ${
                                        selectedAmount === value
                                            ? 'bg-accent border-accent'
                                            : 'bg-card border-border'
                                    }`}
                                >
                                    <Text
                                        className={`text-center font-semibold ${
                                            selectedAmount === value
                                                ? 'text-white'
                                                : 'text-primary'
                                        }`}
                                    >
                                        ${value}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>

                    {/* Funding Source Section */}
                    <View className="px-4 mb-6">
                        <Text className="text-primary text-lg font-semibold mb-4">Funding Source</Text>
                        
                        <View className="gap-3 mb-4">
                            {fundingSources.map((source) => (
                                <TouchableOpacity
                                    key={source.id}
                                    onPress={() => setSelectedSource(source.id)}
                                    className="bg-card rounded-xl p-4 border border-border flex-row items-center justify-between"
                                >
                                    <View className="flex-row items-center gap-4 flex-1">
                                        <View className="w-12 h-12 rounded-full bg-background items-center justify-center">
                                            {source.icon}
                                        </View>
                                        <View className="flex-1">
                                            <Text className="text-primary font-medium text-base">{source.name}</Text>
                                            <Text className="text-secondary text-sm">... {source.lastDigits}</Text>
                                        </View>
                                    </View>
                                    <View className="w-6 h-6 rounded-full border-2 items-center justify-center"
                                        style={{
                                            borderColor: selectedSource === source.id ? '#3B82F6' : '#262626',
                                        }}
                                    >
                                        {selectedSource === source.id && (
                                            <View className="w-3 h-3 rounded-full bg-accent" />
                                        )}
                                    </View>
                                </TouchableOpacity>
                            ))}
                        </View>

                        {/* Add New Source Button */}
                        <TouchableOpacity className="bg-transparent rounded-xl p-4 border-2 border-dashed border-border flex-row items-center justify-center gap-2">
                            <Plus size={20} color="#3B82F6" />
                            <Text className="text-accent font-medium">Add New Source</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Add Funds Button */}
                    <View className="px-4 mb-8">
                        <TouchableOpacity
                            className="bg-accent rounded-xl py-4 items-center justify-center"
                            onPress={() => {
                                // Handle add funds action
                                console.log('Adding funds:', amount, 'from source:', selectedSource);
                            }}
                        >
                            <Text className="text-white font-semibold text-lg">Add Funds</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeView>
    );
}

