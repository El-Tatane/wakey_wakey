import React from 'react';
import axios from 'axios'
import {
    StyleSheet,
    KeyboardAvoidingView,
    View,
    ImageBackground,
    StatusBar,
    Text
} from 'react-native';
import SingleCardView from 'react-native-simple-card';

import getImageForWeather from '../utils/getImagesForWeather';

import SearchBox from './SearchBox';
import WeatherText from './WeatherText';

const API_KEY = "849506b7df59e025b14785593373c84b"
const url = "http://api.openweathermap.org/data/2.5/weather"


export default class Weather extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            first: true,
            loading: false,
            error: false,
            location: '',
            temperature: 0,
            humidity: 0,
            weather: '',
            minTemp: 0,
            maxTemp: 0,
            windSpeed: 0,
            weatherSys : null
        };
        // this.fetchWeather('San Francisco');
    }




    fetchWeather= city  => {
        axios.get(`${url}?q=${city}&appid=${API_KEY}`)
            .then((response) => {
                this.setState({
                    location: response.data.name,
                    weather: response.data.weather[0].description,
                    temperature: response.data.main.temp,
                    humidity : response.data.main.humidity,
                    minTemp: response.data.main.temp_min,
                    maxTemp: response.data.main.temp_max,
                    windSpeed: response.data.wind.speed,
                    weatherSys : response.data.sys,
                    first : false,
                    error : false
                })
        }).catch(err => {
            this.setState({
                loading: false,
                error: true,
                first : false
            });
        })
    }

    render() {
        const {
            location,
            error,
            loading,
            weather,
            temperature,
            humidity,
            minTemp,
            maxTemp,
            windSpeed,
            weatherJson
        } = this.state;
        return (
            <KeyboardAvoidingView style={styles.container} behavior="padding">
                <StatusBar barStyle="light-content" />

                <ImageBackground
                    source={getImageForWeather(weather)}
                    style={styles.imageContainer}
                    imageStyle={styles.image}
                >
                    <SearchBox
                        placeholder="Select a City"
                        // onSubmit={this.handleUpdateLocation}
                        onSubmit={this.fetchWeather}
                    />
                    { !this.state.first && (
                        <View style={styles.cards}>
                            <SingleCardView backgroundColor="#bbeeff">
                                <WeatherText
                                    location={location}
                                    loading={loading}
                                    weather={weather}
                                    temperature={temperature}
                                    humidity={humidity}
                                    error={error}
                                    minTemp={minTemp}
                                    maxTemp={maxTemp}
                                    windSpeed={windSpeed}
                                    weatherJson={{weatherJson}}
                                />
                            </SingleCardView>
                        </View>
                    )}
                </ImageBackground>

            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    weatherInfo: {
        textAlign: 'center',
        fontSize: 20,
        margin: 10,
        color: 'white',
    },
    imageContainer: {
        flex: 1
    },
    image: {
        flex: 1,
        width: null,
        height: null,
        resizeMode: 'cover'
    },
    cards: {
        flex: 12,
    }
});
