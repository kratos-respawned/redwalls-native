import { Feather } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { Image } from 'expo-image';
import { Stack, useLocalSearchParams } from 'expo-router';
import { Pressable, Text, View } from 'react-native';

import { downloadWallpaper } from '~/libs/download';

type CardProps = {
  url: string;
  title: string;
  author: string;
  subreddit: string;
  height: string;
  blurhash: string;
};

export default function Auth() {
  const { wallpaper } = useLocalSearchParams<{ wallpaper: string }>();
  const { url, title, height, blurhash } = JSON.parse(wallpaper) as CardProps;
  if (isNaN(parseInt(height))) {
    return <Text>Something went wrong</Text>;
  }
  return (
    <View className="flex-1 relative justify-center">
      <Stack.Screen
        options={{
          headerTitle: title,
        }}
      />
      <Image
        placeholder={blurhash}
        contentFit="contain"
        transition={500}
        style={{ height: parseInt(height) }}
        source={{ uri: url }}
      />
      <BlurView
        tint="systemThickMaterialDark"
        className="absolute active:scale-90  bottom-10 p-4 right-2 rounded-full overflow-hidden  gap-4 ">
        <Pressable onPress={() => downloadWallpaper(title, url)}>
          <Feather color="white" name="download" size={35} />
        </Pressable>
      </BlurView>
    </View>
  );
}
