import { Feather } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { Link } from 'expo-router';
import { FC } from 'react';
import { Pressable, View } from 'react-native';

import { downloadWallpaper } from '~/libs/download';
import { WallpaperCard } from '~/typings/wallpaper-card';
const blurhash =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';
export const WallCard: FC<{ wall: WallpaperCard }> = ({ wall }) => {
  return (
    <View className="relative rounded-3xl overflow-hidden mb-5">
      <Image
        cachePolicy="memory-disk"
        style={{ height: wall.height }}
        source={{ uri: wall.img }}
        placeholder={blurhash}
        contentFit="cover"
        transition={1000}
      />
      <LinearGradient
        className="absolute w-full h-full  items-end justify-end flex-row pb-5  gap-5"
        colors={['transparent', 'rgba(0,0,0,0.6)']}>
        <Pressable onPress={() => downloadWallpaper(wall.title, wall.url)}>
          <Feather name="download" size={22} color="white" />
        </Pressable>
        <Link
          href={{
            pathname: '/[wallpaper]',
            params: {
              wallpaper: JSON.stringify({
                ...wall,
              }),
            },
          }}>
          <Feather name="link" size={22} color="white" />
        </Link>
      </LinearGradient>
    </View>
  );
};
