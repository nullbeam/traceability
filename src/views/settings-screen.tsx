import React from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, ScrollView, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import IconMaterial from 'react-native-vector-icons/MaterialIcons';
import DateTimePicker from '@react-native-community/datetimepicker';
import RNPickerSelect from 'react-native-picker-select';
import { ABI, CONTRACT_ADDRESS, EthCore } from '../services/eth-core';
import AsyncStorage from '@react-native-community/async-storage';
import Spinner from 'react-native-loading-spinner-overlay';
import { useIsFocused } from '@react-navigation/native';
import { Auth } from 'aws-amplify';
import Toast from 'react-native-root-toast';
import Clipboard from '@react-native-community/clipboard';
import { Utils } from '../utils';

const SettingsScreen = ({ navigation }: any) => {
    const isFocused = useIsFocused();
    const [spinnerVisible, setSpinnerVisible] = React.useState<boolean>(false);
    const [userInfo, setUserInfo] = React.useState<any>({attributes: {}});
    const [address, setAddress] = React.useState('');
    const [balance, setBalance] = React.useState('');

    const onChange = (value: Record<string, any>) => {
      setUserInfo({...userInfo, attributes: {...userInfo.attributes, ...value}});
    }

    const onUpdateInfo = async () => {
      setSpinnerVisible(true);
      try {
        const user = await Auth.currentAuthenticatedUser();
        if (userInfo?.attributes)
          await Auth.updateUserAttributes(user, userInfo?.attributes);
      } catch (error: any) {
        console.error(error);
        Alert.alert('error signing', error.message);
      } finally {
        setSpinnerVisible(false);
      }
    }

    const onNavigateChangePassword = async () => {
      setSpinnerVisible(true);
      try {
        const user = await Auth.currentAuthenticatedUser();
        navigation.navigate('ChangePasswordScreen', { cognitoUser: user, fromSettings: true })
      } catch (error: any) {
        console.error(error);
        Alert.alert('error signing', error.message);
      } finally {
        setSpinnerVisible(false);
      }
    }

    const writeToClipboard = async () => {
      await Clipboard.setString(address);
      Toast.show("Copied to clipboard", {
          duration: Toast.durations.SHORT,
          position: Toast.positions.BOTTOM,
      });
    }

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
      const load = async () => {
        let privateKey = await AsyncStorage.getItem('privatekey') || '';
        const address = Utils.privateToAddress(privateKey);
        setAddress(address);

        const ethereum = new EthCore({
            host: 'https://polygon-mumbai-bor.publicnode.com',
            privateKey,
            options: {
                chainId: 80001,
                gasPrice: 9500000000,
                gasLimitMultiplier: 2
            }
        });
        var balance = await ethereum.web3Instance.eth.getBalance(address);
        setBalance(ethereum.web3Instance.utils.fromWei(balance, 'ether'));
      }
      load();
    }, [isFocused]);

    return (
        <ScrollView style={styles.container}>
            <Spinner visible={spinnerVisible}/>
            <View style={styles.formContainer}>
                <Text style={styles.formTitle}>SETTINGS</Text>
                <View style={{paddingVertical: 16}}/>
                <View style={[styles.formGroupInput]}>
                  <Text style={{color: '#1f1f1f', fontWeight: '600'}}>ETH Address:</Text>
                  <Text style={{flex: 1, color: '#1f1f1f'}} numberOfLines={1} ellipsizeMode='middle'>{address}</Text>
                  <TouchableOpacity onPress={writeToClipboard}>
                    <IconMaterial size={20} name="content-copy" color={'#1f1f1f'}/>
                  </TouchableOpacity>
                </View>
                <View style={{paddingVertical: 8}}/>
                <View style={[styles.formGroupInput]}>
                  <Text style={{color: '#1f1f1f', fontWeight: '600'}}>Your Mumbai balance:</Text>
                  <Text style={{flex: 1, color: '#1f1f1f'}}>{balance}</Text>
                </View>
                <View style={{paddingVertical: 8}}/>
                <View style={[styles.formGroupInput, {flexDirection: 'column', alignItems: 'flex-start'}]}>
                    <Text style={styles.formGroupInputLabel}>Name:</Text>
                    <TextInput style={[styles.formGroupInputText, { width: '100%' }]} value={userInfo?.attributes.name} onChangeText={(value) => onChange({'name': value})}/>
                </View>
                <View style={{paddingVertical: 8}}/>
                <View style={[styles.formGroupInput, {flexDirection: 'column', alignItems: 'flex-start'}]}>
                    <Text style={styles.formGroupInputLabel}>Lastname:</Text>
                    <TextInput style={[styles.formGroupInputText, { width: '100%' }]} value={userInfo?.attributes.family_name} onChangeText={(value) => onChange({'family_name': value})}/>
                </View>
                <View style={{paddingVertical: 8}}/>
                <View style={[styles.formGroupInput, {flexDirection: 'column', alignItems: 'flex-start'}]}>
                    <Text style={styles.formGroupInputLabel}>Document ID:</Text>
                    <TextInput style={[styles.formGroupInputText, { width: '100%' }]} value={userInfo?.attributes["custom:documentId"]} onChangeText={(value) => onChange({'custom:documentId': value})}/>
                </View>
                <View style={{paddingVertical: 8}}/>
                <View style={[styles.formGroupInput, {flexDirection: 'column', alignItems: 'flex-start'}]}>
                    <Text style={styles.formGroupInputLabel}>Phone number:</Text>
                    <TextInput style={[styles.formGroupInputText, { width: '100%' }]} value={userInfo?.attributes.phone_number} onChangeText={(value) => onChange({'phone_number': value})}/>
                </View>
                <View style={{paddingVertical: 8}}/>
                <View style={[styles.formGroupInput, {flexDirection: 'column', alignItems: 'flex-start'}]}>
                    <Text style={styles.formGroupInputLabel}>Address:</Text>
                    <TextInput style={[styles.formGroupInputText, { width: '100%' }]} placeholder="Write something" value={userInfo?.attributes['custom:address']} numberOfLines={4} multiline onChangeText={(value) => onChange({'custom:address': value})}/>
                </View>
            </View>
            <TouchableOpacity style={styles.button} onPress={onUpdateInfo}>
                <Text style={styles.buttonText}>Update info</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonAlt} onPress={onNavigateChangePassword}>
                <Text style={[styles.buttonText, {color: '#18c460'}]}>Update Password</Text>
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

export default SettingsScreen;