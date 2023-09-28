import { useIsFocused } from '@react-navigation/native';
import React from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { StyleSheet, Text, TouchableOpacity, View, ScrollView, Alert, Linking, Image } from 'react-native';
// import Clipboard from '@react-native-community/clipboard';
// import QRCode from 'react-native-qrcode-svg';
// import Icon from 'react-native-vector-icons/MaterialIcons';
// import Toast from 'react-native-root-toast';
// import FileSystem from 'react-native-fs';
// import Share from 'react-native-share';
import Spinner from 'react-native-loading-spinner-overlay';
import { ABI, CONTRACT_ADDRESS, EthCore } from '../services/eth-core';
import moment from 'moment';

const LogoImageSrc = require('../assets/images/PaltBlock_Logo.png');

const PROCESSES = [
    "Seed Process",
    "Graft Process",
    "Avocado Process",
    "Packaging Process",
    "Distribution Process",
    "Avocado Sales Process"
];

const TraceabilityLotScreen = ({ route, navigation }: any) => {
    const { lot } = route.params;
    const isFocused = useIsFocused();
    const [spinnerVisible, setSpinnerVisible] = React.useState<boolean>(false);
    const [lotProcesses, setLotProcesses] = React.useState<Array<any>>([]);
    const [companies, setCompanies] = React.useState<Array<any>>([]);

    React.useEffect(() => {
        const load = async () => {
            setSpinnerVisible(true);
            console.log(lot);
            const privateKey = await AsyncStorage.getItem('privatekey') || '';
            const ethereum = new EthCore({
                host: 'https://polygon-mumbai-bor.publicnode.com',
                privateKey,
                options: {
                    chainId: 80001,
                    gasPrice: 9500000000,
                    gasLimitMultiplier: 2
                }
            });
            const contractInstance = ethereum.getInstanceContract(ABI, CONTRACT_ADDRESS);
            const [lotId, currentProcess, , isValid] = await contractInstance.methods.getLotById(lot.lotId).call();
            if (isValid) {
                const _lotProcesses: any = [];
                for(let i = 1; i <= currentProcess; i++) {
                    const lotProcess = await contractInstance.methods.getLotProccessById(`${lotId}-${i}`).call();
                    if (lotProcess[8])
                        _lotProcesses.push({
                            processId: lotProcess[0],
                            companyId: lotProcess[1],
                            operationStartDate: lotProcess[2],
                            operationEndDate: lotProcess[3],
                            location: lotProcess[4],
                            additionalInformation: lotProcess[5],
                            addedBy: lotProcess[6],
                            lotId: lotProcess[7],
                            isValid: lotProcess[8]
                        });
                }
                setLotProcesses(_lotProcesses);
            }
            const dataCompanies = await contractInstance.methods.getCompanies().call();
            const _companies = dataCompanies.map((item: any) => { 
                return {
                    documentId: item[0],
                    name: item[1],
                    location: item[2],
                    processes: item[3]
                }
            })
            setCompanies(_companies);
            setSpinnerVisible(false);
        };
        load();
    }, []);
// }, [isFocused]);

    return (
        <ScrollView style={Styles().container}>
            <Spinner visible={spinnerVisible}/>
            <View style={Styles().headerContainer}>
                <Image source={LogoImageSrc} style={Styles().headerLogo}/>
            </View>
            <Text style={Styles().formTitle}>LIFE OF YOUR AVOCADO</Text>
            <View style={Styles().formContainer}>
                {
                    lotProcesses.map((item, i) => (
                        <View style={{marginHorizontal: 8, marginVertical: 8}}>
                            <Text style={{fontSize: 16, fontWeight: '600', color: '#1f1f1f'}}>{PROCESSES[+item.processId - 1]}</Text>
                            <Text style={{fontSize: 14, color: '#1f1f1f'}}>Location: {item.location}</Text>
                            <Text style={{fontSize: 14, color: '#1f1f1f'}}>From {moment(+item.operationStartDate).format('DD/MM/YYYY')} to {moment(+item.operationEndDate).format('DD/MM/YYYY')}</Text>
                            <Text style={{fontSize: 14, color: '#1f1f1f'}}>Company: {companies.find((x) => x.documentId === item.companyId)?.name}</Text>
                        </View>
                    ))
                }
            </View>
            <TouchableOpacity style={Styles().buttonAlt} onPress={() => navigation.popToTop()}>
                <Text style={[Styles().buttonText, {color: '#18c460'}]}>Exit</Text>
            </TouchableOpacity>
            <View style={{paddingVertical: 80}}/>
        </ScrollView>
    );
};

const Styles = () => {
    return StyleSheet.create({
        container: {
            flex: 1,
            flexDirection: 'column',
            backgroundColor: '#f2f4f5',
            paddingVertical: 6,
            paddingHorizontal: 6,
            position: 'relative'
        },
        headerContainer: {
            display: 'flex',
            alignItems: 'center',
            paddingVertical: 20,
            flex: 1
        },
        headerLogo: {
            width: 92,
            height: 92,
        },
        formTitle: {
            fontSize: 20,
            marginVertical: 4,
            fontWeight: 'bold',
            color: '#1f1f1f',
            alignSelf: 'center'
        },
        formContainer: {
            paddingHorizontal: 12,
            paddingVertical: 12
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
        },
    });
}

export default TraceabilityLotScreen;