import React, { useState } from "react"
import {View, Text, StyleSheet, Picker} from "react-native"

/**
 * Menu barre en haut de l'écran qui permet de choisir le type de flux à visualiser
 */
export default function Menu(){
    const [selectedValue, setSelectedValue] = useState("Météo");

    return(
        <View style={styles.debug}>
            <Picker
                selectedValue={selectedValue}
                onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
            >
                <Picker.Item label="Météo" value="java"/>
                <Picker.Item label="Actualité" value="Actualité"/>
            </Picker>
        </View>
    )
}

const styles = StyleSheet.create({
    debug : {
        borderColor: "green",
        borderWidth: 2
    },

    text : {
        fontSize: 32
    }
});