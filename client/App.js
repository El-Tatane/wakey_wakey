import React from 'react'
import {Text, View, StyleSheet, Picker} from 'react-native'
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

    fluxSource(){
        switch(this.state.flux){
            case "Météo":
                return <Meteo/>
            case "Actualité":
                return <Actualite/>
            default:
                throw "Etat de flux non reconnu";
        }
    }

    render() {
        return(
            <View style={{marginTop: 32}}>
                <View style={styles.debug}>
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
    },

    space : {
        marginTop: 32 // 1 em d'espace pour la bar d'outils du téléphone
    }
});