import React from "react";
import { View, StyleSheet, Text, Dimensions } from 'react-native';
import { Input, Button } from '../components';
import { BarCodeScanner } from 'expo-barcode-scanner';


const { width, height } = Dimensions.get('window');
export const CreateProduct : React.FC = () => {


    const [hasPermission, setHasPermission] = React.useState<any>('');
    const [scanned, setScanned] = React.useState(false);
    const [barcode, SetBarcode] = React.useState<string>('');

    React.useEffect(() => {
        (async () => {
        const { status } = await BarCodeScanner.requestPermissionsAsync();
        setHasPermission(status === 'granted');
        })();
    }, []);

    const handleBarCodeScanned = ({ type, data } : {type: any, data: any}) => {
        setScanned(true);
        SetBarcode(data);
        alert(`Bar code  ${data} a été scanné !`);
    };

    if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
    }
    if (hasPermission === false) {
    return <Text>No access to camera</Text>;
    }

    return(
        <View style={styles.container}>
            <View style={styles.cameraContainer}>
                {
                    // @ts-ignore
                    <BarCodeScanner
                        onBarCodeScanned={scanned ? () => {} : ({type, data}: {type: any, data: any}) => handleBarCodeScanned({type, data})}
                        
                        style = {{
                            ...StyleSheet.absoluteFillObject,
                            height:  (height / 2) - 100,
                            width: width,
                            
                        }}
                
                    />
                }
                
            </View>
        
            {scanned && <Button style={{marginHorizontal: 20}} title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}
            <View style={styles.formContainer}>
                <View style={styles.barcodeTextContainer}>
                    <Text style={styles.label}> Bar Code  </Text>
                    <Text style={styles.codebar}> {barcode} </Text>
                </View>
                
                <Input placeholder='Numero de Comptoire' />
                <Input placeholder='Equipement' />
                <Input placeholder='Numero de serie' />
                <Input placeholder='Asset Tag' />
                <Button title='enregistrer' onPress={() => {}} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: height,
    },
    cameraContainer: {
        height: (height / 2) - 100,
        justifyContent: 'center',
        alignItems: 'center',
        flex :.6
    },
    formContainer: {
        marginTop: (height / 2) - 100,
        padding: 15 ,
        
    },
    barcodeTextContainer: {
        marginVertical: 10
    },
    label: {
        fontSize: 14
    },
    codebar: {
        fontSize: 21,
        fontWeight: 'bold'
    }
});