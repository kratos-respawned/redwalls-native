import { documentDirectory, downloadAsync } from 'expo-file-system';
import {
  addAssetsToAlbumAsync,
  createAlbumAsync,
  createAssetAsync,
  getAlbumAsync,
  requestPermissionsAsync,
} from 'expo-media-library';
import { Alert, Platform } from 'react-native';
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
  const fileUri = documentDirectory + `${name.slice(0, 10)}.jpg`;
  try {
    const res = await downloadAsync(url, fileUri);
    console.log('Downloaded: ', res);
    saveFile(res.uri);
  } catch (err) {
    console.log('FS Err: ', err);
  }
};

const saveFile = async (fileUri: string) => {
  console.log('Save file: ', fileUri);

  const permission = await requestPermissionsAsync();
  if (!permission.granted) {
    Alert.alert('Permission required', 'You need to grant permission to save the image');
    return;
  }
  try {
    const asset = await createAssetAsync(fileUri);
    const album = await getAlbumAsync('Redwalls');
    if (album == null) {
      await createAlbumAsync('Redwalls', asset, false);
    } else {
      await addAssetsToAlbumAsync([asset], album, false);
    }
  } catch (err) {
    console.log('Save err: ', err);
  }
};
