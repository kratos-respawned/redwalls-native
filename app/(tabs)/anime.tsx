import '@expo/match-media';
import { WallpaperList } from '~/components/wallpaper-list';
const subreddit = 'Animewallpaper';
export default function Index() {
  return <WallpaperList subreddit={subreddit} />;
}
