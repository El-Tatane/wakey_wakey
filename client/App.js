import React from 'react'
import {View, StyleSheet, StatusBar, Text, Button, Vibration } from 'react-native'
import Weather from "./components/Weather"
import ApiLoader from "./components/ApiLoader"
import { NavigationContainer } from '@react-navigation/native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { Camera } from 'expo-camera'
import { TouchableOpacity } from 'react-native-gesture-handler'
import * as FileSystem from 'expo-file-system';


const Tab = createMaterialTopTabNavigator();

const SERVER_IP = "192.168.1.23";
const SERVER_PORT = "80";
const SERVER_API = "http://" + SERVER_IP + ":" + SERVER_PORT + "/image";

export default class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            flux: "Weather",
            hasPermission: null,
            cameraReady: false,
            image: <Text>placeholder</Text>
        }

        this.camera = null;
        this.cameraRender = 
            <Camera
                type={Camera.Constants.Type.front}
                ref={ref => {this.camera = ref;}}
            >
            </Camera>;

        this.takePicture = this.takePicture.bind(this);
        this.sendPicture = this.sendPicture.bind(this);

        this.intervalPhotoTime = 4000;
        this.intervalPhoto = setInterval(this.takePicture, this.intervalPhotoTime);

        this.tryBeforeAlert = 3;
        this.currentTryWithoutOpenEyes = 0;
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
            case "Weather":
                return <Weather/>
            case "Actualité":
                return <Actualite/>
            default:
                // Rend une erreur en cas d'état invalide
                throw "Etat de flux non reconnu";
        }
    }

     ActualiteScreen({ navigation }) {
        return (
            <View style={{flex:1, flexDirection: 'row', marginBottom:3}}>
                <ApiLoader api_url='http://newsapi.org/v2/top-headlines?country=fr&apiKey=db08c72f235949f199d933b86e05e541'/>
            </View>

        );
    }

     TechnoScreen({ navigation }) {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>Techno Screen</Text>
                <ApiLoader api_url='http://newsapi.org/v2/top-headlines?country=us&category=technology&apiKey=db08c72f235949f199d933b86e05e541'/>
            </View>
        );
    }

    // take a picture and store in cache, then read the photo as binary
    async takePicture(){
        clearInterval(this.intervalPhoto);
        this.intervalPhoto = null;
        console.log("Clear interval");

        console.log("In takePicture, console = " + this.camera);
        console.log("And cameraRender = " + this.cameraRender);
        console.log("state = " + this.state);
        alert("Check expo console for debug info.");
        let photo = await this.camera.takePictureAsync();
        console.log(photo);
        this.sendPicture(photo.uri);
    };

    async sendPicture(uri){
        console.log("send picture to " + SERVER_API);

        var form = new FormData();
        form.append("file", {uri : uri, type : "image/jpg", name : "testname.jpg"});

        const config = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data',
            },
            body: form,
        };

        fetch(SERVER_API, config)
        .then(response => response.json())
        .then(data => {
            this.currentTryWithoutOpenEyes++;
            switch(data["AU45_c"]){
                case -1:
                    // yeux pas détectés
                    console.log("Yeux pas détectés");
                    this.intervalPhoto = setInterval(this.takePicture, this.intervalPhotoTime);
                    break;
                case 0:
                    // yeux ouverts
                    console.log("Yeux ouverts");
                    this.intervalPhoto = setInterval(this.takePicture, this.intervalPhotoTime);
                    this.currentTryWithoutOpenEyes = 0;
                    Vibration.cancel();
                    break;
                case 1:
                    // yeux fermés
                    console.log("Yeux fermés");
                    this.intervalPhoto = setInterval(this.takePicture, this.intervalPhotoTime);
                    break;
                default:
                    // valeur bug
                    console.log("Erreur sur la valeur de retour");
                    break;
            }

            if (this.currentTryWithoutOpenEyes >= this.tryBeforeAlert){
                Vibration.vibrate(10000);
            }
        })
        .catch(error => console.log("y'a une erreur" + error));
    }

    /**
     * Fonction de rendu
     */
    render() {

        // get camera permission
        (async () => {
            const { status } = await Camera.requestPermissionsAsync();
            this.setHasPermission(status === 'granted');
        })()

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

                    {this.cameraRender}

                    { /* Correctly display the phone status bar */ }
                    <StatusBar></StatusBar>

                    { /* FOR DEBUG */ }
                    <TouchableOpacity style={{alignItems: "center", marginTop: 5}}
                        onPress={this.takePicture}>
                        <Button title="Tap to take picture (debug)"/>
                    </TouchableOpacity>

                    { /* MAIN CONTAINER */ }
                    <NavigationContainer>
                        <Tab.Navigator>
                            <Tab.Screen name="Météo" component={Weather} />
                            <Tab.Screen name="Actualité" component={this.ActualiteScreen}/>
                            <Tab.Screen name="Tech" component={this.TechnoScreen}/>
                        </Tab.Navigator>
                    </NavigationContainer>
                </View>
            )
        }
    }

}
