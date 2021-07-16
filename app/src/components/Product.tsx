import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { IProduct } from '../types/Product';

interface Props {
    product: IProduct;
    onDelete : (codeBar: string) => void;
}

export const Product : React.FC<Props> = (props) => {

    
    return (
        <TouchableOpacity onLongPress={() => props.onDelete(props.product.codebar)} style={styles.container}>
            <Text style={styles.title}>{props.product.tag}</Text>
            <Text style={styles.codeBar}>Code Bar : {props.product.codebar}</Text>
            <Text style={styles.codeBar}>Equipement : {props.product.equipement}</Text>
            <Text style={styles.codeBar}>Numero Serie : {props.product.nmrserie}</Text>
        </TouchableOpacity>
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