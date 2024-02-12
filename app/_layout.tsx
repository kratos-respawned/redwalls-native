import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Stack } from 'expo-router';
import '../global.css';

// export const storage = new MMKV({
//   id: 'redwalls',
// });

const queryClient = new QueryClient();
// const persister = createIDBPersister('redwalls', storage);
export default function RootLayout() {
  return (
    // <PersistQueryClientProvider persistOptions={{ persister }} client={queryClient}>
    <QueryClientProvider client={queryClient}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name="[wallpaper]"
          options={{
            headerTitleAlign: 'center',
            headerShown: true,
          }}
        />
      </Stack>
    </QueryClientProvider>
    // </PersistQueryClientProvider>
  );
}
