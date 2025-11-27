import { Icon, NativeTabs } from 'expo-router/unstable-native-tabs';
import { useTranslation } from 'react-i18next';

export default function TabLayout() {
  const { t } = useTranslation('tabs');
  
  return (
    <NativeTabs
      labelStyle={{
        // For the text color - her zaman koyu mod için beyaz (sistem temasından bağımsız)
        color: 'white',
      }}
      // For the selected icon color
      tintColor="#3B82F6"
    >
      <NativeTabs.Trigger name="index" options={{ title: t('home') }}>
        <Icon sf={{ default: 'house', selected: 'house.fill' }} />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="cards" options={{ title: t('cards') }}>
        <Icon sf={{ default: 'creditcard', selected: 'creditcard.fill' }} />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="pay" options={{ title: t('pay') }}>
        <Icon sf={{ default: 'banknote', selected: 'banknote.fill' }} />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="analytics" options={{ title: t('analytics') }}>
        <Icon sf={{ default: 'chart.bar', selected: 'chart.bar.fill' }} />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="profile" options={{ title: t('profile') }}>
        <Icon sf={{ default: 'person', selected: 'person.fill' }} />
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
