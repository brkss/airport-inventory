import React from "react";
import { View, StyleSheet, Text, Dimensions, ScrollView } from 'react-native';
import { Product } from '../components';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { IProduct } from '../types/Product';
import AsyncStorage from '@react-native-async-storage/async-storage';



const { width, height } = Dimensions.get('window');
export const ListProduct : React.FC = () => {


    const [hasPermission, setHasPermission] = React.useState<any>('');
    const [scanned, setScanned] = React.useState(false);
    const [barcode, SetBarcode] = React.useState<string>('');
    const [products, SetProducts] = React.useState<IProduct[]>([]);

    React.useEffect(() => {
        (async () => {
            SetProducts(await getData());
            console.log("products => ", products);
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
        
    }, []);

    

    // get data 
    const getData = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('@products')
            console.log("get data -> ", JSON.parse(jsonValue || "{}"));
            return jsonValue != null ? JSON.parse(jsonValue) : null;
        } catch(e) {
            // error reading value
            console.log("get data error : ", e);
        }
    }

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
        
           {/*  {scanned && <Button style={{marginHorizontal: 20}} title={'Tap to Scan Again'} onPress={() => setScanned(false)} />} */}
            <View style={styles.listContainer}>
                <ScrollView>
                    
                    {
                        products ? 
                            products.map((product, key) => (
                                <Product key={key} codebar={product.codebar} equipement={product.equipement} nmrcmp={product.nmrcmp} tag={product.tag} nmrserie={product.nmrserie} />
                            ))
                        : null
                        
                    }
                    

                </ScrollView>
                
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
    },
    listContainer: {
        paddingVertical: 30,
        marginBottom: 50
    }
});