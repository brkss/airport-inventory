import React from 'react';
import { View, Text, StyleSheet } from 'react-native';


export const Product : React.FC = () => {



    return (
        <View style={styles.container}>
            <Text style={styles.codeBar}>4580938599944</Text>
            <Text style={styles.title}>Unite Central HP 8 GB Ram !</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        margin: 7,
        marginHorizontal: 10,
        backgroundColor: '#e6e6e3',
        padding: 12,
        paddingVertical: 16,
        borderRadius: 7
    },
    codeBar: {
        fontSize: 12
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold'
    }
})