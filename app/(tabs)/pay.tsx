import { SafeView } from '@/components/SafeView';
import { CreditCard, Droplet, Heart, ScanLine, Search, SlidersHorizontal } from 'lucide-react-native';
import React from 'react';
import { ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';


const savedBillers = [
    { id: 1, name: 'Dot Net', icon: 'wifi', color: '#6366F1' },
    { id: 2, name: 'Electric', icon: 'zap', color: '#EAB308' },
    { id: 3, name: 'Netflix', icon: 'tv', color: '#EF4444' },
    { id: 4, name: 'Insurance', icon: 'shield', color: '#22C55E' },
];

const allBillers = [
    {
        id: 1,
        name: 'NID Services',
        category: 'Govt. Fees',
        icon: <CreditCard size={20} color="#FFFFFF" />,
        bg: '#3B82F6',
    },
    {
        id: 2,
        name: 'Zuno Health',
        category: 'Health Insurance Service',
        icon: <Heart size={20} color="#FFFFFF" />,
        bg: '#EF4444',
    },
    {
        id: 3,
        name: 'Visa Credit Card Bill',
        category: 'Credit Card',
        icon: <CreditCard size={20} color="#FFFFFF" />,
        bg: '#F59E0B',
    },
    {
        id: 4,
        name: 'Ass Sunnah Foundation',
        category: 'Humanitarian Services',
        icon: <Droplet size={20} color="#FFFFFF" />,
        bg: '#10B981',
    },
];

export default function PayScreen() {
    return (
        <SafeView className="flex-1 bg-background">
            <ScrollView className="flex-1 px-4" showsVerticalScrollIndicator={false}>
                {/* Header */}
                <View className="flex-row items-center mt-4 mb-6">
                    <TouchableOpacity className="mr-4">
                        {/* Back button placeholder if needed, or just title */}
                    </TouchableOpacity>
                    <View className="flex-1 items-center">
                        <Text className="text-primary text-xl font-semibold">Pay Bills</Text>
                    </View>
                    <TouchableOpacity className="w-10 h-10 rounded-full bg-card items-center justify-center border border-border">
                        <View className="w-2 h-2 rounded-full bg-red-500 absolute top-2 right-2" />
                        <ScanLine size={20} color="#FFFFFF" />
                    </TouchableOpacity>
                </View>

                {/* QR Scanner Button */}
                <TouchableOpacity className="flex-row items-center justify-center gap-3 bg-card p-4 rounded-xl border border-border mb-8">
                    <ScanLine size={24} color="#FFFFFF" />
                    <Text className="text-primary font-medium">Tap To Scan QR Code</Text>
                </TouchableOpacity>

                {/* Saved Billers */}
                <View className="mb-8">
                    <View className="flex-row justify-between items-center mb-4">
                        <Text className="text-primary text-lg font-semibold">Saved Biller</Text>
                        <TouchableOpacity>
                            <Text className="text-secondary text-sm">Manage (13)</Text>
                        </TouchableOpacity>
                    </View>

                    <ScrollView horizontal showsHorizontalScrollIndicator={false} className="gap-4">
                        {savedBillers.map((biller) => (
                            <TouchableOpacity key={biller.id} className="items-center mr-4">
                                <View className="w-14 h-14 rounded-xl items-center justify-center mb-2" style={{ backgroundColor: '#1C1C1C', borderColor: '#262626', borderWidth: 1 }}>
                                    {/* Placeholder icons */}
                                    <View style={{ width: 24, height: 24, borderRadius: 4, backgroundColor: biller.color }} />
                                </View>
                                <Text className="text-secondary text-xs">{biller.name}</Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>

                {/* Search */}
                <View className="mb-6">
                    <Text className="text-primary text-lg font-semibold mb-3">Search For a Biller</Text>
                    <View className="flex-row items-center bg-card rounded-xl px-4 py-3 border border-border">
                        <Search size={20} color="#A3A3A3" className="mr-3" />
                        <TextInput
                            placeholder="Search organisation name or type"
                            placeholderTextColor="#A3A3A3"
                            className="flex-1 text-primary"
                        />
                    </View>
                </View>

                {/* All Billers */}
                <View className="mb-20">
                    <View className="flex-row justify-between items-center mb-4">
                        <Text className="text-primary text-lg font-semibold">All Billers</Text>
                        <TouchableOpacity>
                            <SlidersHorizontal size={20} color="#A3A3A3" />
                        </TouchableOpacity>
                    </View>

                    <View className="gap-4">
                        {allBillers.map((biller) => (
                            <TouchableOpacity key={biller.id} className="flex-row items-center justify-between bg-transparent py-2">
                                <View className="flex-row items-center gap-4">
                                    <View className="w-12 h-12 rounded-full items-center justify-center" style={{ backgroundColor: '#1C1C1C', borderColor: '#262626', borderWidth: 1 }}>
                                        {biller.icon}
                                    </View>
                                    <View>
                                        <Text className="text-primary font-medium">{biller.name}</Text>
                                        <Text className="text-secondary text-xs">{biller.category}</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>
            </ScrollView>
        </SafeView>
    );
}
