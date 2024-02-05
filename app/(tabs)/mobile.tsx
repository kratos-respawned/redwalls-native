import { Text, View } from 'react-native';

import EditScreenInfo from '../../components/edit-screen-info';

export default function TabTwoScreen() {
  return (
    <View>
      <Text>Tab Two</Text>
      <View />
      <EditScreenInfo path="app/(tabs)/index.tsx" />
    </View>
  );
}
