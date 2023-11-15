import React from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, ScrollView, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import DateTimePicker from '@react-native-community/datetimepicker';
import RNPickerSelect from 'react-native-picker-select';
import { ABI, CONTRACT_ADDRESS, EthCore } from '../services/eth-core';
import AsyncStorage from '@react-native-community/async-storage';
import Spinner from 'react-native-loading-spinner-overlay';
import { useIsFocused } from '@react-navigation/native';
import { Auth } from 'aws-amplify';

const ProfileScreen = ({ navigation }: any) => {
    const isFocused = useIsFocused();
    const [spinnerVisible, setSpinnerVisible] = React.useState<boolean>(false);
    const [userInfo, setUserInfo] = React.useState<any>(null);
    // const [companyId, setCompanyId] = React.useState<number | undefined>(undefined);
    // const [operationStartDate, setOperationStartDate] = React.useState<Date>(new Date((new Date()).setHours(0,0,0)));
    // const [showOperationStartDate, setShowOperationStartDate] = React.useState<boolean>(false);
    // const [operationEndDate, setOperationEndDate] = React.useState<Date>(new Date((new Date()).setHours(0,0,0)));
    // const [showOperationEndDate, setShowOperationEndDate] = React.useState<boolean>(false);
    // const [location, setLocation] = React.useState<string>("");
    // const [additionalInformation, setAdditionalInformation] = React.useState<string>("");
    // const [companies, setCompanies] = React.useState<Array<any>>([]);

    const loadUserInfo = async () => {
      setSpinnerVisible(true);
      try {
        const _userInfo = await Auth.currentUserInfo();
        console.log(_userInfo)
        setUserInfo(_userInfo);
      } catch (error: any) {
          console.error(error);
          Alert.alert('error signing', error.message);
      } finally {
        setSpinnerVisible(false);
      }
    }

    React.useEffect(() => {
      loadUserInfo();
    }, [isFocused]);

    return (
        <ScrollView style={styles.container}>
            <Spinner visible={spinnerVisible}/>
            <View style={styles.formContainer}>
                <Text style={styles.formTitle}>PROFILE</Text>
                <View style={{paddingVertical: 16}}/>
                <View style={[styles.formGroupInput, {flexDirection: 'column', alignItems: 'flex-start'}]}>
                    <Text style={styles.formGroupInputLabel}>Username:</Text>
                    <TextInput style={[styles.formGroupInputText, { width: '100%' }]} value={userInfo?.username} editable={false}/>
                </View>
                <View style={{paddingVertical: 8}}/>
                <View style={[styles.formGroupInput, {flexDirection: 'column', alignItems: 'flex-start'}]}>
                    <Text style={styles.formGroupInputLabel}>Name:</Text>
                    <TextInput style={[styles.formGroupInputText, { width: '100%' }]} value={userInfo?.attributes.name} editable={false}/>
                </View>
                <View style={{paddingVertical: 8}}/>
                <View style={[styles.formGroupInput, {flexDirection: 'column', alignItems: 'flex-start'}]}>
                    <Text style={styles.formGroupInputLabel}>Lastname:</Text>
                    <TextInput style={[styles.formGroupInputText, { width: '100%' }]} value={userInfo?.attributes.family_name} editable={false}/>
                </View>
                <View style={{paddingVertical: 8}}/>
                <View style={[styles.formGroupInput, {flexDirection: 'column', alignItems: 'flex-start'}]}>
                    <Text style={styles.formGroupInputLabel}>Document ID:</Text>
                    <TextInput style={[styles.formGroupInputText, { width: '100%' }]} value={userInfo?.attributes["custom:documentId"]} editable={false}/>
                </View>
                <View style={{paddingVertical: 8}}/>
                <View style={[styles.formGroupInput, {flexDirection: 'column', alignItems: 'flex-start'}]}>
                    <Text style={styles.formGroupInputLabel}>Email:</Text>
                    <TextInput style={[styles.formGroupInputText, { width: '100%' }]} value={userInfo?.attributes.email} editable={false}/>
                </View>
                <View style={{paddingVertical: 8}}/>
                <View style={[styles.formGroupInput, {flexDirection: 'column', alignItems: 'flex-start'}]}>
                    <Text style={styles.formGroupInputLabel}>Phone number:</Text>
                    <TextInput style={[styles.formGroupInputText, { width: '100%' }]} value={userInfo?.attributes.phone_number} editable={false}/>
                </View>
                <View style={{paddingVertical: 8}}/>
                <View style={[styles.formGroupInput, {flexDirection: 'column', alignItems: 'flex-start'}]}>
                    <Text style={styles.formGroupInputLabel}>Address:</Text>
                    <TextInput style={[styles.formGroupInputText, { width: '100%' }]} placeholder="Write something" value={userInfo?.attributes['custom:address']} numberOfLines={4} multiline/>
                </View>
            </View>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('SettingsScreen')}>
                <Text style={styles.buttonText}>Change info</Text>
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
        paddingHorizontal: 28,
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
        gap: 12
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

export default ProfileScreen;