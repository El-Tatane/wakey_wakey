import React from 'react'
import {View, StyleSheet, StatusBar, Text, Button } from 'react-native'
import Meteo from "./components/Meteo"
import Actualite from "./components/Actualite"
import { NavigationContainer } from '@react-navigation/native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { Camera } from 'expo-camera'
import { TouchableOpacity } from 'react-native-gesture-handler'
import * as FileSystem from 'expo-file-system';


const Tab = createMaterialTopTabNavigator();

const SERVER_IP = "192.168.1.10";
const SERVER_PORT = "8000";
const SERVER_API = "http://" + SERVER_IP + ":" + SERVER_PORT;

export default class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            flux: "Météo",
            hasPermission: null,
            cameraReady: false,
            image: <Text>placeholder</Text>
        }
    }

    setFlux(flux){
        this.setState({flux});
    }

    setHasPermission(hasPermission){
        this.setState({hasPermission});
    }

    setCameraReady(cameraReady){
        this.setState({cameraReady});
    }

    /**
     * Renvoie le composant de flux d'information lié à l'état du menu
     * @returns {*}
     */
    fluxSource(){
        switch(this.state.flux){
            case "Météo":
                return <Meteo/>
            case "Actualité":
                return <Actualite/>
            default:
                // Rend une erreur en cas d'état invalide
                throw "Etat de flux non reconnu";
        }
    }

    /**
     * Fonction de rendu
     */
    render() {

        let camera; // camera ref
        
        // get camera permission
        (async () => {
            const { status } = await Camera.requestPermissionsAsync();
            this.setHasPermission(status === 'granted');
        })()

        // take a picture and store in cache, then read the photo as binary
        async function takePicture(){
            alert("Check expo console for debug info.");
            let photo = await camera.takePictureAsync();
            console.log(photo);
            let img = await readPhotoAsBinaryAsync(photo.uri);
            console.log("image as binary : ", img);
            sendPicture(img);
        };

        /**
         * Send the picture to the prediction server
         * @param {*} img 
         */
        async function sendPicture(img){
            console.log("send picture to " + SERVER_API);
            fetch('http://example.com', {
            method: 'POST',
            headers: {
                Accept: 'text/plain',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                firstParam: 'yourValue',
                secondParam: 'yourOtherValue',
            }),
            })
            .then(response => console.log("on a une réponse"))
            .catch(error => console.log("y'a une erreur"));
        }

        /**
         * Read the photo at given uri as binary and returns a promises that gives the file.
         * @param {*} uri the photo uri
         */
        async function readPhotoAsBinaryAsync(uri){
            return FileSystem.readAsStringAsync(uri);
        }

        if (this.state.hasPermission === null) {
            return <Text/>;
        }

        else if (this.state.hasPermission === false) {
            // TODO : notice the user of the permission problem
            return <Text>No access to camera</Text>;
        }

        else {

            return(
                <View style={{ flex: 1 }}>

                    { /* INVISIBLE CAMERA */ }
                    <Camera 
                        type={Camera.Constants.Type.front}
                        ref={ref => {camera = ref;}}
                    >
                    </Camera>

                    { /* Correctly display the phone status bar */ }
                    <StatusBar></StatusBar>

                    { /* FOR DEBUG */ }
                    <TouchableOpacity style={{alignItems: "center", marginTop: 5}}
                        onPress={takePicture}>
                        <Button title="Tap to take picture (debug)"/>
                    </TouchableOpacity>

                    { /* MAIN CONTAINER */ }
                    <NavigationContainer>
                        <Tab.Navigator>
                            <Tab.Screen name="Météo" component={Meteo} />
                            <Tab.Screen name="Actualité" component={Actualite} />
                        </Tab.Navigator>
                    </NavigationContainer>

                </View>
            )
        }
    }

}