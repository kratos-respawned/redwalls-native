import { StatusBar } from 'expo-status-bar';
import { Platform, Text, View } from 'react-native';

import EditScreenInfo from '../components/edit-screen-info';

export default function ModalScreen() {
  return (
    <View>
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
      <Text>Modal</Text>
      <View />
      <EditScreenInfo path="app/modal.tsx" />
    </View>
  );
}
