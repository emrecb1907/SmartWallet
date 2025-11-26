import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { ArrowDownLeft, ArrowUpRight, Bell, Eye, FileText, Plus } from 'lucide-react-native';
import React from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { BarChart } from 'react-native-gifted-charts';
import { SafeView } from '@/components/SafeView';

const barData = [
  { value: 250, label: '1' },
  { value: 500, label: '5' },
  { value: 745, label: '10', frontColor: '#60A5FA' }, // Highlighted
  { value: 320, label: '15' },
  { value: 600, label: '20' },
  { value: 256, label: '25' },
  { value: 300, label: '30' },
];

const transactions = [
  {
    id: 1,
    name: 'Sent money to Sara',
    date: '02 October 2025',
    amount: '-$120',
    type: 'sent',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop',
  },
  {
    id: 2,
    name: 'Received money from John',
    date: '01 October 2025',
    amount: '+$450',
    type: 'received',
    avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=150&h=150&fit=crop',
  },
  {
    id: 3,
    name: 'Netflix Subscription',
    date: '28 September 2025',
    amount: '-$15.99',
    type: 'sent',
    avatar: 'https://images.unsplash.com/photo-1574375927938-d5a98e8efe30?w=150&h=150&fit=crop', // Placeholder for Netflix
  },
];

export default function HomeScreen() {
  const router = useRouter();

  return (
    <SafeView className="flex-1 bg-background">
      <ScrollView className="flex-1 px-4" showsVerticalScrollIndicator={false}>
        {/* Header Section */}
        <View className="flex-row justify-between items-center mt-4 mb-6">
          <View className="flex-row items-center gap-3">
            <View className="w-10 h-10 rounded-full bg-blue-500 items-center justify-center overflow-hidden">
              <Image
                source={{ uri: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop' }}
                className="w-full h-full"
              />
            </View>
            <View>
              <Text className="text-secondary text-sm">Welcome back,</Text>
              <Text className="text-primary text-xl font-semibold">Hi, Ben 👋</Text>
            </View>
          </View>
          <TouchableOpacity className="w-10 h-10 rounded-full bg-card items-center justify-center border border-border">
            <Bell size={20} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        {/* Balance Card */}
        <LinearGradient
          colors={['#1C1C1C', '#262626']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{ borderRadius: 16, paddingHorizontal: 24, paddingVertical: 20 }}
          className="mb-8 border border-border shadow-md"
        >
          <View className="flex-row justify-between items-start mb-3">
            <View style={{ flex: 1, marginRight: 12 }}>
              <Text className="text-secondary text-base mb-1">My Balance</Text>
              <View className="flex-row items-center gap-2" style={{ flexWrap: 'wrap' }}>
                <Text 
                  className="text-primary font-bold"
                  style={{ fontSize: 26, maxWidth: '85%' }}
                  numberOfLines={1}
                  adjustsFontSizeToFit
                >
                  $3,420.75
                </Text>
                <Eye size={18} color="#A3A3A3" />
              </View>
            </View>
            <TouchableOpacity 
              style={{ flexShrink: 0 }}
              className="bg-white/10 px-3 py-1 rounded-full border border-white/10"
            >
              <Text className="text-primary text-xs">Add Funds</Text>
            </TouchableOpacity>
          </View>

          {/* Decorative element */}
          <View className="absolute right-0 bottom-0 opacity-10">
            {/* Abstract shape or pattern could go here */}
          </View>
        </LinearGradient>

        {/* Quick Actions */}
        <View className="flex-row justify-between mb-8 mt-2">
          <TouchableOpacity
            className="flex-1 items-center gap-2"
            onPress={() => router.push('/send-money')}
          >
            <View className="w-14 h-14 rounded-full bg-card items-center justify-center border border-border">
              <ArrowUpRight size={24} color="#FFFFFF" />
            </View>
            <Text className="text-secondary text-xs">Send</Text>
          </TouchableOpacity>
          <TouchableOpacity className="flex-1 items-center gap-2">
            <View className="w-14 h-14 rounded-full bg-card items-center justify-center border border-border">
              <ArrowDownLeft size={24} color="#FFFFFF" />
            </View>
            <Text className="text-secondary text-xs">Receive</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="flex-1 items-center gap-2"
            onPress={() => router.push('/pay')}
          >
            <View className="w-14 h-14 rounded-full bg-card items-center justify-center border border-border">
              <FileText size={24} color="#FFFFFF" />
            </View>
            <Text className="text-secondary text-xs">Pay Bills</Text>
          </TouchableOpacity>
        </View>

        {/* Money Spent Chart */}
        <View className="bg-card rounded-2xl p-5 mb-6 border border-border">
          <View className="flex-row justify-between items-center mb-6">
            <Text className="text-primary text-lg font-semibold">Money Spent</Text>
            <TouchableOpacity className="bg-white/5 px-3 py-1 rounded-full border border-white/10">
              <Text className="text-secondary text-xs">This Month</Text>
            </TouchableOpacity>
          </View>

          <View className="items-center">
            <BarChart
              data={barData}
              barWidth={22}
              spacing={14}
              roundedTop
              roundedBottom
              hideRules
              xAxisThickness={0}
              yAxisThickness={0}
              yAxisTextStyle={{ color: '#A3A3A3' }}
              xAxisLabelTextStyle={{ color: '#A3A3A3', fontSize: 10 }}
              noOfSections={3}
              maxValue={1000}
              frontColor="#333"
              gradientColor="#444"
              showGradient
            />
          </View>
        </View>

        {/* Recent Activity */}
        <View className="mb-20">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-primary text-lg font-semibold">Recent Activity</Text>
            <TouchableOpacity>
              <Text className="text-secondary text-sm">See All</Text>
            </TouchableOpacity>
          </View>

          <View className="gap-4">
            {transactions.map((transaction) => (
              <View key={transaction.id} className="flex-row items-center justify-between bg-card p-4 rounded-xl border border-border">
                <View className="flex-row items-center gap-3">
                  <View className="w-10 h-10 rounded-full bg-gray-700 overflow-hidden">
                    <Image source={{ uri: transaction.avatar }} className="w-full h-full" />
                  </View>
                  <View>
                    <Text className="text-primary font-medium">{transaction.name}</Text>
                    <Text className="text-secondary text-xs">{transaction.date}</Text>
                  </View>
                </View>
                <Text className={`font-semibold ${transaction.type === 'received' ? 'text-success' : 'text-primary'}`}>
                  {transaction.amount}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeView>
  );
}
