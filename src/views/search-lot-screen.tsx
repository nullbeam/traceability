import React from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, ScrollView, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import DateTimePicker from '@react-native-community/datetimepicker';
import RNPickerSelect from 'react-native-picker-select';
import { ABI, CONTRACT_ADDRESS, EthCore } from '../services/eth-core';
import AsyncStorage from '@react-native-community/async-storage';
import Spinner from 'react-native-loading-spinner-overlay';
import { Utils } from '../utils';
import Jazzicon from 'react-native-jazzicon';
import moment from "moment";
import { useIsFocused } from '@react-navigation/native';

const SearchLotScreen = ({ navigation }: any) => {
    const isFocused = useIsFocused();
    const [spinnerVisible, setSpinnerVisible] = React.useState<boolean>(false);
    const [lotCode, setLotCode] = React.useState<string | undefined>(undefined);
    const [companyId, setCompanyId] = React.useState<number | undefined>(undefined);
    const [lotProcesses, setLotProcesses] = React.useState<any>([]);
    const [companies, setCompanies] = React.useState<Array<any>>([]);
    
    const searchLot = async () => {
        setSpinnerVisible(true);
        const privateKey = await AsyncStorage.getItem('privatekey') || '';
        const address = Utils.privateToAddress(privateKey);
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
        const lotProcesses = [];
        if (lotCode !== undefined && lotCode !== '') {
            const [id, currentProcess, createdBy, isValid] = await contractInstance.methods.getLotById(parseInt(lotCode)).call({from: address});
            if (!isValid) {
                setLotProcesses([]);
                setSpinnerVisible(false);
                return;
            }
            else {
                for(let i = 1; i <= currentProcess; i++) {
                    const lotProcess = await contractInstance.methods.getLotProccessById(`${id}-${i}`).call({from: address});
                    if (lotProcess[8]) lotProcesses.push({
                        processId: lotProcess[0],
                        companyId: lotProcess[1],
                        operationStartDate: lotProcess[2],
                        operationEndDate: lotProcess[3],
                        location: lotProcess[4],
                        additionalInformation: lotProcess[5],
                        addedBy: lotProcess[6],
                        lotId: lotProcess[7],
                        isValid: lotProcess[8]
                    })
                }
            }
            if (lotProcesses.length > 0) { 
                setLotProcesses(lotProcesses); 
                setSpinnerVisible(false);
                return;
             }
        }
        if (companyId !== undefined) {
            try {
                const abc = await contractInstance.methods.getLotProccessByCompany(companyId.toString()).call({from: address});
            } catch(error: any) {
                setLotProcesses([]);
                setSpinnerVisible(false);
                Alert.alert(error.message);
                return;
            }
        }
        setLotProcesses([]);
        setSpinnerVisible(false);
        Alert.alert("Writes a lot code or select a company, please");
        return;
    }

    const navigateToLot = (item: any, index: number) => {
        if (index === lotProcesses.length - 1 && index < 6) {
            navigation.push('AddToLotScreen', { lot: item })
        }
    };

    React.useEffect(() => {
        const loadCompanies = async () => {
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
            const data = await contractInstance.methods.getCompanies().call();
            const _companies = data.map((item: any) => { 
                return {
                    value: item[0],
                    documentId: item[0],
                    label: item[1],
                    name: item[1],
                    location: item[2],
                    processes: item[3]
                }
            })
            setCompanies(_companies);
        };
        loadCompanies();
    }, [isFocused]);

    return (
        <ScrollView style={styles.container}>
            <Spinner visible={spinnerVisible}/>
            <View style={styles.formContainer}>
                <Text style={styles.formTitle}>SEARCH LOT</Text>
                <View style={{paddingVertical: 16}}/>
                <View style={styles.formGroupInput}>
                    <Text style={styles.formGroupInputLabel}>Lot code:</Text>
                    <TextInput style={[styles.formGroupInputText]} placeholder="" onChangeText={setLotCode} keyboardType='number-pad'/>
                </View>
                <View style={{paddingVertical: 8}}/>
                <View style={styles.formGroupInput}>
                    <Text style={styles.formGroupInputLabel}>Company name:</Text>
                    <View style={{flex: 1}}>
                        <RNPickerSelect
                            useNativeAndroidPickerStyle={false}
                            onValueChange={(value, i) => { setCompanyId(value) }}
                            value={companyId}
                            items={companies}
                            style={pickerStyles()}
                            Icon={() => {<Icon size={16} name={'angle-down'}/>}}
                        />
                    </View>
                </View>
            </View>
            <View style={{paddingVertical: 16}}/>
            <TouchableOpacity style={styles.button} onPress={searchLot}>
                <Text style={styles.buttonText}>Search Lot</Text>
            </TouchableOpacity>
            <View style={{marginVertical: 20, marginHorizontal: 16, borderWidth: 1, borderColor: '#18c460'}}/>
            <View>
                {
                    lotProcesses.length > 0 ?
                    lotProcesses.map((item: any, i: number) => 
                        <ScrollView>
                            <TouchableOpacity key={i} style={[itemStyles.button, i !== lotProcesses.length - 1 ? { backgroundColor: '#e6e6e6' } : {} ]} onPress={() =>  navigateToLot(item, i) }>
                                <View>
                                    <Jazzicon size={50} seed={Math.round(Math.random() * 10000000)} />
                                </View>
                                <View style={{flex: 1}}>
                                    <Text style={itemStyles.buttonText}>Lot ID - Process ID: {`${item.lotId}-${item.processId}`}</Text>
                                    <Text style={itemStyles.buttonText}>Fecha: {moment(+item.operationStartDate).format('DD/MM/YYYY')}</Text>
                                    <Text numberOfLines={1} ellipsizeMode='tail' style={itemStyles.buttonText}>Company: {item.companyId} - {companies.find(x => x.value === item.companyId)?.label}</Text>
                                </View>
                                {
                                    i !== lotProcesses.length - 1 &&
                                    <View>
                                        <Icon size={24} name={'check-circle'} color={'#18c460'}/>
                                    </View>
                                }
                                
                            </TouchableOpacity>
                        </ScrollView>
                    )
                    : 
                    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', gap: 12}}>
                        <Icon size={48} name={'hdd-o'}/>
                        <Text style={{color: '#1f1f1f'}}>Process not found</Text>
                    </View>
                }
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
    },
    formGroupInput: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 24
    },
    formGroupInputLabel: {
        color: '#1f1f1f',
        fontWeight: '600'
    },
    formGroupInputText: {
        color: '#1f1f1f',
        fontWeight: '400', 
        fontSize: 14,
        borderColor: "#bdbdbd", 
        borderWidth: 1, 
        flex: 1,
        paddingVertical: 4,
        paddingHorizontal: 12
    },
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

const itemStyles = StyleSheet.create({
    button: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 10,
        backgroundColor: '#fff',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
        marginHorizontal: 16,
        marginVertical: 4,
        paddingHorizontal: 16,
        paddingVertical: 16,
        gap: 12
    },
    buttonText: {
        color: '#000',
        fontSize: 12,
        fontWeight: '400',
        lineHeight: 20
    }
})

const pickerStyles = () => {
    return {
        inputAndroid: {
            color: '#1f1f1f',
            borderColor: "#bdbdbd", 
            borderWidth: 1, 
            paddingVertical: 4,
            paddingHorizontal: 12
            // width: '100%'
        },
        iconContainer: {
            bottom: 10,
            top: 15,
            paddingRight: 10
        }
    };
};

export default SearchLotScreen;