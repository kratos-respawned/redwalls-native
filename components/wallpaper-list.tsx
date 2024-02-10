import { AnimatedFlashList } from '@shopify/flash-list';
import { useInfiniteQuery } from '@tanstack/react-query';
import { ActivityIndicator, View } from 'react-native';
import { useMediaQuery } from 'react-responsive';

import { WallCard } from './wallpaper-card';

import { fetchWallpapers } from '~/libs/fetch-data';
import { WallpaperCard } from '~/typings/wallpaper-card';

export const WallpaperList = ({ subreddit }: { subreddit: string }) => {
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
    getNextPageParam: (l) => l.at(0)?.after,
  });

  return (
    <View className=" bg-white flex-1 ">
      {loading ? (
        <View className="justify-center items-center flex-1">
          <ActivityIndicator color="black" size="large" />
        </View>
      ) : (
        <AnimatedFlashList
          refreshing={false}
          onRefresh={refetch}
          onEndReachedThreshold={0.5}
          onEndReached={() => fetchNextPage()}
          numColumns={isTabletOrMobileDevice ? 1 : 2}
          contentContainerStyle={{ backgroundColor: 'white' }}
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
