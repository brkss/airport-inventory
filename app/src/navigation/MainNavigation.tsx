import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { AppStack } from './appstack';
export const MainNavigation : React.FC = () => {

    return(
        <NavigationContainer>
            <AppStack />
        </NavigationContainer>
    );
}