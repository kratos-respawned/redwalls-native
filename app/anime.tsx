import '@expo/match-media';

import { WallpaperList } from '~/components/wallpaper-list';
const subreddit = 'animewallpapers+animebackgrounds+animephonewallpapers';
export default function Anime() {
  return <WallpaperList title="Anime" subreddit={subreddit} />;
}
