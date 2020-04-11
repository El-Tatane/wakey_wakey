import React from 'react';
import { Image, StyleSheet, Text, Button, TouchableOpacity, View, Alert, ActivityIndicator } from 'react-native';
import JSONTree from "react-native-json-tree";

class NewsApp extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            isLoading : true,
            dataSource : null,
        }
    }

    componentDidMount(){
        return fetch('http://newsapi.org/v2/top-headlines?country=us&category=technology&apiKey=db08c72f235949f199d933b86e05e541')
            .then ((response) =>
                this.setState({
                    isLoading : false,
                    dataSource : response.json(),
                })
            )
            .catch((error) => {
                console.log(error)
            });
    }

    render(){
        if (this.state.isLoading){
            return (
                <View style = {styles.container}>
                    <Text style={styles.instructions}>
                        No data
                    </Text>
                </View>
            )
        }else{
            return <View style={styles.container}>
                <JSONTree data={this.state.dataSource} />
            </View>
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo: {
        width: 305,
        height: 159,
        marginBottom: 20,
    },
    instructions: {
        color: '#888',
        fontSize: 18,
        marginHorizontal: 15,
        marginBottom: 10,
    },
});

export default NewsApp;
