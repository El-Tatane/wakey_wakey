import React from 'react'
import {View, StyleSheet, Picker, StatusBar} from 'react-native'
import Meteo from "./components/Meteo"
import Actualite from "./components/Actualite"
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';


const Tab = createMaterialTopTabNavigator();

export default class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            flux: "Météo"
        }
    }

    setFlux(flux){
        this.setState({flux});
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
        return(
            <NavigationContainer>
                <Tab.Navigator>
                    <Tab.Screen name="Météo" component={Meteo} />
                    <Tab.Screen name="Actualité" component={Actualite} />
                </Tab.Navigator>
            </NavigationContainer>
        )
    }


}

const styles = StyleSheet.create({

    debug: {
        borderWidth: 2,
        borderColor: "red"
    }
});