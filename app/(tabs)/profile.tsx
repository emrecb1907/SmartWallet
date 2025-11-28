import { SafeView } from '@/components/SafeView';
import { User, Bell, Lock, Fingerprint, HelpCircle, Trash2, ArrowRight, Edit2, LogOut } from 'lucide-react-native';
import React, { useState, useEffect } from 'react';
import { ScrollView, Text, TouchableOpacity, View, Switch, Image } from 'react-native';
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';

const USER_NAME_KEY = '@user_name';

interface SettingItem {
    id: number;
    name: string;
    icon: React.ReactNode;
    hasToggle?: boolean;
    toggleValue?: boolean;
    onToggle?: (value: boolean) => void;
    isDanger?: boolean;
}

interface SettingsSection {
    title: string;
    items: SettingItem[];
}

export default function ProfileScreen() {
    const { t } = useTranslation('profile');
    const [userName, setUserName] = useState('Emre');
    const [biometricEnabled, setBiometricEnabled] = useState(true);

    useEffect(() => {
        loadUserName();
    }, []);

    const loadUserName = async () => {
        try {
            const savedName = await AsyncStorage.getItem(USER_NAME_KEY);
            if (savedName) {
                setUserName(savedName);
            }
        } catch (error) {
            console.error('Error loading user name:', error);
        }
    };

    const accountSettings: SettingItem[] = [
        {
            id: 1,
            name: 'Personal Information',
            icon: <User size={20} color="#FFFFFF" />,
        },
        {
            id: 2,
            name: 'Notifications',
            icon: <Bell size={20} color="#FFFFFF" />,
        },
    ];

    const securitySettings: SettingItem[] = [
        {
            id: 3,
            name: 'Change Password',
            icon: <Lock size={20} color="#FFFFFF" />,
        },
        {
            id: 4,
            name: 'Biometric Access',
            icon: <Fingerprint size={20} color="#FFFFFF" />,
            hasToggle: true,
            toggleValue: biometricEnabled,
            onToggle: setBiometricEnabled,
        },
    ];

    const otherSettings: SettingItem[] = [
        {
            id: 5,
            name: 'Help & Support',
            icon: <HelpCircle size={20} color="#FFFFFF" />,
        },
        {
            id: 6,
            name: 'Delete Account',
            icon: <Trash2 size={20} color="#EF4444" />,
            isDanger: true,
        },
    ];

    const sections: SettingsSection[] = [
        { title: 'ACCOUNT', items: accountSettings },
        { title: 'SECURITY', items: securitySettings },
        { title: 'OTHER', items: otherSettings },
    ];

    const renderSettingItem = (item: SettingItem, isLast: boolean) => (
        <View key={item.id}>
            <TouchableOpacity className="flex-row items-center justify-between py-4">
                <View className="flex-row items-center gap-4 flex-1">
                    <View className="w-10 h-10 items-center justify-center">
                        {item.icon}
                    </View>
                    <Text 
                        className={`flex-1 font-medium ${item.isDanger ? 'text-danger' : 'text-primary'}`}
                    >
                        {item.name}
                    </Text>
                </View>
                {item.hasToggle ? (
                    <Switch
                        value={item.toggleValue}
                        onValueChange={item.onToggle}
                        trackColor={{ false: '#262626', true: '#3B82F6' }}
                        thumbColor="#FFFFFF"
                        ios_backgroundColor="#262626"
                    />
                ) : (
                    <ArrowRight size={20} color="#A3A3A3" />
                )}
            </TouchableOpacity>
            {!isLast && <View className="h-px bg-border" />}
        </View>
    );

    return (
        <SafeView className="flex-1 bg-background">
            <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
                {/* Header */}
                <View className="flex-row items-center justify-between px-4 pt-4 pb-6">
                    <Text className="text-primary text-2xl font-bold">Profile</Text>
                    <TouchableOpacity className="w-10 h-10 rounded-xl bg-card items-center justify-center border border-border">
                        <LogOut size={20} color="#FFFFFF" />
                    </TouchableOpacity>
                </View>

                {/* User Info Section */}
                <View className="items-center mb-8">
                    <View className="relative mb-4">
                        <View className="w-24 h-24 rounded-full bg-accent items-center justify-center">
                            <Text className="text-white text-3xl font-bold">
                                {userName.charAt(0).toUpperCase()}
                            </Text>
                        </View>
                        <TouchableOpacity className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-accent items-center justify-center border-2 border-background">
                            <Edit2 size={14} color="#FFFFFF" />
                        </TouchableOpacity>
                    </View>
                    <Text className="text-primary text-2xl font-bold mb-1">{userName}</Text>
                    <Text className="text-secondary text-base">{userName.toLowerCase()}@email.com</Text>
                </View>

                {/* Settings Sections */}
                <View className="px-4 gap-6 mb-20">
                    {sections.map((section) => (
                        <View key={section.title} className="bg-card rounded-2xl p-4 border border-border">
                            <Text className="text-secondary text-xs font-semibold mb-3 uppercase tracking-wider">
                                {section.title}
                            </Text>
                            <View>
                                {section.items.map((item, index) => 
                                    renderSettingItem(item, index === section.items.length - 1)
                                )}
                            </View>
                        </View>
                    ))}
                </View>
            </ScrollView>
        </SafeView>
    );
}
