import { FlashList } from '@shopify/flash-list';
import { useFocusEffect } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useCallback, useState } from 'react';
import { Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useMediaQuery } from 'react-responsive';

import { favourites } from './_layout';

import { WallCard } from '~/components/wallpaper-card';
import { WallpaperCard } from '~/typings/wallpaper-card';
export default function Favourites() {
  const isTabletOrMobileDevice = useMediaQuery({
    maxDeviceWidth: 768,
  });

  const [favs, setFavs] = useState<WallpaperCard[]>(JSON.parse('[]'));
  useFocusEffect(
    useCallback(() => {
      const rawJSON = favourites.getString('favWalls') || '[]';
      const favs: WallpaperCard[] = JSON.parse(rawJSON);
      setFavs(favs);
    }, [])
  );
  const inset = useSafeAreaInsets();

  return (
    <View style={{ paddingTop: inset.top }} className=" bg-white flex-1 px-4 ">
      <StatusBar style="dark" />
      {favs.length === 0 ? (
        <>
          <Text className="text-4xl font-bold pt-5 pb-5">Favourites</Text>
          <View className="justify-center items-center flex-1">
            <Text className="text-2xl">No Favourites</Text>
          </View>
        </>
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
