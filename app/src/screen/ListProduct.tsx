import React from "react";
import { View, StyleSheet, Text, Dimensions, ScrollView, RefreshControl, TextInput, Platform } from 'react-native';
import { Product } from '../components';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { IProduct } from '../types/Product';
import { Button } from '../components';
import * as MediaLibrary from 'expo-media-library';
import * as FileSystem from 'expo-file-system';
import * as Permissions from 'expo-permissions';
import * as Sharing from 'expo-sharing';

const wait = (timeout: any) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}

const data : IProduct[] = [
    {
        codebar: '88394893843',
        equipement: '999',
        nmrcmp: '3948923849',
        nmrserie: '234234234',
        tag: 'PC POSRTABLE',
    },
    {
        codebar: '0710909000093',
        equipement: '999',
        nmrcmp: '3948923849',
        nmrserie: '234234234',
        tag: 'KILINX!!',
    },
    {
        codebar: '8697656232897',
        equipement: '999',
        nmrcmp: '3948923849',
        nmrserie: '234234234',
        tag: 'RI7A !!',
    },
]

const { width, height } = Dimensions.get('window');

export const ListProduct : React.FC = () => {


    const [hasPermission, setHasPermission] = React.useState<any>('');
    const [hasMediaPermission, SetHasMediaPermission] = React.useState<any>('');
    const [scanned, setScanned] = React.useState(false);
    const [barcode, SetBarcode] = React.useState<string>('');
    const [selectedProducts, SetSelectedProducts] = React.useState<IProduct[]>([]);
    const [refreshing, setRefreshing] = React.useState(false);

    React.useEffect(() => {
        (async () => {
            const mediaPermission = await Permissions.askAsync(Permissions.CAMERA_ROLL);
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
            SetHasMediaPermission(mediaPermission.status === 'granted');
        })();
        
    }, []);

    const downloadFile = () => {
        //const uri = "http://techslides.com/demos/sample-videos/small.mp4"
        const uri = "http://www.africau.edu/images/default/sample.pdf"
        let fileUri = FileSystem.documentDirectory + "sample.pdf";
        FileSystem.downloadAsync(uri, fileUri)
        .then(async ({ uri }) => {
            if(Platform.OS === 'ios'){
                if(fileUri.endsWith('pdf')){
                    const shareResult = await Sharing.shareAsync(fileUri, {UTI: "public.document"});
                    return;
                }
            }
            saveFile(uri);
          })
          .catch(error => {
            console.error(error);
          })
    }
    
    const saveFile = async (fileUri: string) => {
        const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        if (status === "granted") {
            const asset = await MediaLibrary.createAssetAsync(fileUri)
            await MediaLibrary.createAlbumAsync("Download", asset, false)
        }
    }

    const onRefresh = React.useCallback(async () => {
        setRefreshing(true);
        wait(2000).then(() => setRefreshing(false));
    }, []);

    
    

    

    const handleBarCodeScanned = ({ type, data } : {type: any, data: any}) => {
        setScanned(true);
        SetBarcode(data);
        alert(`Bar code  ${data} a été scanné !`);
        wait(1000).then(() => setScanned(false));
    };

    const selectProduct = async (codebar: string) => {
        const _product = data.find(product => product.codebar === codebar);
        if(_product && !selectedProducts.find(product => product.codebar === codebar)){
            alert("produit selectioner !");
            SetSelectedProducts(prev => [...prev, _product]);
        } 
    }
    const unselectProduct = (codebar: string) => {
        const _product = selectedProducts.find(product => product.codebar === codebar);
        if(_product){
            SetSelectedProducts(prev => prev.filter(product => product.codebar !== codebar));
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
                <Text onPress={() => downloadFile()} style={{textAlign: 'center', fontWeight: 'bold', marginBottom: 10}}>{scanned ? barcode : 'Ready To Scand'}</Text>
                {
                    barcode  && data.find((p: IProduct) => p.codebar === barcode) ? 
                    <Product product={data.find((p: IProduct) => p.codebar === barcode)!} onDelete={(barcode) => selectProduct(barcode)} /> 
                    : null 
                }
                
                {
                    selectedProducts.length > 0 ? 
                    <View>
                        <TextInput style={{fontSize: 20, marginHorizontal: 10, marginVertical: 10, marginBottom: 0}} placeholder="Numero du comptoire" /> 
                        <Button onPress={() => {}}  title="Enregistrer" style={{marginHorizontal: 10}} />
                        <ScrollView
                                style={{height: (height / 2) + 100, paddingBottom: 500, marginBottom: 0}}
                                refreshControl={
                                    <RefreshControl
                                    refreshing={refreshing}
                                    onRefresh={onRefresh}
                                    />
                                }
                                
                            >
                                
                                {
                                    
                                        selectedProducts.map((product, key) => (
                                            <Product key={key} onDelete={(codeBar: string) => {unselectProduct(codeBar)} } product={product} />
                                        ))
                                    
                                    
                                }
                               
                                

                        </ScrollView>
                    </View>
                    : null
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