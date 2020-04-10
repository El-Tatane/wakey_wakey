import React from "react"
import {View, Text, StyleSheet, Picker} from "react-native"

/**
 * Menu barre en haut de l'écran qui permet de choisir le type de flux à visualiser
 */
export default class  Menu extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            flux: "Météo"
        }
    }

    setFlux(flux){
        this.setState({flux});
    }


    render() {
        return(
            <View style={styles.debug}>
                <Picker
                    selectedValue={this.state.flux}
                    onValueChange={(itemValue, itemPosition) => this.setFlux(itemValue)}
                    mode="dropdown"
                >
                    <Picker.Item label="Météo" value="java"/>
                    <Picker.Item label="Actualité" value="Actualité"/>
                </Picker>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    debug : {
        borderColor: "green",
        borderWidth: 2
    }
});