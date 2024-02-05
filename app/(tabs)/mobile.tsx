import '@expo/match-media';
import { Feather } from '@expo/vector-icons';
import { MasonryFlashList } from '@shopify/flash-list';
import { BlurView } from 'expo-blur';
import { Image } from 'expo-image';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Platform, Pressable, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useMediaQuery } from 'react-responsive';

import { handleDownload } from '~/libs/download';
import { filterData } from '~/libs/filter-data';
import { WallpaperCard } from '~/typings/wallpaper-card';

const blurhash =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

export default function Mobile() {
  const [isLoading, setIsLoading] = useState(false);
  const url = `https://www.reddit.com/r/phonewallpaper+phonewallpapers/hot.json?count=1000&raw_json=1`;
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
  const downloadWallpaper = async (name: string, url: string) => {
    if (Platform.OS === 'web') {
      try {
        setIsLoading(true);
        const img = await fetch(url);
        const blob = await img.blob();
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = name;
        a.click();
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    } else {
      try {
        setIsLoading(true);
        await handleDownload(name, url);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }
  };
  return (
    <View className=" bg-white flex-1">
      <Text
        style={{ paddingTop: inset.top }}
        className=" text-black text-center text-lg font-bold pb-3">
        Mobile
      </Text>
      <MasonryFlashList
        numColumns={isTabletOrMobileDevice ? 1 : 2}
        contentContainerStyle={{ backgroundColor: 'red' }}
        data={wallpapers}
        estimatedItemSize={10}
        renderItem={(item) => (
          <View className="relative rounded-2xl">
            <Image
              cachePolicy="memory-disk"
              style={{ height: item.item.height }}
              source={{ uri: item.item.img }}
              placeholder={blurhash}
              contentFit="cover"
              transition={1000}
            />
            <BlurView
              intensity={90}
              blurReductionFactor={0}
              tint="systemUltraThinMaterialDark"
              renderToHardwareTextureAndroid
              className="absolute w-full flex-row justify-between items-center bottom-0 py-1 rounded-t-lg px-3  ">
              <View>
                <Text className="text-white text-left text-sm ">{item.item.author}</Text>
                <Text className="text-white text-left text-xs ">{item.item.subreddit}</Text>
              </View>
              <Pressable onPress={() => downloadWallpaper(item.item.title, item.item.url)}>
                {isLoading ? (
                  <ActivityIndicator color="white" size="small" />
                ) : (
                  <Feather name="download" size={18} color="white" />
                )}
              </Pressable>
            </BlurView>
          </View>
        )}
      />
    </View>
  );
}
