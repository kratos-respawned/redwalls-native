import { AnimatedFlashList } from '@shopify/flash-list';
import { useInfiniteQuery } from '@tanstack/react-query';
import { ActivityIndicator, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useMediaQuery } from 'react-responsive';

import { WallCard } from './wallpaper-card';

import { fetchWallpapers } from '~/libs/fetch-data';
import { WallpaperCard } from '~/typings/wallpaper-card';

export const WallpaperList = ({ subreddit, title }: { subreddit: string; title: string }) => {
  const isTabletOrMobileDevice = useMediaQuery({
    maxDeviceWidth: 768,
  });

  const {
    data: wallpaperPage,
    fetchNextPage,
    refetch,
    isLoading: loading,
  } = useInfiniteQuery({
    queryKey: [subreddit],
    initialPageParam: '0',
    refetchOnMount: false,
    refetchOnWindowFocus: false,

    queryFn: ({ pageParam }) => fetchWallpapers({ pageParam, subreddit }),
    getNextPageParam: (l) => l[l.length - 1].after,
  });
  const inset = useSafeAreaInsets();
  return (
    <View style={{ paddingTop: inset.top }} className=" bg-white flex-1 px-4">
      {loading ? (
        <View className="justify-center items-center flex-1">
          <ActivityIndicator color="black" size="large" />
        </View>
      ) : (
        <AnimatedFlashList
          refreshing={false}
          ListHeaderComponent={() => (
            <>
              <Text className="text-4xl font-bold pt-2">{title}</Text>
              <View className=" pt-5 pb-5 flex-row ">
                {subreddit.split('+').map((tab) => (
                  <View className="bg-zinc-950  px-4  py-1 rounded-full mr-3 " key={tab}>
                    <Text className="text-white">{tab}</Text>
                  </View>
                ))}
              </View>
            </>
          )}
          showsVerticalScrollIndicator={false}
          onRefresh={refetch}
          onEndReachedThreshold={0.5}
          onEndReached={() => fetchNextPage()}
          numColumns={isTabletOrMobileDevice ? 1 : 2}
          contentContainerStyle={{ backgroundColor: 'white', paddingTop: 16 }}
          data={wallpaperPage?.pages}
          estimatedItemSize={1000}
          renderItem={(list) => (
            <View className="flex-1">
              {list.item.map((item: WallpaperCard, i: number) => (
                <WallCard wall={item} key={i} />
              ))}
            </View>
          )}
        />
      )}
    </View>
  );
};
