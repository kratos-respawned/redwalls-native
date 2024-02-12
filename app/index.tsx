import '@expo/match-media';
import { AntDesign } from '@expo/vector-icons';
import { useQuery } from '@tanstack/react-query';
import { BlurView } from 'expo-blur';
import { Image } from 'expo-image';
import { Link } from 'expo-router';
import { FC } from 'react';
import { RefreshControl, ScrollView, Text, ToastAndroid, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// import type {} from "expo-router"
import { fetchWallpapers } from '~/libs/fetch-data';

const subreddit = 'wallpaper+wallpapers+wallpaperengine';
const tabs = ['anime', 'desktop', 'mobile'];

export default function Index() {
  return (
    <View className="bg-white   flex-1 ">
      <SafeAreaView>
        <ScrollView
          refreshControl={
            <RefreshControl
              onRefresh={() => ToastAndroid.showWithGravity('Coming Soon', 2, ToastAndroid.TOP)}
              refreshing={false}
            />
          }>
          <View className="px-4 pt-4 flex-row justify-between items-center">
            <Text className=" text-4xl pt-1 font-bold">Redwalls</Text>
            <Link href="/anime">
              <AntDesign name="heart" size={24} color="red" />
            </Link>
          </View>
          <View
            // horizontal
            // showsHorizontalScrollIndicator={false}
            // contentContainerClassName="pr-5"
            className="px-5 pt-5 flex-row ">
            {tabs.map((tab) => (
              <View className="bg-zinc-950  px-4  py-1 rounded-full mr-3 " key={tab}>
                <Text className="text-white">{tab}</Text>
              </View>
            ))}
          </View>
          <Carousel
            title="Anime"
            key="Animewallpaper"
            subreddit="Animewallpaper"
            orientation="portrait"
            link="/anime"
          />
          <Carousel
            key="wallpaper+wallpapers+wallpaperengine"
            title="Desktop"
            subreddit="wallpaper+wallpapers+wallpaperengine"
            orientation="landscape"
            link="/desktop"
          />
          <Carousel
            title="Mobile"
            key="mobilewallpapers"
            subreddit="mobilewallpapers"
            orientation="portrait"
            link="/mobile"
          />
          <View className="py-6 w-full">
            <Text className="text-center text-sm font-bold">Made with ❤️</Text>
            <Text className="text-center text-sm font-bold">@kratos-respawned</Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const Carousel: FC<CarouselProps> = ({ title, orientation, subreddit, link }) => {
  const { isLoading, data } = useQuery({
    queryKey: [subreddit + 'home'],
    queryFn: () => fetchWallpapers({ pageParam: '0', subreddit }),
  });
  return (
    <View className="pt-6 ">
      <Text className="text-2xl px-5 font-bold text-zinc-950 ">{title}</Text>
      <ScrollView
        horizontal
        contentContainerClassName="items-center gap-5 pr-5 pt-4"
        showsHorizontalScrollIndicator={false}
        className=" px-5">
        {isLoading &&
          Array(5)
            .fill('')
            .map((_, i) => (
              <View
                key={i}
                className={`${orientation === 'portrait' ? 'aspect-[9/16] w-64' : ' w-80 h-60 '}    rounded-3xl bg-gray-200`}
              />
            ))}
        {data
          ?.filter((item) => item.orientation === orientation)
          .slice(0, 5)
          .map((item, index) => (
            <Link
              asChild
              key={index}
              href={{
                pathname: '/[wallpaper]',
                params: {
                  wallpaper: JSON.stringify({
                    url: item.highResUrl,
                    title: item.title,
                    author: item.author,
                    subreddit: item.subreddit,
                    height: item.highResHeight.toString(),
                    blurhash: item.blurUrl.toString(),
                  }),
                },
              }}>
              <View
                key={item.title}
                className={`${orientation === 'portrait' ? 'aspect-[9/16] w-64' : ' w-80 h-60 '} bg-gray-200  relative rounded-3xl overflow-hidden`}>
                <Image
                  placeholder={{ uri: item.blurUrl }}
                  source={{ uri: item.img }}
                  contentFit="cover"
                  contentPosition="center"
                  transition={100}
                  style={{ width: '100%', height: '100%' }}
                />
              </View>
            </Link>
          ))}

        <Link href={link} className="mr-5">
          <BlurView tint="dark" className="bg-fuchsia-500 p-8  rounded-full overflow-hidden">
            <AntDesign name="arrowright" color="white" size={34} />
          </BlurView>
        </Link>
      </ScrollView>
    </View>
  );
};

interface CarouselProps {
  title: string;
  orientation: 'portrait' | 'landscape';
  subreddit: string;
  link: `${string}:${string}`;
}
