import { AntDesign } from '@expo/vector-icons';
import { useQuery } from '@tanstack/react-query';
import { Image } from 'expo-image';
import { Link, router } from 'expo-router';
import { FC } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';

import { fetchWallpapers } from '~/libs/fetch-data';

export const Carousel: FC<CarouselProps> = ({ title, orientation, subreddit, link }) => {
  const { isLoading, data } = useQuery({
    queryKey: [subreddit + 'home'],
    queryFn: () => fetchWallpapers({ pageParam: '0', subreddit }),
  });

  const navigate = (data: any) => {
    const wallData = JSON.stringify(data);
    router.push({
      pathname: '/[wallpaper]',
      params: {
        wallpaper: wallData,
      },
    });
  };
  return (
    <View className="pt-6 ">
      <View className="flex-row justify-between items-center px-5">
        <Text className="text-2xl  font-bold text-zinc-950 ">{title}</Text>
        <Link href={link}>
          <Text className=" ">
            View All <AntDesign name="arrowright" />
          </Text>
        </Link>
      </View>
      <ScrollView
        horizontal
        contentContainerClassName="items-center gap-5 pr-10 pt-4"
        showsHorizontalScrollIndicator={false}
        className=" px-5">
        {isLoading &&
          Array(5)
            .fill('')
            .map((_, i) => (
              <View
                key={i}
                className={`${orientation === 'portrait' ? ' aspect-[9/16] w-64' : ' w-80 h-60 '}    rounded-3xl bg-gray-200`}
              />
            ))}
        {data
          ?.filter((item) => item.orientation === orientation && !item.nsfw)
          .slice(0, 5)
          .map((item, index) => (
            <Pressable
              onPress={() =>
                navigate({
                  ...item,
                })
              }
              key={index}>
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
            </Pressable>
          ))}

        {/* <Link href={link} className="mr-5">
          <BlurView tint="dark" className="bg-fuchsia-500 p-8  rounded-full overflow-hidden">
            <AntDesign name="arrowright" color="white" size={34} />
          </BlurView>
        </Link> */}
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
