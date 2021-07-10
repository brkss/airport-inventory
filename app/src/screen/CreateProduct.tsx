import React from "react";
import { View, StyleSheet, Text, Dimensions, Button } from 'react-native';
import { Input } from '../components';
import { BarCodeScanner } from 'expo-barcode-scanner';


const { width, height } = Dimensions.get('window');
export const CreateProduct : React.FC = () => {


    const [hasPermission, setHasPermission] = React.useState<any>('');
    const [scanned, setScanned] = React.useState(false);

    React.useEffect(() => {
        (async () => {
        const { status } = await BarCodeScanner.requestPermissionsAsync();
        setHasPermission(status === 'granted');
        })();
    }, []);

    const handleBarCodeScanned = ({ type, data } : {type: any, data: any}) => {
        setScanned(true);
        alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    };

    if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
    }
    if (hasPermission === false) {
    return <Text>No access to camera</Text>;
    }

    return(
        <View style={styles.container}>
            <View>
                {
                    // @ts-ignore
                    <BarCodeScanner
                        onBarCodeScanned={scanned ? () => {} : ({type, data}: {type: any, data: any}) => handleBarCodeScanned({type, data})}
                        
                        style = {{
                            ...StyleSheet.absoluteFillObject,
                            height:  height / 2,
                            width: width,
                            flex: 1
                        }}
                
                    />
                }
            </View>
            
            {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}
            <View style={styles.formContainer}>
                <Input placeholder='Titre' />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: height,
        //justifyContent: 'center',
        //alignItems: 'center'
    },
    formContainer: {
        marginTop: height / 2,
        padding: 15 
    }
});