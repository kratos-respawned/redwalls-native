import { QueryClient } from '@tanstack/react-query';
import { Stack } from 'expo-router';
import { MMKV } from 'react-native-mmkv';
import '../global.css';

import { createIDBPersister } from '~/libs/persist';

import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};
export const storage = new MMKV({
  id: 'redwalls',
});

const queryClient = new QueryClient();
const persister = createIDBPersister('redwalls', storage);
export default function RootLayout() {
  return (
    <PersistQueryClientProvider persistOptions={{ persister }} client={queryClient}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </PersistQueryClientProvider>
  );
}
