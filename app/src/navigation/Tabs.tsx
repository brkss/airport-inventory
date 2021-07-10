import React from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home, CreateProduct, List } from '../screen';


const Tab = createBottomTabNavigator();

export const Tabs : React.FC = () => {

    return(
        <Tab.Navigator>
            <Tab.Screen name="List" component={List} />
            <Tab.Screen name="Creer Produit" component={CreateProduct} />
            <Tab.Screen name="Creer Post" component={CreateProduct} />
        </Tab.Navigator>
    );
}