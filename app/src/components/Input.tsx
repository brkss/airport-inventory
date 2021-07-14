import React from 'react';
import { View, StyleSheet, TextInput } from 'react-native';

interface Props {
    placeholder: string;
    secureTextEntry?: boolean;
    ky: string;
    onChange: (key: string, value: any) => void;
}

export const Input : React.FC<Props> = ({secureTextEntry, placeholder, ky, onChange}) => {
    const [value, SetValue] = React.useState('');

    return(
        <View style={styles.container}>
            <TextInput placeholder={placeholder} secureTextEntry={secureTextEntry} value={value} onChangeText={(value) => {
                SetValue(value);
                onChange(ky, value);
            }} />
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