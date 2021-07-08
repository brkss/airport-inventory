import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
 
export const Home : React.FC = () => {


    return(
        <View style={styles.container}>  
            <Text>Home Page</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center'
    }
})