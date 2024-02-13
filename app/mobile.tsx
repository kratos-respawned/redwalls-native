import '@expo/match-media';

import { WallpaperList } from '~/components/wallpaper-list';

const subreddit = 'phonewallpaper+phonewallpapers+MobileWallpapers4K+HDMobileWalls';
export default function Mobile() {
  return <WallpaperList title="Mobile" subreddit={subreddit} />;
}
