import React from 'react';
import { View, StyleSheet, Text, Dimensions } from 'react-native';
 
const {height} = Dimensions.get('window');

export const Home : React.FC = () => {

    return(
        <View style={styles.container}>  
            <Text>Home Page</Text>
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