import React from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home, CreateProduct, ListProduct } from '../screen';
import Ionicons from 'react-native-vector-icons/Ionicons';


const Tab = createBottomTabNavigator();

export const Tabs : React.FC = () => {

    return(
        <Tab.Navigator>
            <Tab.Screen name="List" component={ListProduct} options={{tabBarIcon: () => (
                <Ionicons name='ios-list-circle-outline' size={30}  />
            )}} />
            <Tab.Screen name="Creer" component={CreateProduct} options={{tabBarIcon: () => (
                <Ionicons name='add-circle-outline' size={30}  />
            )}} />
            
        </Tab.Navigator> 
    );
}