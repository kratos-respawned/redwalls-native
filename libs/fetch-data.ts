import { filterData } from './filter-data';
export async function fetchWallpapers({
  pageParam,
  subreddit,
}: {
  pageParam: string;
  subreddit: string;
}) {
  const url = `https://www.reddit.com/r/${subreddit}/hot.json?count=1000&after=${pageParam}&raw_json=1`;
  const rawData = await fetch(url);
  const rawJSON = await rawData.json();
  const after = rawJSON.data.after;
  const walls = filterData(rawJSON.data.children, after);
  return walls;
}
