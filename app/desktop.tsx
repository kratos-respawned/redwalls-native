import '@expo/match-media';

import { WallpaperList } from '~/components/wallpaper-list';
const subreddit = 'wallpaper+wallpapers+wallpaperengine';
export default function Anime() {
  return <WallpaperList title="Desktop" subreddit={subreddit} />;
}
