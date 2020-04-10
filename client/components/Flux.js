import React from "react"
import {View, Text, StyleSheet} from "react-native"

/**
 * Menu barre en haut de l'écran qui permet de choisir le type de flux à visualiser
 */
export default class Menu extends React.Component{
    render(){
        return(
            <View style={styles.debug}>
                <Text>Ici sera affiché le flux</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    debug : {
        borderColor: "red",
        borderWidth: 2
    }
});