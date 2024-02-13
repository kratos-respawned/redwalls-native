import { FlashList } from '@shopify/flash-list';
import { useQuery } from '@tanstack/react-query';
import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useMediaQuery } from 'react-responsive';

import { favourites } from './_layout';

import { WallCard } from '~/components/wallpaper-card';
import { fetchWallpapers } from '~/libs/fetch-data';
import { WallpaperCard } from '~/typings/wallpaper-card';
export default function Favourites() {
  const isTabletOrMobileDevice = useMediaQuery({
    maxDeviceWidth: 768,
  });
  const rawJSON = favourites.getString('favWalls');
  const favs: WallpaperCard[] = JSON.parse(rawJSON || '[]');
  console.log(favs);
  const { isLoading, data } = useQuery({
    queryKey: ['animewallpapers' + 'home'],
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    queryFn: () => fetchWallpapers({ pageParam: '0', subreddit: 'animewallpapers' }),
  });

  const inset = useSafeAreaInsets();

  return (
    <View style={{ paddingTop: inset.top }} className=" bg-white flex-1 px-4 ">
      <StatusBar style="dark" />
      {isLoading ? (
        <View className="justify-center items-center flex-1">
          <ActivityIndicator color="black" size="large" />
        </View>
      ) : (
        <FlashList
          refreshing={false}
          ListHeaderComponent={() => (
            <Text className="text-4xl font-bold pt-2 pb-5">Favourites</Text>
          )}
          showsVerticalScrollIndicator={false}
          onEndReachedThreshold={0.5}
          numColumns={isTabletOrMobileDevice ? 1 : 2}
          contentContainerStyle={{ backgroundColor: 'white', paddingTop: 16 }}
          data={favs}
          estimatedItemSize={24}
          renderItem={({ item }) => (
            <View className="flex-1">
              <WallCard wall={item} />
            </View>
          )}
        />
      )}
    </View>
  );
}
