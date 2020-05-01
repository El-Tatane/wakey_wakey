import React from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import ApiFront from "./ApiFront";

export default class ApiLoader extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            isLoading : true,
            dataSource : [],
        }
        this.api_url = this.props.api_url
    }

    componentDidMount(){
        return fetch(this.api_url)
            .then ((response) => response.json())
            .then ((responseJson ) => {
                this.setState({
                    isLoading : false,
                    dataSource : responseJson.articles,
                })
            })
            .catch((error) => {
                console.log(error)
            });
    }

    render(){
        if (this.state.isLoading){
            console.log("NO DATA !")
            return (
                <View style = {{flex:1, justifyContent: 'center', alignItems: 'center'}}>
                    <ActivityIndicator size="large" color="#330066" animating/>
                </View>
            )
        }else{
            console.log("THERE IS DATA !")
            return <ApiFront foot_data={this.state.dataSource} />
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


