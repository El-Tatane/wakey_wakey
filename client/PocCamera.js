import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity,Image, StyleSheet  } from 'react-native';
import { Camera } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.front);
  let camera;
    const Weather = () => {
        return (
            <View style={styles.weatherContainer}>
                <View style={styles.headerContainer}>
                    <MaterialCommunityIcons size={48} name="weather-sunny" color={'#fff'} />
                    <Text style={styles.tempText}>Temperature˚</Text>
                </View>
                <View style={styles.bodyContainer}>
                    <TouchableOpacity
                        style={{
                          flex: 1,
                          alignItems: 'center',
                        }}
                        onPress={() => {
                            setInterval(() => refreshPic(),
                                5000);
                        }}>
                      <Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}> WAKE ME UP INSIDE !!!</Text>
                    </TouchableOpacity>
                    <Text style={styles.title}>So Sunny</Text>
                    <Text style={styles.subtitle}>It hurts my eyes!</Text>
                </View>
            </View>
        );
    };

    const styles = StyleSheet.create({
        weatherContainer: {
            flex: 1,
            backgroundColor: '#f7b733'
        },
        headerContainer: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center'
        },
        tempText: {
            fontSize: 48,
            color: '#fff'
        },
        bodyContainer: {
            flex: 2,
            alignItems: 'flex-start',
            justifyContent: 'flex-end',
            paddingLeft: 25,
            marginBottom: 40
        },
        title: {
            fontSize: 48,
            color: '#fff'
        },
        subtitle: {
            fontSize: 24,
            color: '#fff'
        }
    });
  async function takePicture(){
    if( camera ) {
      const options = {quality: 0.5};
      const data = await camera.takePictureAsync(options);
      console.log(data.uri);
    }
  }
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      const {status_roll} = await MediaLibrary.requestPermissionsAsync()
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
      <View style={{ flex: 1 }}>
        {/*<Text>Hello World!</Text>*/}
          <Weather></Weather>
        <Camera ref={ref => (camera = ref)} type={type}>
          <View
              style={{
                flex: 1,
                backgroundColor: 'transparent',
                flexDirection: 'row',
              }}>
          </View>
        </Camera>

      </View>
  );
    function refreshPic() {
        camera.takePictureAsync().then((data) => {
                console.log("width : " + data.width);
                console.log("height : " + data.height);
                console.log("URI : " + data.uri);
                MediaLibrary.saveToLibraryAsync(data.uri)
            }
        )
            .catch(err => console.error(err));
    }

}
