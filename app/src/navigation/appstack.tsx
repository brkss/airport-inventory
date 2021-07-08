import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Home } from '../screen';


export const AppStack : React.FC = () => {

    const { Navigator, Screen } = createStackNavigator();

    return(
        <Navigator screenOptions={{headerShown: false}}>
            <Screen name='home' component={Home} />
        </Navigator>
    );
}