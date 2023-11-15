import React from 'react';
import { Alert, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Auth } from 'aws-amplify';

const LogoImageSrc = require('../assets/images/PaltBlock_Logo.png');
 
const ChangePasswordScreen = ({ route, navigation }: any) => {
    const { cognitoUser, fromSettings } = route.params;
    const [user, setUser] = React.useState<Record<string, string>>({});

    const onChange = (value: Record<string, any>) => {
        setUser({...user, ...value});
    }

    const onSignIn = async () => {
        if (!user.newPassword || !user.confirmNewPassword) {
            Alert.alert('Please, complete username and password');
            return;
        }
        if (user.newPassword !== user.confirmNewPassword) {
            Alert.alert('New password not match');
            return;
        }
        try {
            if (fromSettings) {
                await Auth.changePassword(cognitoUser, user.oldPassword, user.newPassword);
            } else  {
                await Auth.completeNewPassword(cognitoUser, user.newPassword.trim());
            }
            navigation.navigate('MainScreen', { screen: 'TraceabilityScreen' });
        } catch (error: any) {
            console.log(error);
            Alert.alert('error signing', error.message);
        }
    }

    return (
        <View style={Styles().container}>
            <View style={Styles().headerContainer}>
                <Image source={LogoImageSrc} style={Styles().headerLogo}/>
                <Text style={Styles().headerTitle}>Update your password!</Text>
                <Text style={[Styles().headerTitle, {fontSize: 14, color: '#696969'}]}>Please, update in to continue</Text>
                <View style={Styles().formContainer}>
                    {
                        fromSettings &&
                        <View style={Styles().formGroupInput}>
                            <Text style={Styles().formGroupInputText}>Old Password</Text>
                            <TextInput 
                                style={{color: '#323232', fontWeight: '400', fontSize: 14}}
                                secureTextEntry={true} 
                                textContentType={'password'} 
                                placeholder='Enter old password'
                                value={user.oldPassword}
                                onChangeText={(value) => onChange({oldPassword: value})}
                            />
                        </View>
                    }
                    <View style={Styles().formGroupInput}>
                        <Text style={Styles().formGroupInputText}>New Password</Text>
                        <TextInput 
                            style={{color: '#323232', fontWeight: '400', fontSize: 14}}
                            secureTextEntry={true} 
                            textContentType={'password'} 
                            placeholder='Enter new password'
                            value={user.newPassword}
                            onChangeText={(value) => onChange({newPassword: value})}
                        />
                    </View>
                    <View style={Styles().formGroupInput}>
                        <Text style={Styles().formGroupInputText}>Confirm new password</Text>
                        <TextInput 
                            style={{color: '#323232', fontWeight: '400', fontSize: 14}}
                            secureTextEntry={true} 
                            textContentType={'password'} 
                            placeholder='Enter new password again'
                            value={user.confirmNewPassword}
                            onChangeText={(value) => onChange({confirmNewPassword: value})}
                        />
                    </View>
                </View>
                <View style={Styles().buttonContainer}>
                    <TouchableOpacity style={Styles().buttonSignIn} onPress={onSignIn}>
                        <Text style={Styles().buttonTextSignIn}>Update password</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
 }
 
 export default ChangePasswordScreen;
 
 const Styles = () => {
    return StyleSheet.create({
        container: {
            backgroundColor: '#00FF83',
            height: '100%'
        },
        headerContainer: {
            display: 'flex',
            alignItems: 'center',
            paddingVertical: 30,
            flex: 1
        },
        headerTitle: {
            fontSize: 32,
            fontWeight: '600',
            color: "#3f3f3f"
        },
        headerLogo: {
            width: 92,
            height: 92,
            marginVertical: 8
        },
        formContainer: {
            marginVertical: 60,
            paddingHorizontal: 20,
            width: '100%'
        },
        formGroupInput: {
            borderBottomColor: '#333',
            borderBottomWidth: 0.3,
            marginVertical: 10
        },
        formGroupInputText: {
            color: '#3f3f3f',
            fontWeight: '500'
        },
        buttonContainer: {
            marginVertical: 60,
            width: '100%',
            height: 56,
            paddingHorizontal: 40
        },
        buttonSignIn: {
            backgroundColor: '#fff',
            color: '#F9f9f9',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 10,
            height: '100%'
        },
        buttonTextSignIn: {
            fontSize: 16,
            fontWeight: '600',
            color: '#3f3f3f'
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