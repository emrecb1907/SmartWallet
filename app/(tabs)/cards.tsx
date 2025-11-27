import { SafeView } from '@/components/SafeView';
import { LinearGradient } from 'expo-linear-gradient';
import { CreditCard, Lock, MoreHorizontal, Plus, RefreshCw, Smartphone } from 'lucide-react-native';
import React, { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Dimensions, FlatList, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { PieChart } from 'react-native-gifted-charts';

const screenWidth = Dimensions.get('window').width;

interface CardData {
    id: string;
    bankName: string;
    cardType: string;
    cardNumber: string;
    cardHolder: string;
    expires: string;
    gradientColors: string[];
}

const cards: CardData[] = [
    {
        id: '1',
        bankName: 'IBBL',
        cardType: 'VISA',
        cardNumber: '5345 2331 3132 6564',
        cardHolder: 'NURAIYAN SARAH',
        expires: '08/28',
        gradientColors: ['#D4AF37', '#C5A028', '#E5C15D'], // Gold
    },
    {
        id: '2',
        bankName: 'Brac Bank',
        cardType: 'MASTERCARD',
        cardNumber: '4532 8765 4321 9876',
        cardHolder: 'NURAIYAN SARAH',
        expires: '12/26',
        gradientColors: ['#1E3A8A', '#3B82F6', '#60A5FA'], // Blue
    },
    {
        id: '3',
        bankName: 'City Bank',
        cardType: 'VISA',
        cardNumber: '4111 1111 1111 1111',
        cardHolder: 'NURAIYAN SARAH',
        expires: '06/27',
        gradientColors: ['#059669', '#10B981', '#34D399'], // Green
    },
];

export default function CardsScreen() {
    const { t } = useTranslation('cards');
    const [currentCardIndex, setCurrentCardIndex] = useState(0);
    const flatListRef = useRef<FlatList>(null);
    const creditScore = 690;
    const maxScore = 850;
    const minScore = 300;
    const scoreRange = maxScore - minScore;
    const scorePercentage = ((creditScore - minScore) / scoreRange) * 100; // 690 = ~71% of range
    
    // Credit score ranges for gauge visualization:
    // 300-580 (poor/red): 0-51% of range
    // 580-670 (fair/yellow): 51-67% of range  
    // 670-740 (average/yellow-green): 67-80% of range
    // 740-850 (good/green): 80-100% of range
    // 690 falls at ~71% which is in the average range (67-80%)
    
    // For semi-circle gauge (180 degrees), calculate segments
    // 690 is at ~71% of the score range (300-850)
    // We'll show: poor (0-51%), fair (51-67%), average (67-71% for 690)
    const poorEnd = 51; // 580 score
    const fairEnd = 67; // 670 score
    
    // Calculate segments up to 690 (71%)
    const creditScoreData = [
        { value: poorEnd, color: '#EF4444' }, // Red (poor: 0-51%)
        { value: fairEnd - poorEnd, color: '#FACC15' }, // Yellow (fair: 51-67%)
        { value: Math.max(0, scorePercentage - fairEnd), color: '#22C55E' }, // Green (average: 67-71% for 690)
    ];
    
    const getScoreLabel = (score: number) => {
        if (score >= 740) return 'excellent';
        if (score >= 670) return 'average'; // Changed: 670-740 is average, not good
        if (score >= 580) return 'fair';
        if (score >= 300) return 'poor';
        return 'poor';
    };

    return (
        <SafeView className="flex-1 bg-background">
            <ScrollView className="flex-1 px-4" showsVerticalScrollIndicator={false}>
                {/* Header */}
                <View className="flex-row justify-between items-center mt-4 mb-6">
                    <Text className="text-primary text-2xl font-semibold">{t('myCards')}</Text>
                    <View className="flex-row gap-3">
                        <TouchableOpacity className="w-10 h-10 rounded-full bg-card items-center justify-center border border-border">
                            <CreditCard size={20} color="#FFFFFF" />
                        </TouchableOpacity>
                        <TouchableOpacity className="w-10 h-10 rounded-full bg-card items-center justify-center border border-border">
                            <Plus size={20} color="#FFFFFF" />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Cards Slider */}
                <View className="mb-6" style={{ marginHorizontal: -16 }}>
                    <FlatList
                        ref={flatListRef}
                        data={cards}
                        horizontal
                        pagingEnabled
                        snapToInterval={screenWidth - 16}
                        snapToAlignment="start"
                        decelerationRate="fast"
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={(item) => item.id}
                        contentContainerStyle={{ paddingLeft: 16, paddingRight: 16 }}
                        onViewableItemsChanged={({ viewableItems }) => {
                            if (viewableItems.length > 0) {
                                setCurrentCardIndex(viewableItems[0].index || 0);
                            }
                        }}
                        viewabilityConfig={{
                            itemVisiblePercentThreshold: 50,
                        }}
                        getItemLayout={(_, index) => ({
                            length: screenWidth - 16,
                            offset: (screenWidth - 16) * index + 16,
                            index,
                        })}
                        renderItem={({ item }) => (
                            <View style={{ width: screenWidth - 32, marginRight: 16 }}>
                                <LinearGradient
                                    colors={item.gradientColors}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 1 }}
                                    className="shadow-lg"
                                    style={{ 
                                        borderRadius: 24,
                                        height: 208,
                                        shadowColor: item.gradientColors[0], 
                                        shadowOpacity: 0.3, 
                                        shadowRadius: 10,
                                    }}
                                >
                                    <View className="p-6 flex-1 justify-between">
                                        <View className="flex-row justify-between items-start">
                                            <Text className="text-black font-bold text-lg">{item.bankName}</Text>
                                            <Text className="text-black font-bold text-xl italic">{item.cardType}</Text>
                                        </View>

                                        <View className="flex-row items-center gap-2 my-2">
                                            <View className="w-10 h-8 bg-black/20 rounded-md border border-black/30" />
                                            <MoreHorizontal size={24} color="#000" style={{ opacity: 0.5 }} />
                                        </View>

                                        <View>
                                            <Text className="text-black text-xl font-mono font-bold tracking-widest mb-4">
                                                {item.cardNumber}
                                            </Text>
                                            <View className="flex-row justify-between">
                                                <View>
                                                    <Text className="text-black/60 text-[10px] uppercase font-bold">{t('cardHolder')}</Text>
                                                    <Text className="text-black font-bold text-sm">{item.cardHolder}</Text>
                                                </View>
                                                <View>
                                                    <Text className="text-black/60 text-[10px] uppercase font-bold">{t('expires')}</Text>
                                                    <Text className="text-black font-bold text-sm">{item.expires}</Text>
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                </LinearGradient>
                            </View>
                        )}
                    />
                    
                    {/* Page Indicators */}
                    <View className="flex-row justify-center gap-2 mt-4">
                        {cards.map((_, index) => (
                            <View
                                key={index}
                                className={`h-2 rounded-full ${
                                    index === currentCardIndex ? 'bg-blue-500 w-6' : 'bg-gray-400 w-2'
                                }`}
                            />
                        ))}
                    </View>
                </View>

                {/* Card Actions */}
                <View className="flex-row justify-between mb-8 gap-3 mt-4">
                    <TouchableOpacity className="flex-1 flex-row items-center justify-center gap-2 bg-card py-3 rounded-xl border border-border">
                        <Lock size={16} color="#FFFFFF" />
                        <Text className="text-primary text-sm font-medium">{t('freeze')}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity className="flex-1 flex-row items-center justify-center gap-2 bg-card py-3 rounded-xl border border-border">
                        <RefreshCw size={16} color="#FFFFFF" />
                        <Text className="text-primary text-sm font-medium">{t('replace')}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity className="flex-1 flex-row items-center justify-center gap-2 bg-card py-3 rounded-xl border border-border">
                        <Smartphone size={16} color="#FFFFFF" />
                        <Text className="text-primary text-sm font-medium">{t('topUp')}</Text>
                    </TouchableOpacity>
                </View>

                {/* Credit Score Widget */}
                <View className="bg-card rounded-2xl p-6 border border-border items-center mb-8">
                    <View className="w-full flex-row justify-between items-center mb-8">
                        <Text className="text-primary text-lg font-semibold">{t('yourCreditScore')}</Text>
                    </View>

                    <View className="items-center justify-center" style={{ height: 120, marginTop: 20, marginBottom: 50 }}>
                        {/* Semi-circle gauge simulation using PieChart */}
                        <PieChart
                            data={creditScoreData}
                            donut
                            radius={90}
                            innerRadius={75}
                            startAngle={-180}
                            endAngle={0}
                            backgroundColor="#1C1C1C"
                        />
                        <View style={{ position: 'absolute', top: 60, alignItems: 'center' }}>
                            <Text className="text-primary text-4xl font-bold">{creditScore}</Text>
                        </View>
                    </View>

                    <View className="items-center w-full">
                        <Text className="text-secondary text-sm text-center">
                            {t('yourCreditScore')} <Text className="text-warning font-bold">{t(getScoreLabel(creditScore))}</Text>
                        </Text>
                        <Text className="text-secondary text-xs mt-1">{t('lastChecked', { date: '21 Apr' })}</Text>
                    </View>
                </View>

            </ScrollView>
        </SafeView>
    );
}
