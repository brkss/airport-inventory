import React from 'react';
import { View, StyleSheet, TextInput } from 'react-native';

interface Props {
    placeholder: string;
    secureTextEntry?: boolean;
}

export const Input : React.FC<Props> = ({secureTextEntry, placeholder}) => {


    return(
        <View style={styles.container}>
            <TextInput placeholder={placeholder} secureTextEntry={secureTextEntry} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#e6e6e3',
        padding: 10,
        borderRadius: 5,
        marginVertical: 7
    }
})