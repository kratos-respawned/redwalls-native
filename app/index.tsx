import '@expo/match-media';
import { AntDesign } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { RefreshControl, ScrollView, Text, ToastAndroid, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Carousel } from '~/components/homescreen-carousel';

const tabs = ['anime', 'desktop', 'mobile'];

export default function Index() {
  const inset = useSafeAreaInsets();
  return (
    <View style={{ paddingTop: inset.top }} className="   flex-1 ">
      <StatusBar style="dark" />
      <ScrollView
        refreshControl={
          <RefreshControl
            onRefresh={() => ToastAndroid.showWithGravity('Coming Soon', 2, ToastAndroid.TOP)}
            refreshing={false}
          />
        }>
        <View className="px-4 pt-4 flex-row justify-between items-center">
          <Text className=" text-4xl pt-1 font-bold">Redwalls</Text>
          <Link href="/favourites">
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
          key="animewallpapers+animebackgrounds+animephonewallpapers"
          subreddit="animewallpapers+animebackgrounds+animephonewallpapers"
          orientation="portrait"
          // @ts-expect-error
          link="/anime"
        />
        <Carousel
          key="wallpaper+wallpapers+wallpaperengine"
          title="Desktop"
          subreddit="wallpaper+wallpapers+wallpaperengine"
          orientation="landscape"
          // @ts-expect-error
          link="/desktop"
        />
        <Carousel
          title="Mobile"
          key="MobileWallpapers4K+HDMobileWalls"
          subreddit="MobileWallpapers4K+HDMobileWalls"
          orientation="portrait"
          // @ts-expect-error
          link="/mobile"
        />
        <View className="py-6 w-full">
          <Text className="text-center text-sm font-bold">Made with ❤️</Text>
          <Text className="text-center text-sm font-bold">@kratos-respawned</Text>
        </View>
      </ScrollView>
    </View>
  );
}
