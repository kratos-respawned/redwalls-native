import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import { Alert } from 'react-native';

export const handleDownload = async (name: string, url: string) => {
  const fileUri = FileSystem.documentDirectory + `${name}.jpg`;
  try {
    const res = await FileSystem.downloadAsync(url, fileUri);
    saveFile(res.uri);
  } catch (err) {
    console.log('FS Err: ', err);
  }
};

const saveFile = async (fileUri: string) => {
  const permission = await MediaLibrary.requestPermissionsAsync();
  if (!permission.granted) {
    Alert.alert('Permission required', 'You need to grant permission to save the image');
    return;
  }
  try {
    const asset = await MediaLibrary.createAssetAsync(fileUri);
    const album = await MediaLibrary.getAlbumAsync('Download');
    if (album == null) {
      await MediaLibrary.createAlbumAsync('Download', asset, false);
    } else {
      await MediaLibrary.addAssetsToAlbumAsync([asset], album, false);
    }
  } catch (err) {
    console.log('Save err: ', err);
  }
};
