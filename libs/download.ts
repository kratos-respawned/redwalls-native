import { documentDirectory, downloadAsync } from 'expo-file-system';
import {
  addAssetsToAlbumAsync,
  createAlbumAsync,
  createAssetAsync,
  getAlbumAsync,
  requestPermissionsAsync,
} from 'expo-media-library';
import { Platform, ToastAndroid } from 'react-native';
export const downloadWallpaper = async (name: string, url: string) => {
  try {
    if (Platform.OS === 'web') {
      const img = await fetch(url);
      const blob = await img.blob();
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = name;
      a.click();
    } else {
      await handleDownload(name, url);
    }
  } catch (error) {
    console.error(error);
  }
};
const handleDownload = async (name: string, url: string) => {
  ToastAndroid.show('Downloading...', ToastAndroid.SHORT);
  const fileUri = documentDirectory + `/${name.slice(0, 10)}.jpg`;
  try {
    const res = await downloadAsync(url, fileUri);
    saveFile(res.uri);
  } catch (err) {
    ToastAndroid.show('Download failed', ToastAndroid.SHORT);
    console.log('FS Err: ', err);
  }
};

const saveFile = async (fileUri: string) => {
  console.log('Save file: ', fileUri);

  const permission = await requestPermissionsAsync();
  console.log('Permission: ', permission);
  if (!permission.granted) {
    ToastAndroid.show('Permission denied', ToastAndroid.SHORT);
    return;
  }
  try {
    const asset = await createAssetAsync(fileUri);
    const album = await getAlbumAsync('Redwalls');
    if (album == null) {
      await createAlbumAsync('Redwalls', asset, false);
    } else {
      await addAssetsToAlbumAsync([asset], album, false);
      ToastAndroid.show('Wallpaper saved', ToastAndroid.SHORT);
    }
  } catch (e) {
    console.log('Save Err: ', e);
    ToastAndroid.show('Save failed', ToastAndroid.SHORT);
  }
};
