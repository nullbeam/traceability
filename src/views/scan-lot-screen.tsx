import React from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { RNCamera } from 'react-native-camera';
import QRCodeScanner from 'react-native-qrcode-scanner';

const ScanLotScreen = ({ navigation }: any) => {
    const onSuccess = (e: any) => {
        Alert.alert(e.data);
        console.log(e);
    };

    return (
        // <View style={styles.container}>
        //     <Text>Scann Screen</Text>
        // </View>
        <QRCodeScanner
            onRead={onSuccess}
            // flashMode={RNCamera.Constants.FlashMode.torch}
            // topContent={
            //     <Text style={styles.centerText}>
            //         Go to{' '}
            //         <Text style={styles.textBold}>wikipedia.org/wiki/QR_code</Text> on
            //         your computer and scan the QR code.
            //     </Text>
            // }
            // bottomContent={
            // <TouchableOpacity style={styles.buttonTouchable}>
            //     <Text style={styles.buttonText}>OK. Got it!</Text>
            // </TouchableOpacity>
            // }
        />
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f2f4f5'
    }
});
  

export default ScanLotScreen;