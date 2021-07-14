import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { IProduct } from '../types/Product';

export const Product : React.FC<IProduct> = (props) => {



    return (
        <View style={styles.container}>
            <Text style={styles.codeBar}>{props.codebar}</Text>
            <Text style={styles.title}>{props.tag}</Text>
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