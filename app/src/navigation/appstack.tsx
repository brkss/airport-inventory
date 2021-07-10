import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Home, CreateProduct, List } from '../screen';

export const AppStack : React.FC = () => {

    const { Navigator, Screen } = createStackNavigator();

    return(
        <Navigator screenOptions={{headerShown: false}}>
            <Screen name='create' component={CreateProduct} />
            <Screen name='list' component={List} />
            <Screen name='home' component={Home} />
        </Navigator>
    );
}