import React from 'react'
import {View, StyleSheet, Picker, StatusBar} from 'react-native'
import Meteo from "./components/Meteo"
import Actualite from "./components/Actualite"


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
            <View>

                { /* Force l'affichage de la barre d'outils et met un espace pour empêcher la superposition */ }
                <StatusBar hidden={false}></StatusBar>


                { /* Application */ }

                <View style={styles.debug}>

                    { /* Menu de choix du flux d'information */ }
                    <Picker
                        selectedValue={this.state.flux}
                        onValueChange={(itemValue, itemPosition) => {
                            this.setFlux(itemValue);
                            console.log("Change flux to " + itemValue);
                        }}
                        mode="dropdown"
                    >
                        <Picker.Item label="Météo" value="Météo"/>
                        <Picker.Item label="Actualité" value="Actualité"/>
                    </Picker>
                </View>

                <View style={{margin: 16}}>

                    { /* Affichage du flux */ }
                    {this.fluxSource()}

                </View>

            </View>
        )
    }


}

const styles = StyleSheet.create({

    debug: {
        borderWidth: 2,
        borderColor: "red"
    }
});