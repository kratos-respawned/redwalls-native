import { AntDesign } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';

import { favourites } from './_layout';

import { downloadWallpaper } from '~/libs/download';
import { WallpaperCard } from '~/typings/wallpaper-card';

type CardProps = {
  url: string;
  title: string;
  author: string;
  subreddit: string;
  height: string;
  blurhash: string;
  download: string;
};

export default function Auth() {
  const { wallpaper } = useLocalSearchParams<{ wallpaper: string }>();
  const data = JSON.parse(wallpaper) as WallpaperCard;
  const { url, title, highResHeight, blurUrl } = data;
  const [isFav, setIsFav] = useState(false);
  const setFav = () => {
    setIsFav((prev) => !prev);
    const rawJSON = favourites.getString('favWalls');
    const favs: WallpaperCard[] = JSON.parse(rawJSON || '[]');
    const isFav = favs.some((item) => item.url === url);
    if (isFav) {
      const newFavs = favs.filter((item) => item.url !== url);
      favourites.set('favWalls', JSON.stringify(newFavs));
    } else {
      favourites.set('favWalls', JSON.stringify([...favs, { ...data }]));
    }
  };
  if (isNaN(parseInt(highResHeight))) {
    return <Text>Something went wrong</Text>;
  }
  return (
    <View className="flex-1 relative justify-center">
      <StatusBar style="light" />

      <Image
        cachePolicy="disk"
        placeholder={blurUrl}
        contentFit="contain"
        transition={500}
        style={{ height: parseInt(highResHeight) }}
        source={{ uri: url }}
      />
      <LinearGradient
        className="absolute flex-1 justify-end pb-5  h-full w-full z-30"
        colors={['rgba(0,0,0,0.7)', 'rgba(0,0,0,0.1)', 'transparent', 'rgba(0,0,0,0.8)']}
        style={{ height: '100%' }}>
        <View className=" gap-10 ml-auto mr-5 ">
          <Pressable onPress={setFav}>
            <AntDesign name="heart" size={24} color={isFav ? 'red' : 'white'} />
          </Pressable>
          <Pressable onPress={() => downloadWallpaper(title, url)}>
            <AntDesign name="download" size={24} color="white" />
          </Pressable>
        </View>
        <Text className="text-white text-sm font-bold ml-5 pt-6">{title}</Text>
      </LinearGradient>
    </View>
  );
}
