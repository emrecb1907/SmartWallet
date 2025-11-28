import { SafeView } from '@/components/SafeView';
import { ArrowLeft, Plus, Wifi, Droplet, Zap, Tv, MoreHorizontal, Smartphone, Plug } from 'lucide-react-native';
import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'expo-router';

interface UpcomingBill {
    id: number;
    name: string;
    dueDate: string;
    amount: string;
    status: 'pending' | 'upcoming';
    icon: React.ReactNode;
    iconColor: string;
}

interface PaidBill {
    id: number;
    name: string;
    date: string;
    amount: string;
    icon: React.ReactNode;
    iconColor: string;
}

interface BillerCategory {
    id: number;
    name: string;
    icon: React.ReactNode;
}

const upcomingBills: UpcomingBill[] = [
    {
        id: 1,
        name: 'Internet',
        dueDate: 'Due in 3 days',
        amount: '$59.99',
        status: 'pending',
        icon: <Wifi size={20} color="#EF4444" />,
        iconColor: '#EF4444',
    },
    {
        id: 2,
        name: 'Water Bill',
        dueDate: 'Due in 10 days',
        amount: '$35.50',
        status: 'upcoming',
        icon: <Droplet size={20} color="#3B82F6" />,
        iconColor: '#3B82F6',
    },
];

const paidBills: PaidBill[] = [
    {
        id: 1,
        name: 'Electricity Bill',
        date: '25 September 2025',
        amount: '-$120.00',
        icon: <Zap size={20} color="#FACC15" />,
        iconColor: '#FACC15',
    },
    {
        id: 2,
        name: 'Rent Payment',
        date: '01 October 2025',
        amount: '-$850.00',
        icon: (
            <View style={{ width: 20, height: 20, borderRadius: 10, backgroundColor: '#F97316', alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ color: '#FFFFFF', fontSize: 10, fontWeight: 'bold' }}>R</Text>
            </View>
        ),
        iconColor: '#F97316',
    },
];

const billerCategories: BillerCategory[] = [
    {
        id: 1,
        name: 'Mobile',
        icon: <Smartphone size={24} color="#3B82F6" />,
    },
    {
        id: 2,
        name: 'Electricity',
        icon: <Plug size={24} color="#3B82F6" />,
    },
    {
        id: 3,
        name: 'Cable TV',
        icon: <Tv size={24} color="#3B82F6" />,
    },
    {
        id: 4,
        name: 'More',
        icon: <MoreHorizontal size={24} color="#3B82F6" />,
    },
];

export default function PayScreen() {
    const { t } = useTranslation('pay');
    const router = useRouter();

    return (
        <SafeView className="flex-1 bg-background">
            <ScrollView className="flex-1 px-4" showsVerticalScrollIndicator={false}>
                {/* Header */}
                <View className="flex-row items-center justify-between mt-4 mb-6">
                    <TouchableOpacity onPress={() => router.back()}>
                        <ArrowLeft size={24} color="#FFFFFF" />
                    </TouchableOpacity>
                    <Text className="text-primary text-xl font-semibold">{t('payBills')}</Text>
                    <TouchableOpacity className="w-10 h-10 rounded-full bg-card items-center justify-center border border-border">
                        <Plus size={20} color="#FFFFFF" />
                    </TouchableOpacity>
                </View>

                {/* Upcoming Bills Section */}
                <View className="mb-6">
                    <View className="bg-card rounded-2xl p-4 border border-border">
                        <View className="flex-row justify-between items-center mb-4">
                            <Text className="text-primary text-lg font-semibold">Upcoming Bills</Text>
                            <TouchableOpacity>
                                <Text className="text-accent text-sm font-medium">See All</Text>
                            </TouchableOpacity>
                        </View>

                        <View className="gap-4">
                            {upcomingBills.map((bill) => (
                                <View key={bill.id} className="flex-row items-center justify-between">
                                    <View className="flex-row items-center gap-3 flex-1">
                                        <View 
                                            className="w-12 h-12 rounded-full items-center justify-center"
                                            style={{ backgroundColor: '#262626' }}
                                        >
                                            {bill.icon}
                                        </View>
                                        <View className="flex-1">
                                            <Text className="text-primary font-semibold text-base">{bill.name}</Text>
                                            <Text className="text-secondary text-sm">{bill.dueDate}</Text>
                                        </View>
                                    </View>
                                    <View className="items-end">
                                        <Text className="text-primary font-semibold text-base">{bill.amount}</Text>
                                        {bill.status === 'pending' && (
                                            <Text className="text-danger text-xs mt-1">Pending</Text>
                                        )}
                                    </View>
                                </View>
                            ))}
                        </View>
                    </View>
                </View>

                {/* Biller Categories Section */}
                <View className="mb-6">
                    <Text className="text-primary text-lg font-semibold mb-4">Biller Categories</Text>
                    <View className="flex-row justify-between">
                        {billerCategories.map((category) => (
                            <TouchableOpacity key={category.id} className="items-center">
                                <View className="w-16 h-16 rounded-full bg-card items-center justify-center border border-border mb-2">
                                    {category.icon}
                                </View>
                                <Text className="text-secondary text-xs text-center">{category.name}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                {/* Paid History Section */}
                <View className="mb-20">
                    <View className="flex-row justify-between items-center mb-4">
                        <Text className="text-primary text-lg font-semibold">Paid History</Text>
                        <TouchableOpacity>
                            <Text className="text-accent text-sm font-medium">See All</Text>
                        </TouchableOpacity>
                    </View>

                    <View className="gap-4">
                        {paidBills.map((bill) => (
                            <View key={bill.id} className="flex-row items-center justify-between">
                                <View className="flex-row items-center gap-3 flex-1">
                                    <View 
                                        className="w-12 h-12 rounded-full items-center justify-center"
                                        style={{ backgroundColor: '#262626' }}
                                    >
                                        {bill.icon}
                                    </View>
                                    <View className="flex-1">
                                        <Text className="text-primary font-semibold text-base">{bill.name}</Text>
                                        <Text className="text-secondary text-sm">{bill.date}</Text>
                                    </View>
                                </View>
                                <View className="items-end">
                                    <Text className="text-primary font-semibold text-base">{bill.amount}</Text>
                                    <Text className="text-success text-xs mt-1">Paid</Text>
                                </View>
                            </View>
                        ))}
                    </View>
                </View>
            </ScrollView>
        </SafeView>
    );
}
