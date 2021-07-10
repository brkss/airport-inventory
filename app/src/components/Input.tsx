import React from 'react';
import { View, StyleSheet, TextInput } from 'react-native';

interface Props {
    placeholder: string;
    secureTextEntry?: boolean;
}

export const Input : React.FC<Props> = ({secureTextEntry, placeholder}) => {


    return(
        <View>
            <TextInput placeholder={placeholder} secureTextEntry={secureTextEntry} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'red'
    }
})