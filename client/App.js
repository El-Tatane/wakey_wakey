import React from 'react'
import { Text, View, StyleSheet } from 'react-native'
import Flux from "./components/Flux"
import Menu from "./components/Menu"

export default function App() {

    return (
        <View style={styles.space}>
            <Menu/>
            <Flux/>
        </View>

    );
}

const styles = StyleSheet.create({
    space : {
        marginTop: 32 // 1 em d'espace pour la bar d'outils du téléphone
    }
});