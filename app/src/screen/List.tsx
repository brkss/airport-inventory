import React from "react";
import { View, StyleSheet, Dimensions, Text } from 'react-native';

const {height} = Dimensions.get('window');
export const List : React.FC = () => {

    return(
        <View>
            <Text>List Products</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: height,
        justifyContent: 'center',
        alignItems: 'center'
    }
})