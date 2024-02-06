import '@expo/match-media';
import { Feather } from '@expo/vector-icons';
import { MasonryFlashList } from '@shopify/flash-list';
import { useQuery } from '@tanstack/react-query';
import { BlurView } from 'expo-blur';
import { Image } from 'expo-image';
import { useState } from 'react';
import { ActivityIndicator, Pressable, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useMediaQuery } from 'react-responsive';

import { downloadWallpaper } from '~/libs/download';
import { fetchWallpapers } from '~/libs/fetch-data';

const blurhash =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

export default function Index() {
  const [isLoading, setIsLoading] = useState(false);
  const url = `https://www.reddit.com/r/phonewallpaper+phonewallpapers/hot.json?count=1000&raw_json=1`;
  const inset = useSafeAreaInsets();
  const isTabletOrMobileDevice = useMediaQuery({
    maxDeviceWidth: 768,
  });
  const {
    isLoading: loading,
    data: wallpapers,
    refetch,
  } = useQuery({
    queryKey: ['mobile'],
    refetchOnMount: false,
    queryFn: () => fetchWallpapers(url),
  });
  return (
    <View className=" bg-white flex-1">
      <Text
        style={{ paddingTop: inset.top }}
        className=" text-black text-center text-lg font-bold pb-3">
        Redwalls
      </Text>
      {loading ? (
        <View className="justify-center items-center flex-1">
          <ActivityIndicator color="black" size="large" />
        </View>
      ) : (
        <MasonryFlashList
          refreshing={false}
          onRefresh={refetch}
          numColumns={isTabletOrMobileDevice ? 1 : 2}
          contentContainerStyle={{ backgroundColor: 'white' }}
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
      )}
    </View>
  );
}
