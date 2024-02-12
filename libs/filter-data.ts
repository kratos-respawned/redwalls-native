import { WallpaperCard } from '~/typings/wallpaper-card';

export const filterData = (arr: any[], after: string) => {
  const data: WallpaperCard[] = [];
  arr
    .filter((item: any) => {
      return (
        typeof item.data.preview !== 'undefined' &&
        item.data.is_video !== true &&
        // check for duplicate images
        data.every((wall) => wall.img !== item.data.preview.images[0].resolutions[2].url) &&
        // check for duplicate titles
        data.every((wall) => wall.title !== item.data.title)

        // && item.data.over_18 !== true
      );
    })
    .map((item: any) => {
      if (item.data.preview.images[0].resolutions[3] === undefined) return;
      data.push({
        title: item.data.title,
        after,
        author: item.data.author,
        subreddit: item.data.subreddit,
        width: item.data.preview.images[0].resolutions[2].width,
        height: item.data.preview.images[0].resolutions[2].height,
        img:
          item.data.preview.images[0].resolutions[2].width >
          item.data.preview.images[0].resolutions[2].height
            ? item.data.preview.images[0].resolutions[2].url
            : item.data.preview.images[0].resolutions[2].url,
        url: item.data.url,
        blurUrl: item.data.preview.images[0].resolutions[0].url,
        highResUrl: item.data.preview.images[0].resolutions[3].url,
        highResHeight:
          item.data.preview.images[0].resolutions[3].height ??
          item.data.preview.images[0].resolutions[1].height,
        highResWidth: item.data.preview.images[0].resolutions[3].width,
        orientation:
          item.data.preview.images[0].resolutions[2].width >
          item.data.preview.images[0].resolutions[2].height
            ? 'landscape'
            : 'portrait',
        nsfw: item.data.over_18,
      });
    });
  if (data.length === 0) return [];
  return data;
};
