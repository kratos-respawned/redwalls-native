import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { requestPermissionsAsync } from 'expo-media-library';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { ToastAndroid } from 'react-native';
import { MMKV } from 'react-native-mmkv';
import '../global.css';

import { createIDBPersister } from '~/libs/persist';

export const storage = new MMKV({
  id: 'redwalls',
});
export const favourites = new MMKV({
  id: 'favWalls',
});

const queryClient = new QueryClient();
const persister = createIDBPersister('redwalls', storage);
export default function RootLayout() {
  useEffect(() => {
    requestPermissionsAsync().then((res) => {
      if (!res.granted) ToastAndroid.show('Permission denied', ToastAndroid.SHORT);
    });
  }, []);
  return (
    // <PersistQueryClientProvider persistOptions={{ persister }} client={queryClient}>
    <QueryClientProvider client={queryClient}>
      <StatusBar style="dark" />
      <Stack screenOptions={{ headerShown: false }} />
    </QueryClientProvider>
    // </PersistQueryClientProvider>
  );
}
