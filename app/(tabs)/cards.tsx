import { SafeView } from '@/components/SafeView';
import { LinearGradient } from 'expo-linear-gradient';
import { CreditCard, Lock, MoreHorizontal, Plus, RefreshCw, Smartphone } from 'lucide-react-native';
import React from 'react';
import { Dimensions, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { PieChart } from 'react-native-gifted-charts';


const screenWidth = Dimensions.get('window').width;

export default function CardsScreen() {
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
                    <Text className="text-primary text-2xl font-semibold">My Cards</Text>
                    <View className="flex-row gap-3">
                        <TouchableOpacity className="w-10 h-10 rounded-full bg-card items-center justify-center border border-border">
                            <CreditCard size={20} color="#FFFFFF" />
                        </TouchableOpacity>
                        <TouchableOpacity className="w-10 h-10 rounded-full bg-card items-center justify-center border border-border">
                            <Plus size={20} color="#FFFFFF" />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Card Component */}
                <LinearGradient
                    colors={['#D4AF37', '#C5A028', '#E5C15D']} // Gold metallic gradient
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    className="mb-8 shadow-lg"
                    style={{ 
                        borderRadius: 24,
                        height: 208, // h-52 = 13rem = 208px
                        shadowColor: '#D4AF37', 
                        shadowOpacity: 0.3, 
                        shadowRadius: 10 
                    }}
                >
                    <View className="p-6 flex-1 justify-between">
                        <View className="flex-row justify-between items-start">
                            <Text className="text-black font-bold text-lg">IBBL</Text>
                            <Text className="text-black font-bold text-xl italic">VISA</Text>
                        </View>

                        <View className="flex-row items-center gap-2 my-2">
                            <View className="w-10 h-8 bg-yellow-600/40 rounded-md border border-yellow-700/50" />
                            <MoreHorizontal size={24} color="#000" className="opacity-50" />
                        </View>

                        <View>
                            <Text className="text-black text-xl font-mono font-bold tracking-widest mb-4">
                                5345 2331 3132 6564
                            </Text>
                            <View className="flex-row justify-between">
                                <View>
                                    <Text className="text-black/60 text-[10px] uppercase font-bold">Card Holder</Text>
                                    <Text className="text-black font-bold text-sm">NURAIYAN SARAH</Text>
                                </View>
                                <View>
                                    <Text className="text-black/60 text-[10px] uppercase font-bold">Expires</Text>
                                    <Text className="text-black font-bold text-sm">08/28</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </LinearGradient>

                {/* Card Actions */}
                <View className="flex-row justify-between mb-8 gap-3 mt-4">
                    <TouchableOpacity className="flex-1 flex-row items-center justify-center gap-2 bg-card py-3 rounded-xl border border-border">
                        <Lock size={16} color="#FFFFFF" />
                        <Text className="text-primary text-sm font-medium">Freeze</Text>
                    </TouchableOpacity>
                    <TouchableOpacity className="flex-1 flex-row items-center justify-center gap-2 bg-card py-3 rounded-xl border border-border">
                        <RefreshCw size={16} color="#FFFFFF" />
                        <Text className="text-primary text-sm font-medium">Replace</Text>
                    </TouchableOpacity>
                    <TouchableOpacity className="flex-1 flex-row items-center justify-center gap-2 bg-card py-3 rounded-xl border border-border">
                        <Smartphone size={16} color="#FFFFFF" />
                        <Text className="text-primary text-sm font-medium">Top Up</Text>
                    </TouchableOpacity>
                </View>

                {/* Credit Score Widget */}
                <View className="bg-card rounded-2xl p-6 border border-border items-center mb-8">
                    <View className="w-full flex-row justify-between items-center mb-8">
                        <Text className="text-primary text-lg font-semibold">Your Credit Score</Text>
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
                            Your Credit Score is <Text className="text-warning font-bold">{getScoreLabel(creditScore)}</Text>
                        </Text>
                        <Text className="text-secondary text-xs mt-1">Last Checked on 21 Apr</Text>
                    </View>
                </View>

            </ScrollView>
        </SafeView>
    );
}
