// Components/CatFacts.js

import React from 'react'
import { StyleSheet, View, TextInput, Button, Text } from 'react-native'

class CatFacts extends React.Component {
    state = {
        factText: String
    }
    componentDidMount() {
        fetch('https://catfact.ninja/fact?max_length=140')
            .then(res => res.json())
            .then((data) => {
                this.setState({ factText: data.fact })
                console.log(this.state.factText)
            })
            .catch(console.log)
    }
    render() {

        return (
            <View style={styles.main_container}>
                <Text style={styles.titleText}>Did you know ?</Text>
                <Text style={styles.baseText}>{this.state.factText}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    main_container: {
        flex: 1,
        marginTop: 20
    },
    baseText: {
        fontFamily: "serif"
    },
    titleText: {
        fontSize: 20,
        fontWeight: "bold"
    }
})

export default CatFacts
