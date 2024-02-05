import { MasonryFlashList } from '@shopify/flash-list';
import { Image } from 'expo-image';
import { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import '@expo/match-media';
import { useMediaQuery } from 'react-responsive';

import { filterData } from '~/libs/filter-data';
import { WallpaperCard } from '~/typings/wallpaper-card';

const blurhash =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

export default function TabOneScreen() {
  const url = `https://www.reddit.com/r/wallpaper+wallpapers+wallpaperengine/hot.json?count=1000&raw_json=1`;
  const inset = useSafeAreaInsets();
  const [wallpapers, setWallpapers] = useState<WallpaperCard[]>();
  const isTabletOrMobileDevice = useMediaQuery({
    maxDeviceWidth: 768,
  });
  async function fetchWallpapers() {
    try {
      const rawData = await fetch(url);
      const rawJSON = await rawData.json();
      console.log(rawJSON);
      const walls = filterData(rawJSON.data.children);
      return walls;
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    (async () => {
      const walls = await fetchWallpapers();
      setWallpapers(walls);
    })();
  }, []);
  return (
    <View className=" bg-black flex-1">
      <Text
        style={{ paddingTop: inset.top }}
        className="bg-white  text-black text-center text-lg font-bold pb-3">
        Redwalls
      </Text>
      <MasonryFlashList
        numColumns={isTabletOrMobileDevice ? 1 : 2}
        contentContainerStyle={{ backgroundColor: 'red' }}
        data={wallpapers}
        estimatedItemSize={10}
        renderItem={(item) => (
          <View className="relative">
            <Image
              style={{ height: item.item.height }}
              source={{ uri: item.item.img }}
              placeholder={blurhash}
              contentFit="cover"
              transition={1000}
            />
            <View className="absolute w-full bottom-0 py-3 bg-black opacity-55 " />
          </View>
        )}
      />
    </View>
  );
}
