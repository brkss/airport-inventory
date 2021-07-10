import React from 'react';
import { TouchableOpacity, Text, StyleSheet, StyleProp, ViewStyle } from 'react-native';

interface Props {
    title: string;
    onPress: () => void,
    style?: StyleProp<ViewStyle>
}

export const Button : React.FC<Props> = ({title, onPress, style}) => {

    return(
        <TouchableOpacity onPress={onPress} style={[styles.button, style]}>
            <Text style={styles.label}> {title} </Text>
        </TouchableOpacity>
    )
} 

const styles = StyleSheet.create({
    button: {
        backgroundColor: 'black',
        padding: 12,
        marginTop: 20,
        borderRadius: 7,
    },
    label: {
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold'
    }
});