import '@expo/match-media';

import { WallpaperList } from '~/components/wallpaper-list';

const subreddit = 'phonewallpaper+phonewallpapers';
export default function Index() {
  return <WallpaperList subreddit={subreddit} />;
}
