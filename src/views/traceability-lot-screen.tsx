import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, ScrollView, Alert, Linking } from 'react-native';
import Clipboard from '@react-native-community/clipboard';
import QRCode from 'react-native-qrcode-svg';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Toast from 'react-native-root-toast';
import FileSystem from 'react-native-fs';
import Share from 'react-native-share';
import Spinner from 'react-native-loading-spinner-overlay';

const TraceabilityLotScreen = ({ route, navigation }: any) => {
    const [spinnerVisible, setSpinnerVisible] = React.useState<boolean>(false);

    return (
        <ScrollView style={styles.container}>
            <Spinner visible={spinnerVisible}/>
                <Text style={styles.formTitle}>LIFE OF YOUR AVOCADO</Text>
            <View style={styles.formContainer}>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#f2f4f5',
        paddingVertical: 6,
        paddingHorizontal: 6,
        position: 'relative'
    },
    formContainer: {
        paddingHorizontal: 12,
        paddingVertical: 12
    },
    formTitle: {
        fontSize: 20,
        marginVertical: 10,
        fontWeight: 'bold',
        color: '#1f1f1f',
        alignSelf: 'center'
    }
});

export default TraceabilityLotScreen;