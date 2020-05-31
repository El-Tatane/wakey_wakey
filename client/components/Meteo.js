import React from 'react'
import {Text, View, StyleSheet} from 'react-native'

export default class Meteo extends React.Component {

    constructor(props) {
        super(props);
    }

    render(){
        return(
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Météo</Text>
            </View>

        )
    }

}