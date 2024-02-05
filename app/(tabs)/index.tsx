import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function TabOneScreen() {
  const inset = useSafeAreaInsets();
  return <View style={{ paddingTop: inset.top + 10 }} className=" dark:bg-gray-950 flex-1" />;
}
