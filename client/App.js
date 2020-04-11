import * as React from 'react';
import { Button, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import WeatherApp from './components/WeatherApi';
import NewsApp from './components/NewsApi';
import TechnoApp from './components/TechnoApi';


function HomeScreen({ navigation }) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'space-between' }}>
            <Text>Home Screen</Text>
            <Button
                title="Weather"
                onPress={() => navigation.navigate('Weather')}
            />

            <Button
                title="Football"
                onPress={() => navigation.navigate('Football')}
            />

            <Button
                title="News"
                onPress={() => navigation.navigate('News')}
            />

            <Button
                title="Techno"
                onPress={() => navigation.navigate('Techno')}
            />

        </View>
    );
}

function WeatherScreen({ navigation }) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Weather Screen</Text>
            <WeatherApp city='London'/>
        </View>

    );
}

function FootballScreen({ navigation }) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Football Screen</Text>
        </View>
    );
}

function NewsScreen({ navigation }) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>News Screen</Text>
            <NewsApp/>
        </View>
    );
}

function TechnoScreen({ navigation }) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Techno Screen</Text>
            <TechnoApp/>
        </View>
    );
}

const Stack = createStackNavigator();

function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="Weather" component={WeatherScreen} />
                <Stack.Screen name="Football" component={FootballScreen} />
                <Stack.Screen name="News" component={NewsScreen} />
                <Stack.Screen name="Techno" component={TechnoScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default App;
