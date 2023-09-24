import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, ScrollView, Alert, Linking } from 'react-native';
import Clipboard from '@react-native-community/clipboard';
import QRCode from 'react-native-qrcode-svg';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Toast from 'react-native-root-toast';
import FileSystem from 'react-native-fs';
import Share from 'react-native-share';

const SuccessfulScreen = ({ route, navigation }: any) => {
    const { transactionHash, lotId, processId, sender } = route.params;
    let qrSVG: any;

    const share = () => {
        const callback = async (dataUrl: string) => {
            const path = FileSystem.CachesDirectoryPath + `/lotqr.png`;
            const options = {
                title: 'lotqr',
                url: `file://${path}`,
                type: 'image/png'
            }

            if (await FileSystem.exists(path)) {
                await FileSystem.unlink(path);
            }

            try {
                await FileSystem.writeFile(path, dataUrl, 'base64');
                await Share.open(options);
            } catch (error: any) {
                // Alert.alert(error.message);
            }
        }
        qrSVG.toDataURL(callback);
    }

    const writeToClipboard = async () => {
        await Clipboard.setString(transactionHash);
        Toast.show("Copied to clipboard", {
            duration: Toast.durations.SHORT,
            position: Toast.positions.BOTTOM,
        });
    }

    React.useEffect(() =>
        navigation.addListener('beforeRemove', (e: any) => {
            if (e.data.action.type !== "POP_TO_TOP")
                e.preventDefault();  
        }
    ), [navigation]);

    return (
        <ScrollView style={styles.container}>
            <View style={styles.formContainer}>
                <Text style={styles.formTitle}>SUCCESSFUL CREATION</Text>
            </View>
            <View style={styles.dataContainer}>
                <View style={styles.dataContainerData}>
                    <Text style={{color: '#1f1f1f'}}>Transaction code:</Text>
                    <Text style={{color: '#1f1f1f', flex: 1}} numberOfLines={1} ellipsizeMode='middle'>{transactionHash}</Text>
                    <TouchableOpacity style={{alignSelf: 'flex-end'}} onPress={writeToClipboard}>
                        <Icon size={20} name="content-copy" color={'#1f1f1f'}/>
                    </TouchableOpacity>
                </View>
                <View style={styles.dataContainerData}>
                    <Text style={{color: '#1f1f1f'}}>Lot code:</Text>
                    <Text style={{color: '#1f1f1f', flex: 1}} numberOfLines={1} ellipsizeMode='middle'>{lotId}</Text>
                    <TouchableOpacity style={{alignSelf: 'flex-end'}} onPress={writeToClipboard}>
                        <Icon size={20} name="content-copy" color={'#1f1f1f'}/>
                    </TouchableOpacity>
                </View>
                <View style={styles.dataContainerData}>
                    <Text style={{color: '#1f1f1f'}}>Proccess code:</Text>
                    <Text style={{color: '#1f1f1f', flex: 1}} numberOfLines={1} ellipsizeMode='middle'>{processId}</Text>
                    <TouchableOpacity style={{alignSelf: 'flex-end'}} onPress={writeToClipboard}>
                        <Icon size={20} name="content-copy" color={'#1f1f1f'}/>
                    </TouchableOpacity>
                </View>
                <View style={styles.dataContainerImage}>
                    <QRCode
                        value={`traceability://addtolot?transactionHash=${transactionHash}&lotId=${lotId}&processId=${processId}&sender${sender}`}
                        size={200}
                        getRef={(c) => (qrSVG = c)}
                    />
                </View>
                <View style={styles.dataContainerData}>
                    <Text style={{color: '#1f1f1f'}}>
                        You can see this transaction in the following eth explorer:
                    </Text>
                </View>
                <View style={styles.dataContainerData}>
                    <Text style={{color: '#5894f5'}} onPress={() => Linking.openURL(`https://mumbai.polygonscan.com/tx/${transactionHash}`)}>
                        {`https://mumbai.polygonscan.com/tx/${transactionHash}`}
                    </Text>
                </View>
            </View>
            <TouchableOpacity style={styles.button} onPress={share}>
                <Text style={styles.buttonText}>Share</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonAlt} onPress={() => navigation.popToTop()}>
                <Text style={[styles.buttonText, {color: '#18c460'}]}>See traceability</Text>
            </TouchableOpacity>
            <View style={{paddingVertical: 80}}/>
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
    },
    dataContainer: {borderColor: '#bdbdbd', borderWidth: 1, padding: 16, margin: 16},
    dataContainerData: {flexDirection: 'row', gap: 20, marginVertical: 4}, 
    dataContainerImage: {alignItems: 'center', marginVertical: 24},
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        backgroundColor: '#18c460',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
        marginVertical: 8,
        marginHorizontal: 50,
        paddingHorizontal: 16,
        paddingVertical: 16,
    },
    buttonAlt: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        borderColor: '#18c460',
        borderWidth: 1,
        marginVertical: 8,
        marginHorizontal: 50,
        paddingHorizontal: 16,
        paddingVertical: 16,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
        lineHeight: 20
    }
});

export default SuccessfulScreen;