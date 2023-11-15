import React from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { RNCamera } from 'react-native-camera';
import QRCodeScanner from 'react-native-qrcode-scanner';

const ScanLotScreen = ({ navigation }: any) => {

    const readUrlParams = (data: string) => {
        let params: any = {};
        if (data.includes('?')) {
            let urlParams = data.split('?')[1].split('&');
            for (let i = 0; i < urlParams.length; i++) {
                let pair = urlParams[i].split('=');
                params[pair[0]] = pair[0] === 'state' ? pair[1] : decodeURIComponent(pair[1]);
            }
        }
        return params;
    };

    const onSuccess = (e: any) => {
        const url = readUrlParams(e.data);
        console.log(url)
        navigation.push('AddToLotScreen', { lot: { processId: url.processId, lotId: url.lotId } })
    };

    return (
        // <View style={styles.container}>
        //     <Text>Scann Screen</Text>
        // </View>
        <QRCodeScanner
            onRead={onSuccess}
            // flashMode={RNCamera.Constants.FlashMode.torch}
            topContent={
                <Text style={styles.centerText}>
                    Check to{' '}
                    <Text style={styles.textBold}>traceability result</Text> and
                    scan the QR code.
                </Text>
            }
            // bottomContent={
            //     <TouchableOpacity style={styles.buttonTouchable}>
            //         <Text style={styles.buttonText}>OK. Got it!</Text>
            //     </TouchableOpacity>
            // }
        />
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f2f4f5'
    },
    centerText: {
        flex: 1,
        fontSize: 18,
        padding: 32,
        color: '#777'
    },
    textBold: {
        fontWeight: '500',
        color: '#000'
    },
});
  

export default ScanLotScreen;