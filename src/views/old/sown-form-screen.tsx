import React from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import DateTimePicker from '@react-native-community/datetimepicker';
import RNPickerSelect from 'react-native-picker-select';
import moment from 'moment';
import { EthCore, ABI, CONTRACT_ADDRESS } from '../../services/eth-core';

const SownFormScreen = () => {
    const [date, setDate] = React.useState<Date>(new Date((new Date()).setHours(0,0,0)));
    const [showDate, setShowDate] = React.useState<Boolean>(false);
    const [typeSeed, setTypeSeed] = React.useState<number>(0);
    const [rotation, setRotation] = React.useState<string>('');
    const [lotNumber, setLotNumber] = React.useState<string>('');

    const onSave = async () => {
        const ethereum = new EthCore({
            host: 'https://polygon-mumbai-bor.publicnode.com',
            privateKey: '0x1154a5c888982b4e307f483735675e6f4c0db55751ea07d32d5e6f31b9ae5743',
            options: {
                chainId: 80001,
                gasPrice: 95000000000,
                gasLimitMultiplier: 2
            }
        });
        const contractAddress = CONTRACT_ADDRESS;
        const contractInstance = ethereum.getInstanceContract(ABI, contractAddress);
        const methodToExecute = contractInstance.methods.insertSown(date.getTime(), typeSeed, rotation, lotNumber);
        const receipt = await ethereum.sendTransaction(contractAddress, methodToExecute, 0);
        console.log(receipt);
    }

    return (
        <View style={styles.container}>
            <View style={styles.formContainer}>
                {/* <Text style={styles.formTitle}>Ingrese datos</Text> */}
                <View style={styles.formGroupInput}>
                    <Text style={[styles.formGroupInputLabel]}>Fecha</Text>
                    <View style={{flexDirection: 'row', marginVertical: 10}}>
                        <Text style={[styles.formGroupInputText, {flex: 1}]} ellipsizeMode='tail' numberOfLines={1}>{date.toDateString()}</Text>
                        <Icon onPress={() => setShowDate(!showDate)} size={16} name={showDate ? 'calendar-check-o' : 'calendar'}/>
                        {
                            showDate && 
                            <DateTimePicker
                                mode='date'
                                display="calendar"
                                value={date}
                                onChange={(event, date) => {
                                    setShowDate(!showDate)
                                    if (event.type === 'set' && date)
                                    {
                                        const newDate = date.setHours(0, 0, 0);
                                        setDate(new Date(newDate))
                                    }
                                }}
                            />
                        }
                    </View>
                </View>
                <View style={styles.formGroupInput}>
                    <Text style={styles.formGroupInputLabel}>Tipo</Text>
                    <View>
                        <RNPickerSelect
                            useNativeAndroidPickerStyle={false}
                            onValueChange={(value, i) => {
                                setTypeSeed(value)
                            }}
                            value={typeSeed}
                            items={[
                                {label: 'Siembra Tipo 1', value: 0},
                                {label: 'Siembra Tipo 2', value: 1},
                                {label: 'Siembra Tipo 3', value: 2},
                                {label: 'Siembra Tipo 4', value: 3},
                            ]}
                            style={pickerStyle()}
                            Icon={() => (<Icon size={16} name={'angle-down'}/>)}
                        />
                    </View>
                    {/* <TextInput style={{color: '#323232', fontWeight: '400', fontSize: 14}} placeholder='Nombres' value={"null"}/> */}
                </View>
                <View style={styles.formGroupInput}>
                    <Text style={styles.formGroupInputLabel}>Rotación</Text>
                    <TextInput style={styles.formGroupInputText} placeholder='Rotación' value={rotation} onChangeText={setRotation}/>
                </View>
                <View style={styles.formGroupInput}>
                    <Text style={styles.formGroupInputLabel}>Nro de lote</Text>
                    <TextInput style={styles.formGroupInputText} placeholder='Rotación' value={lotNumber} onChangeText={setLotNumber}/>
                </View>
            </View>
            <TouchableOpacity style={styles.button} onPress={onSave}>
                <Text style={styles.buttonText}>Grabar</Text>
            </TouchableOpacity>
        </View>
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
        paddingHorizontal: 30,
        paddingVertical: 30
    },
    formTitle: {
        fontSize: 20,
        marginVertical: 10,
        fontWeight: '500',
        color: '#000',
        alignSelf: 'center'
    },
    formSubTitle: {
        fontSize: 16,
        marginVertical: 20,
        fontWeight: '400',
        color: '#000'
    },
    formGroupInput: {
        borderBottomColor: '#333',
        borderBottomWidth: 0.3,
        marginVertical: 10
    },
    formGroupInputLabel: {
        color: '#000',
        textDecorationLine: 'underline', 
        fontWeight: '600'
    },
    formGroupInputText: {
        color: '#000',
        fontWeight: '400', 
        fontSize: 14
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
        marginVertical: 100,
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

const pickerStyle = () => {
    return {
        inputAndroid: {
            color: '#1c1c1c',
            // width: '100%'
        },
        iconContainer: {
            bottom: 10,
            top: 15,
            paddingRight: 0
        }
    };
};

export default SownFormScreen;