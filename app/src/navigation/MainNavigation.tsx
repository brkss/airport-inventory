import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { Tabs } from './Tabs';
export const MainNavigation : React.FC = () => {

    return(
        <NavigationContainer>
            <Tabs />
        </NavigationContainer>
    );
}