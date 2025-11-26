import { Icon, NativeTabs } from 'expo-router/unstable-native-tabs';
import { DynamicColorIOS } from 'react-native';

export default function TabLayout() {
  return (
    <NativeTabs
      labelStyle={{
        // For the text color
        color: DynamicColorIOS({
          dark: 'white',
          light: 'black',
        }),
      }}
      // For the selected icon color
      tintColor={DynamicColorIOS({
        dark: '#3B82F6', // Blue-500 from our palette
        light: '#3B82F6',
      })}
    >
      <NativeTabs.Trigger name="index" options={{ title: 'Home' }}>
        <Icon sf={{ default: 'house', selected: 'house.fill' }} />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="cards" options={{ title: 'Cards' }}>
        <Icon sf={{ default: 'creditcard', selected: 'creditcard.fill' }} />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="pay" options={{ title: 'Pay' }}>
        <Icon sf={{ default: 'banknote', selected: 'banknote.fill' }} />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="analytics" options={{ title: 'Analytics' }}>
        <Icon sf={{ default: 'chart.bar', selected: 'chart.bar.fill' }} />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="profile" options={{ title: 'Profile' }}>
        <Icon sf={{ default: 'person', selected: 'person.fill' }} />
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
