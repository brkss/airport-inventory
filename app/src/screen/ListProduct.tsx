import React from "react";
import { View, StyleSheet, Text, Dimensions, ScrollView, RefreshControl } from 'react-native';
import { Product } from '../components';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { IProduct } from '../types/Product';
import AsyncStorage from '@react-native-async-storage/async-storage';

const wait = (timeout: any) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}
  

const { width, height } = Dimensions.get('window');

export const ListProduct : React.FC = () => {


    const [hasPermission, setHasPermission] = React.useState<any>('');
    const [scanned, setScanned] = React.useState(false);
    const [barcode, SetBarcode] = React.useState<string>('');
    const [products, SetProducts] = React.useState<IProduct[]>([]);
    const [refreshing, setRefreshing] = React.useState(false);

    
    const onRefresh = React.useCallback(async () => {
        setRefreshing(true);
        SetProducts(await getData());
        wait(2000).then(() => setRefreshing(false));
    }, []);

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

    const deleteProduct = async (codebar: string) => {
        try {
            const jsonValue = await AsyncStorage.getItem('@products')
            const products = JSON.parse(jsonValue || "{}");
            const product = products.find((p: IProduct) => p.codebar === codebar) as IProduct;
            if (product) {
                products.splice(products.indexOf(product), 1);
                await AsyncStorage.setItem('@products', JSON.stringify(products));
                alert(`Le produit ${product.tag} a été supprimé !`);
                SetProducts(await getData());
            }
        }
        catch(e) {
            console.log("delete product error : ", e);
        }
    }

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
                {
                    barcode  && products.find((p: IProduct) => p.codebar === barcode) ? 
                    <Product product={products.find((p: IProduct) => p.codebar === barcode)!} onDelete={(barcode) => deleteProduct(barcode)} /> : 

                    <ScrollView
                        style={{height: (height / 2) + 100,}}
                        refreshControl={
                            <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                            />
                        }
                        
                    >
                        
                        {
                            products ? 
                                products.map((product, key) => (
                                    <Product key={key} onDelete={(codeBar: string) => {deleteProduct(codeBar)} } product={product} />
                                ))
                            : null
                            
                        }
                        

                    </ScrollView>
                }
                
                
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
    },
});