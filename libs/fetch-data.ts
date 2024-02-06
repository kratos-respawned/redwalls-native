import { filterData } from './filter-data';

export async function fetchWallpapers(url: string) {
  const rawData = await fetch(url);
  const rawJSON = await rawData.json();

  const walls = filterData(rawJSON.data.children);
  return walls;
}
