import { Feather } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { Image } from 'expo-image';
import { Link } from 'expo-router';
import { FC } from 'react';
import { Pressable, View } from 'react-native';

import { downloadWallpaper } from '~/libs/download';
import { WallpaperCard } from '~/typings/wallpaper-card';
const blurhash =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';
export const WallCard: FC<{ wall: WallpaperCard }> = ({ wall }) => {
  return (
    <View className="relative rounded-2xl">
      <Image
        cachePolicy="memory-disk"
        style={{ height: wall.height }}
        source={{ uri: wall.img }}
        placeholder={blurhash}
        contentFit="cover"
        transition={1000}
      />
      <BlurView
        intensity={90}
        blurReductionFactor={0}
        tint="systemUltraThinMaterialDark"
        renderToHardwareTextureAndroid
        style={{
          paddingVertical: 9,
          justifyContent: 'flex-end',
        }}
        className="absolute w-full  gap-5   flex-row justify-end items-end bottom-0    ">
        <Pressable onPress={() => downloadWallpaper(wall.title, wall.url)}>
          <Feather name="download" size={22} color="white" />
        </Pressable>
        <Link
          href={{
            pathname: '/[wallpaper]',
            params: {
              wallpaper: JSON.stringify({
                url: wall.highResUrl,
                title: wall.title,
                author: wall.author,
                subreddit: wall.subreddit,
                height: wall.highResHeight.toString(),
                blurhash: wall.blurUrl.toString(),
              }),
            },
          }}>
          <Feather name="link" size={22} color="white" />
        </Link>
      </BlurView>
    </View>
  );
};
