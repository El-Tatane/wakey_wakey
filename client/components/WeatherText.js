import React, { Component } from 'react';
import { View, Text, StyleSheet, Platform, ActivityIndicator, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const genIcon = (description, sys) => {
    const { sunrise, sunset } = sys;
    const rightNow = Date.now() / 1000;
    const dayTime = rightNow > sunrise && rightNow < sunset;
    let icon;
    switch (description) {
        case 'Haze':
            icon = dayTime ?
                (<Icon name="ios-cloudy" style={styles.weatherIcon} size={40} color="#FFFFFF" />) :
                (<Icon name="ios-cloudy-night" style={styles.weatherIcon} size={40} color="#FFFFFF" />);
            break;
        case 'Snow':
            icon = (<Icon name="ios-snow" style={styles.weatherIcon} size={40} color="#FFFFFF" />);
            break;
        case 'Clouds':
            icon = (<Icon name="ios-cloudy" style={styles.weatherIcon} size={40} color="#FFFFFF" />);
            break;
        case 'Clear':
            icon = dayTime ?
                (<Icon name="ios-sunny" style={styles.weatherIcon} size={40} color="#FFFF44" />) :
                (<Icon name="ios-moon" style={styles.weatherIcon} size={40} color="#FFFFFF" />);
            break;
        case 'Rain':
            icon = (<Icon name="ios-rainy" style={styles.weatherIcon} size={40} color="#FFFFFF" />);
            break;
        case 'Fog':
            icon = (<Icon name="ios-partlysunny" style={styles.weatherIcon} size={40} color="#FFFFFF" />);
            break;
        default:
            icon = (<Icon name="ios-sunny" style={styles.weatherIcon} size={40} color="#FFFFFF" />);
    }
    return icon;
};

class WeatherText extends Component {
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
        } = this.props;
        return (
            <View>
                <View style={styles.spinner}>
                    <ActivityIndicator animating={loading} color="#000fff" size="large" />
                </View>

                {!loading && (
                    <View>
                        {error && (
                            <Text style={[styles.textStyle, styles.textErrorStyle]}>
                                Could not load weather at this time.
                            </Text>
                        )}
                        {!error && (
                            <View>
                                <Text
                                    style={[
                                        styles.textTop,
                                        styles.textCityStyle,
                                        styles.textStyle
                                    ]}
                                >
                                    {location}
                                    {'\n'}
                                    <Text style={styles.weather}>{weather.toUpperCase()}</Text>
                                </Text>
                                {genIcon(weather, weatherJson)}
                                <Text style={[styles.textMiddle, styles.textStyle]}>
                                    {`${Math.round(temperature-273.15)}°C`}
                                    {'\n'}
                                    <Text style={[styles.textStyle, styles.tempRange]}>
                                        {`${Math.round(minTemp - 273.15)} °C`} - {`${Math.round(maxTemp - 273.15)} °C`}
                                    </Text>
                                </Text>
                                <Text style={[styles.textBottom, styles.textStyle]}>
                                    Humidity Percentage: {humidity}%
                                    {'\n'}
                                    Wind: {(windSpeed * 1.609344).toPrecision(2)} km/h
                                </Text>
                            </View>
                        )}
                    </View>
                )}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    spinner: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    },
    textStyle: {
        fontFamily: Platform.OS === 'ios' ? 'AvenirNext-Regular' : 'Roboto'
    },
    textErrorStyle: {
        padding: 80,
        alignSelf: 'center',
        fontSize: 32,
        fontWeight: '200',
        color: 'white'
    },

    textTop: {
        paddingTop: 10,
        textAlign: 'left',
        fontSize: 32,
        color: 'white'
    },
    textCityStyle: {
        fontSize: 28,
        paddingLeft: 10,
        fontWeight: '300', color: 'white'

    },
    weather: {
        fontSize: 18,
        color: 'white'
    },
    textMiddle: {
        marginTop: 40,
        textAlign: 'center',
        fontSize: 64,
        color: 'white'
    },
    tempRange: {
        fontSize: 16,
        color: 'white'
    },
    textBottom: {
        marginTop: 40,
        textAlign: 'right',
        fontSize: 18,
        paddingRight: 10,
        color: 'white'
    },
    weatherIcon: {
        marginLeft : 20
    }
});

export default WeatherText;
