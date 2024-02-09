import '@expo/match-media';
import { Feather } from '@expo/vector-icons';
import { FlashList } from '@shopify/flash-list';
import { useInfiniteQuery } from '@tanstack/react-query';
import { BlurView } from 'expo-blur';
import { Image } from 'expo-image';
import { ActivityIndicator, Pressable, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useMediaQuery } from 'react-responsive';

import { downloadWallpaper } from '~/libs/download';
import { fetchWallpapers } from '~/libs/fetch-data';

const blurhash =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';
const subreddit = 'phonewallpaper+phonewallpapers';
export default function Index() {
  const inset = useSafeAreaInsets();
  const isTabletOrMobileDevice = useMediaQuery({
    maxDeviceWidth: 768,
  });

  const {
    data: wallpaperPage,
    fetchNextPage,
    refetch,
    isLoading: loading,
  } = useInfiniteQuery({
    queryKey: ['mobile'],
    initialPageParam: '0',
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    queryFn: ({ pageParam }) => fetchWallpapers({ pageParam, subreddit }),
    getNextPageParam: (l) => l.at(0)?.after,
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
        <FlashList
          refreshing={false}
          onRefresh={refetch}
          onEndReachedThreshold={0.5}
          onEndReached={() => fetchNextPage()}
          numColumns={isTabletOrMobileDevice ? 1 : 2}
          contentContainerStyle={{ backgroundColor: 'white' }}
          data={wallpaperPage?.pages}
          estimatedItemSize={1000}
          renderItem={(list) => (
            <View key={list.index}>
              {list.item.map((item, i) => (
                <View key={i} className="relative rounded-2xl">
                  <Image
                    cachePolicy="memory-disk"
                    style={{ height: item.height }}
                    source={{ uri: item.img }}
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
                      <Text className="text-white text-left text-sm ">{item.author}</Text>
                      <Text className="text-white text-left text-xs ">{item.subreddit}</Text>
                    </View>
                    <Pressable onPress={() => downloadWallpaper(item.title, item.url)}>
                      {/* {isLoading ? (
                    <ActivityIndicator color="white" size="small" />
                  ) : ( */}
                      <Feather name="download" size={18} color="white" />
                      {/* )} */}
                    </Pressable>
                  </BlurView>
                </View>
              ))}
            </View>
          )}
        />
      )}
    </View>
  );
}
