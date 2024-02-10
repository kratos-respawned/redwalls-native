import '@expo/match-media';
import { WallpaperList } from '~/components/wallpaper-list';

const subreddit = 'wallpaper+wallpapers+wallpaperengine';

export default function Index() {
  return <WallpaperList subreddit={subreddit} />;
}
