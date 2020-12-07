import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {RNCamera} from 'react-native-camera';
import api from './service/api';

declare const global: {HermesInternal: null | {}};

const App = () => {
  const [camera, setCamera] = useState<any>();

  const takePicture = async () => {
    setTimeout(async () => {
      if (camera) {
        const options = {quality: 0.5, base64: true};
        const image = await camera.takePictureAsync(options);
        const formData = new FormData();
        formData.append('image', image);
        try {
          const response = await api.post('/', formData);
          console.log(response);
        } catch (error) {
          console.log(error);
        }
      }
    }, 3000);
  };

  return (
    <View style={styles.content}>
      <RNCamera
        ref={(ref) => {
          setCamera(ref);
        }}
        style={styles.preview}
        type={RNCamera.Constants.Type.front}
        flashMode={RNCamera.Constants.FlashMode.on}
        faceDetectionMode={RNCamera.Constants.FaceDetection.Mode.fast}
        onFacesDetected={takePicture}
        androidCameraPermissionOptions={{
          title: 'Permission to use camera',
          message: 'We need your permission to use your camera',
          buttonPositive: 'Ok',
          buttonNegative: 'Cancel',
        }}
        androidRecordAudioPermissionOptions={{
          title: 'Permission to use audio recording',
          message: 'We need your permission to use your audio',
          buttonPositive: 'Ok',
          buttonNegative: 'Cancel',
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    flex: 0,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: '#000',
    padding: 15,
    minWidth: '100%',
  },
  label: {
    color: '#fff',
    fontSize: 14,
    borderColor: '#c1c1c1',
    borderRadius: 50,
  },
});

export default App;
