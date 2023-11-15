import React from 'react';
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View, ScrollView, Alert } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import RNPickerSelect from 'react-native-picker-select';
import Icon from 'react-native-vector-icons/FontAwesome';
import { PALTBLOCK_SERVICE_URL } from '../services/constants';
import axios from 'axios';

const LogoImageSrc = require('../assets/images/PaltBlock_Logo.png');

const ContactScreen = ({ navigation }: any) => {
    const [spinnerVisible, setSpinnerVisible] = React.useState<boolean>(false);
    const [contacts, setContacts] = React.useState<Array<any>>([]);
    const [formattedContacts, setFormattedContacts] = React.useState<Array<any>>([]);
    const [selectedContact, setSelectedContact] = React.useState<any>(null);
    const [textAreaData, setTextAreaData] = React.useState<any>(null);

    const onViewInfo = () => {
        let _textAreaData = ''
        const _currentContact = contacts.find(x => x.companyId == selectedContact);
        _textAreaData += `\nCompany ID: ${_currentContact.companyId}\n`;
        _textAreaData += `Company Name: ${_currentContact.companyName}\n`;
        _textAreaData += `Names: ${_currentContact.name} ${_currentContact.lastName}\n`;
        _textAreaData += `Phone: ${_currentContact.phone}\n`;
        _textAreaData += `Email: ${_currentContact.email}\n`;
        setTextAreaData(_textAreaData);
    }

    const loadContacts = async () => {
        try {
            setSpinnerVisible(true);
            const response = await axios.get(PALTBLOCK_SERVICE_URL);
            if (response.status == 200) {
                const _contacts = JSON.parse(response.data.body);
                console.log(_contacts);
                const _formattedContacts = _contacts.map((x: any) => {
                    return {
                        label: x.companyName,
                        value: x.companyId
                    }
                })
                setContacts(_contacts);
                setFormattedContacts(_formattedContacts);
            }
        } catch (error: any) {
            console.error(error);
            Alert.alert(error.message);
        } finally {
            setSpinnerVisible(false);
        }
    }

    React.useEffect(() => {
        loadContacts();
    }, []);

    return (
        <ScrollView style={Styles().container}>
            <Spinner visible={spinnerVisible}/>
            <View style={Styles().headerContainer}>
                <Image source={LogoImageSrc} style={Styles().headerLogo}/>
                <Text style={Styles().headerTitle}>Datos del administrador</Text>
            </View>
            <View style={Styles().formContainer}>
                <View style={Styles().formGroupInput}>
                    <Text style={Styles().formGroupInputLabel}>Company name:</Text>
                    <View style={{flex: 1}}>
                        <RNPickerSelect
                            useNativeAndroidPickerStyle={false}
                            onValueChange={(value, i) => { 
                                setSelectedContact(value);
                                // const location = companies.find(x => x.value == value)?.location;
                                // if (location) setLocation(location);
                            }}
                            value={selectedContact}
                            items={formattedContacts}
                            style={pickerStyles()}
                            Icon={() => {<Icon size={16} name={'angle-down'} color='#1f1f1f'/>}}
                        />
                    </View>
                </View>
                <View style={{paddingVertical: 8}}/>
                <View style={[Styles().formGroupInput, {flexDirection: 'column', alignItems: 'flex-start'}]}>
                    <Text style={Styles().formGroupInputLabel}>Aditional information:</Text>
                    <TextInput style={[Styles().formGroupInputText, {width: '100%', backgroundColor: '#bdbdbd'}]} value={textAreaData} numberOfLines={4} editable={false} multiline/>
                </View>
            </View>
            <View style={{paddingVertical: 16}}/>
            <TouchableOpacity style={Styles().button} onPress={onViewInfo}>
                <Text style={Styles().buttonText}>View Info</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

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
            justifyContent: 'center',
            paddingVertical: 30,
            flex: 1,
            // backgroundColor: '#901219'
        },
        headerTitle: {
            fontSize: 28,
            fontWeight: 'bold',
            color: "#3f3f3f"
        },
        headerLogo: {
            width: 100,
            height: 100,
            marginVertical: 20
        },
        formContainer: {
            paddingHorizontal: 16,
            paddingVertical: 16
        },
        formGroupInput: {
            flexDirection: 'column',
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
        buttonText: {
            color: '#fff',
            fontSize: 16,
            fontWeight: '600',
            lineHeight: 20
        },
        footerContainer: { 
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            height: 80,
            paddingHorizontal: 24
        },
        footerContainerText: {
            color: '#fff',
            fontWeight: '500',
            textAlign: 'center'
        }
    });
};

const pickerStyles = () => {
    return {
        inputAndroid: {
            color: '#1f1f1f',
            borderColor: "#bdbdbd", 
            borderWidth: 1, 
            paddingVertical: 4,
            paddingHorizontal: 12
        }
    };
};

export default ContactScreen;