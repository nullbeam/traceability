import React from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, ScrollView, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import DateTimePicker from '@react-native-community/datetimepicker';
import RNPickerSelect from 'react-native-picker-select';
import { ABI, CONTRACT_ADDRESS, EthCore } from '../services/eth-core';
import AsyncStorage from '@react-native-community/async-storage';
import Spinner from 'react-native-loading-spinner-overlay';
import { useIsFocused } from '@react-navigation/native';

const NewLotScreen = ({ navigation }: any) => {
    const isFocused = useIsFocused();
    const [spinnerVisible, setSpinnerVisible] = React.useState<boolean>(false);
    const [companyId, setCompanyId] = React.useState<number | undefined>(undefined);
    const [operationStartDate, setOperationStartDate] = React.useState<Date>(new Date((new Date()).setHours(0,0,0)));
    const [showOperationStartDate, setShowOperationStartDate] = React.useState<boolean>(false);
    const [operationEndDate, setOperationEndDate] = React.useState<Date>(new Date((new Date()).setHours(0,0,0)));
    const [showOperationEndDate, setShowOperationEndDate] = React.useState<boolean>(false);
    const [location, setLocation] = React.useState<string>("");
    const [additionalInformation, setAdditionalInformation] = React.useState<string>("");
    const [companies, setCompanies] = React.useState<Array<any>>([]);

    const onSave = async () => {
        setSpinnerVisible(true);
        if (companyId === undefined) {
            setSpinnerVisible(false);
            Alert.alert("Select a company, please");
            return;
        }
        try {
            const privateKey = await AsyncStorage.getItem('privatekey') || '';
            const ethereum = new EthCore({
                host: 'https://polygon-mumbai-bor.publicnode.com',
                privateKey,
                options: {
                    chainId: 80001,
                    gasPrice: 7500000000,
                    gasLimitMultiplier: 2
                }
            });
            const contractInstance = ethereum.getInstanceContract(ABI, CONTRACT_ADDRESS);
            const methodToExecute = contractInstance.methods.insertLotProcess(
                0, // uint8 _currentProcess,
                companyId, // string memory _companyId,
                operationStartDate.getTime(), // uint _operationStartDate,
                operationStartDate.getTime(), // uint _operationEndDate,
                location, // string memory _location,
                additionalInformation, // string memory _additionalInformation,
                0 // uint _lotId
            );
            const receipt = await ethereum.sendTransaction(CONTRACT_ADDRESS, methodToExecute, 0);
            const logData = receipt.logs[0].data;
            const topics = receipt.logs[0].topics;
            const typesArray = [
                {type: 'uint256', name: 'lotId', indexed: true},
                {type: 'uint8', name: 'processId', indexed: true},
                {type: 'address', name: 'sender'}
            ];
            const { lotId, processId, sender } = await ethereum.web3Instance.eth.abi.decodeLog(typesArray, logData, topics.slice(1));
            setSpinnerVisible(false);
            navigation.push('SuccessfulScreen', { transactionHash: receipt.transactionHash, lotId, processId, sender });
        } catch (error: any) {
            Alert.alert(error.message);
            setSpinnerVisible(false);
        }
    }

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
            setCompanies(_companies.filter((x: any) => x.processes.includes("1")));
        };
        loadCompanies();
    }, [isFocused]);

    return (
        <ScrollView style={styles.container}>
            <Spinner visible={spinnerVisible}/>
            <View style={styles.formContainer}>
                <Text style={styles.formTitle}>CREATE LOT</Text>
                <View style={{paddingVertical: 16}}/>
                <View style={styles.formGroupInput}>
                    <Text style={styles.formGroupInputLabel}>Current process:</Text>
                    <TextInput style={[styles.formGroupInputText, {backgroundColor: '#bdbdbd', fontSize: 12}]} placeholder="New process -> Seed Process" value={undefined} editable={false}/>
                </View>
                <View style={{paddingVertical: 8}}/>
                <View style={styles.formGroupInput}>
                    <Text style={styles.formGroupInputLabel}>Company name:</Text>
                    <View style={{flex: 1}}>
                        <RNPickerSelect
                            useNativeAndroidPickerStyle={false}
                            onValueChange={(value, i) => { 
                                setCompanyId(value);
                                const location = companies.find(x => x.value == value)?.location;
                                if (location) setLocation(location);
                            }}
                            value={companyId}
                            items={companies}
                            style={pickerStyles()}
                            Icon={() => {<Icon size={16} name={'angle-down'} color='#1f1f1f'/>}}
                        />
                    </View>
                </View>
                <View style={{paddingVertical: 8}}/>
                <View style={styles.formGroupInput}>
                    <Text style={styles.formGroupInputLabel}>Operation start date:</Text>
                    <View style={[styles.formGroupInputText, {flexDirection: 'row', paddingVertical: 8}]}>
                        <Text style={{flex: 1, color: '#1f1f1f'}}>{operationStartDate.toDateString()}</Text>
                        <Icon  onPress={() => setShowOperationStartDate(!showOperationStartDate)} size={16} name={showOperationStartDate ? 'calendar-check-o' : 'calendar'}/>
                        {
                            showOperationStartDate && 
                            <DateTimePicker
                                mode='date'
                                display="calendar"
                                value={operationStartDate}
                                onChange={(event, date) => {
                                    setShowOperationStartDate(!showOperationStartDate)
                                    if (event.type === 'set' && date)
                                    {
                                        const newDate = date.setHours(0, 0, 0);
                                        setOperationStartDate(new Date(newDate))
                                    }
                                }}
                            />
                        }
                    </View>
                </View>
                <View style={{paddingVertical: 8}}/>
                <View style={styles.formGroupInput}>
                    <Text style={styles.formGroupInputLabel}>Operation end date:</Text>
                    <View style={[styles.formGroupInputText, {flexDirection: 'row', paddingVertical: 8}]}>
                        <Text style={{flex: 1, color: '#1f1f1f'}}>{operationEndDate.toDateString()}</Text>
                        <Icon  onPress={() => setShowOperationEndDate(!showOperationEndDate)} size={16} name={showOperationEndDate ? 'calendar-check-o' : 'calendar'}/>
                        {
                            showOperationEndDate && 
                            <DateTimePicker
                                mode='date'
                                display="calendar"
                                value={operationEndDate}
                                onChange={(event, date) => {
                                    setShowOperationEndDate(!showOperationEndDate)
                                    if (event.type === 'set' && date)
                                    {
                                        const newDate = date.setHours(0, 0, 0);
                                        setOperationEndDate(new Date(newDate))
                                    }
                                }}
                            />
                        }
                    </View>
                </View>
                <View style={{paddingVertical: 8}}/>
                <View style={styles.formGroupInput}>
                    <Text style={styles.formGroupInputLabel}>Location:</Text>
                    <TextInput style={[styles.formGroupInputText, companyId !== undefined ? {} : { backgroundColor:  '#bdbdbd' }]} placeholder="" value={location} onChangeText={setLocation} editable={companyId !== undefined ? true : false}/>
                </View>
                <View style={{paddingVertical: 8}}/>
                <View style={[styles.formGroupInput, {flexDirection: 'column', alignItems: 'flex-start'}]}>
                    <Text style={styles.formGroupInputLabel}>Aditional information:</Text>
                    <TextInput style={[styles.formGroupInputText, {width: '100%'}]} placeholder="Write something" value={additionalInformation} onChangeText={setAdditionalInformation} numberOfLines={4} multiline/>
                </View>
            </View>
            <TouchableOpacity style={styles.button} onPress={onSave}>
                <Text style={styles.buttonText}>Create Lot</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonAlt} onPress={() => navigation.popToTop()}>
                <Text style={[styles.buttonText, {color: '#18c460'}]}>Cancel</Text>
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
            // bottom: 10,
            // top: 15,
            // paddingRight: 10
        }
    };
};

export default NewLotScreen;