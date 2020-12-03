import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {RNCamera} from 'react-native-camera';

declare const global: {HermesInternal: null | {}};

const App = () => {
  const [camera, setCamera] = useState<any>();

  const takePicture = async () => {
    if (camera) {
      const options = {quality: 0.5, base64: true};
      const response = await camera.takePictureAsync(options);
      console.log(response.uri);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <RNCamera
          ref={(ref) => {
            setCamera(ref);
          }}
          style={styles.preview}
          type={RNCamera.Constants.Type.front}
          flashMode={RNCamera.Constants.FlashMode.on}
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
        <View style={{flex: 0, flexDirection: 'row', justifyContent: 'center'}}>
          <TouchableOpacity
            onPress={() => takePicture()}
            style={styles.capture}>
            <Text style={{fontSize: 14}}> Capturar </Text>
          </TouchableOpacity>
        </View>
      </View>
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
    backgroundColor: '#000',
    color: '#fff',
    borderRadius: 5,
    padding: 15,
  },
});

export default App;
