import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from './screens/SplashScreen';
import Home from './screens/Home';

const StackNavigator = createStackNavigator();

const MainStack = () => {
    return (
        <StackNavigator.Navigator
            initialRouteName="SplashScreen"
            screenOptions={{
                gestureEnabled: false,
                cardStyle: { backgroundColor: '#FFFFFF' },
                headerShown: false
            }}

        >
            <StackNavigator.Screen name="SplashScreen" component={SplashScreen} />
            <StackNavigator.Screen name="Home" component={Home} />
        </StackNavigator.Navigator>
    )
}

export default MainStack