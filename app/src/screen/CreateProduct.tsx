import React from "react";
import { View, StyleSheet, Text, Dimensions, ScrollView, Platform, KeyboardAvoidingView } from 'react-native';
import { Input, Button } from '../components';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { IProduct } from '../types/Product';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width, height } = Dimensions.get('window');
const wait = (timeout: any) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}
  
export const CreateProduct : React.FC = () => {


    const [hasPermission, setHasPermission] = React.useState<any>('');
    const [scanned, setScanned] = React.useState(false);
    const [barcode, SetBarcode] = React.useState<string>('');
    const [form, SetForm] = React.useState<any>();

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
        wait(2500).then(() => setScanned(false));   
    };


    
    // handle product form 
    const handleForm = (key: string, value: string) => {
        console.log(`${key} : ${value}`);
        SetForm({
            ...form,
            [key]: value
        });
    }
    // handle saving product 
    const handleSavingProduct = () => {
        console.log("form -> ", form);
        if(!form || !form.nmrcmp || !form.equipement || !form.nmrserie || !form.tag || !barcode){
            alert("Champs manquants !");
        }else{
            const _data : IProduct = {
                codebar: barcode ,
                equipement: form.equipement,
                nmrcmp: form.nmrcmp,
                nmrserie: form.nmrserie,
                tag: form.tag
            }
            storeData(_data);
        }
    }
    const storeData = async (value: any) => {
        const products = await getData() || [];
        products.push(value);
        try {
            const jsonValue = JSON.stringify(products);
            await AsyncStorage.setItem('@products', jsonValue);
            alert("Produit enregistrer avec succès !");
        } catch (e) {
            // saving error
            console.log("adding product error => ", e);
        }
    }

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
            <View style={styles.formContainer}>
                <View style={styles.barcodeTextContainer}>
                    <Text style={styles.label}> Bar Code  </Text>
                    <Text style={styles.codebar}> {barcode} </Text>
                </View>
                {
                    Platform.OS === 'android' ? (
                        <KeyboardAvoidingView behavior="padding">
                            <ScrollView
                                showsVerticalScrollIndicator={false}
                                style={{
                                    flex: 0,
                                }}
                                contentContainerStyle={{
                                    flexGrow: 1,
                                }}>

                                <Input ky='nmrcmp' onChange={(key, value) => handleForm(key, value) } placeholder='Numero de Comptoire' />
                                <Input ky='equipement' onChange={(key, value) => handleForm(key, value) } placeholder='Equipement' />
                                <Input ky='nmrserie' onChange={(key, value) => handleForm(key, value) } placeholder='Numero de serie' />
                                <Input ky='tag' onChange={(key, value) => handleForm(key, value) } placeholder='Asset Tag' />
                                <Button title='enregistrer' onPress={() => handleSavingProduct()} />

                            </ScrollView>
                        </KeyboardAvoidingView>
                    ) : 
                        <ScrollView
                            showsVerticalScrollIndicator={false}
                            style={{
                                flex: 0,
                            }}
                            contentContainerStyle={{
                                flexGrow: 1,
                            }}>

                            <Input ky='nmrcmp' onChange={(key, value) => handleForm(key, value) } placeholder='Numero de Comptoire' />
                            <Input ky='equipement' onChange={(key, value) => handleForm(key, value) } placeholder='Equipement' />
                            <Input ky='nmrserie' onChange={(key, value) => handleForm(key, value) } placeholder='Numero de serie' />
                            <Input ky='tag' onChange={(key, value) => handleForm(key, value) } placeholder='Asset Tag' />
                            <Button title='enregistrer' onPress={() => handleSavingProduct()} />

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
        //height: (height / 2) - 100,
        justifyContent: 'center',
        alignItems: 'center',
        //flex :.6
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