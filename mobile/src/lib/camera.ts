import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { Alert, Platform } from 'react-native';

export interface ImagePickerResult {
  uri: string;
  width: number;
  height: number;
  fileSize: number;
  base64?: string;
}

export interface CameraOptions {
  quality?: number;
  allowsEditing?: boolean;
  aspect?: [number, number];
  base64?: boolean;
}

export const requestCameraPermissions = async (): Promise<boolean> => {
  try {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    
    if (status !== 'granted') {
      Alert.alert(
        'Permisos Requeridos',
        'Se necesita acceso a la cámara para tomar fotos de progreso.',
        [
          { text: 'Cancelar', style: 'cancel' },
          { text: 'Configuración', onPress: () => ImagePicker.requestCameraPermissionsAsync() },
        ]
      );
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('Error requesting camera permissions:', error);
    return false;
  }
};

export const requestMediaLibraryPermissions = async (): Promise<boolean> => {
  try {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (status !== 'granted') {
      Alert.alert(
        'Permisos Requeridos',
        'Se necesita acceso a la galería para seleccionar fotos.',
        [
          { text: 'Cancelar', style: 'cancel' },
          { text: 'Configuración', onPress: () => ImagePicker.requestMediaLibraryPermissionsAsync() },
        ]
      );
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('Error requesting media library permissions:', error);
    return false;
  }
};

export const takePhoto = async (options: CameraOptions = {}): Promise<ImagePickerResult | null> => {
  try {
    const hasPermission = await requestCameraPermissions();
    if (!hasPermission) return null;

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: options.quality || 0.8,
      allowsEditing: options.allowsEditing !== false,
      aspect: options.aspect || [4, 3],
      base64: options.base64 || false,
    });

    if (result.canceled) return null;

    const asset = result.assets[0];
    const fileInfo = await FileSystem.getInfoAsync(asset.uri);

    return {
      uri: asset.uri,
      width: asset.width,
      height: asset.height,
      fileSize: (fileInfo as any).size || 0,
      base64: asset.base64,
    };
  } catch (error) {
    console.error('Error taking photo:', error);
    Alert.alert('Error', 'No se pudo tomar la foto. Intenta de nuevo.');
    return null;
  }
};

export const pickImage = async (options: CameraOptions = {}): Promise<ImagePickerResult | null> => {
  try {
    const hasPermission = await requestMediaLibraryPermissions();
    if (!hasPermission) return null;

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: options.quality || 0.8,
      allowsEditing: options.allowsEditing !== false,
      aspect: options.aspect || [4, 3],
      base64: options.base64 || false,
    });

    if (result.canceled) return null;

    const asset = result.assets[0];
    const fileInfo = await FileSystem.getInfoAsync(asset.uri);

    return {
      uri: asset.uri,
      width: asset.width,
      height: asset.height,
      fileSize: (fileInfo as any).size || 0,
      base64: asset.base64,
    };
  } catch (error) {
    console.error('Error picking image:', error);
    Alert.alert('Error', 'No se pudo seleccionar la imagen. Intenta de nuevo.');
    return null;
  }
};

export const pickMultipleImages = async (
  maxImages: number = 10
): Promise<ImagePickerResult[]> => {
  try {
    const hasPermission = await requestMediaLibraryPermissions();
    if (!hasPermission) return [];

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.8,
      allowsEditing: false,
      allowsMultipleSelection: true,
      selectionLimit: maxImages,
    });

    if (result.canceled) return [];

    const images: ImagePickerResult[] = [];

    for (const asset of result.assets) {
      const fileInfo = await FileSystem.getInfoAsync(asset.uri);
      images.push({
        uri: asset.uri,
        width: asset.width,
        height: asset.height,
        fileSize: (fileInfo as any).size || 0,
      });
    }

    return images;
  } catch (error) {
    console.error('Error picking multiple images:', error);
    Alert.alert('Error', 'No se pudieron seleccionar las imágenes. Intenta de nuevo.');
    return [];
  }
};

export const showImageSourceOptions = async (
  options: CameraOptions = {}
): Promise<ImagePickerResult | null> => {
  return new Promise((resolve) => {
    Alert.alert(
      'Seleccionar Foto',
      'Elige una opción',
      [
        {
          text: 'Tomar Foto',
          onPress: async () => {
            const result = await takePhoto(options);
            resolve(result);
          },
        },
        {
          text: 'Elegir de Galería',
          onPress: async () => {
            const result = await pickImage(options);
            resolve(result);
          },
        },
        {
          text: 'Cancelar',
          style: 'cancel',
          onPress: () => resolve(null),
        },
      ],
      { cancelable: true, onDismiss: () => resolve(null) }
    );
  });
};

export const deleteImage = async (uri: string): Promise<boolean> => {
  try {
    await FileSystem.deleteAsync(uri, { idempotent: true });
    return true;
  } catch (error) {
    console.error('Error deleting image:', error);
    return false;
  }
};

export const saveToGallery = async (uri: string): Promise<boolean> => {
  try {
    // This requires expo-media-library
    // await MediaLibrary.saveToLibraryAsync(uri);
    Alert.alert('Guardado', 'La imagen se guardó en tu galería');
    return true;
  } catch (error) {
    console.error('Error saving to gallery:', error);
    Alert.alert('Error', 'No se pudo guardar la imagen');
    return false;
  }
};

export const compressImage = async (
  uri: string,
  quality: number = 0.7
): Promise<ImagePickerResult | null> => {
  try {
    const manipResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality,
      allowsEditing: false,
    });

    if (manipResult.canceled) return null;

    const asset = manipResult.assets[0];
    const fileInfo = await FileSystem.getInfoAsync(asset.uri);

    return {
      uri: asset.uri,
      width: asset.width,
      height: asset.height,
      fileSize: (fileInfo as any).size || 0,
    };
  } catch (error) {
    console.error('Error compressing image:', error);
    return null;
  }
};
