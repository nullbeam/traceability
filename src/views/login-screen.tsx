// import { Auth } from 'aws-amplify';
import React from 'react';
import { Alert, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Utils } from '../utils';
import AsyncStorage from '@react-native-community/async-storage';
import { Auth } from 'aws-amplify';

const LogoImageSrc = require('../assets/images/PaltBlock_Logo.png');
 
const AuthScreen = ({ navigation}: any) => {
    const [user, setUser] = React.useState<Record<string, string>>({});

    const onChange = (value: Record<string, any>) => {
        setUser({...user, ...value});
    }

    const onSignIn = async () => {
        if (!user.username || !user.password) {
            Alert.alert('Please, complete username and password');
            return;
        }
        try {
            const result = await Auth.signIn(user.username.trim(), user.password.trim());
            let privateKey = await AsyncStorage.getItem('privatekey');
            if (!privateKey) {
                privateKey = Utils.generatePrivateKey();
                await AsyncStorage.setItem('privatekey', privateKey);
            }
            if (result.challengeName === 'NEW_PASSWORD_REQUIRED') {
                navigation.navigate('ChangePasswordScreen', { cognitoUser: result });
            } else {
                navigation.navigate('MainScreen', { screen: 'TraceabilityScreen' });
            }
        } catch (error: any) {
            console.log(error);
            Alert.alert('error signing', error.message);
        }
    }

    return (
        <View style={Styles().container}>
            <View style={Styles().headerContainer}>
                <Image source={LogoImageSrc} style={Styles().headerLogo}/>
                <Text style={Styles().headerTitle}>Welcome Back!</Text>
                <Text style={[Styles().headerTitle, {fontSize: 14, color: '#696969'}]}>Please, sign in to continue</Text>
                <View style={Styles().formContainer}>
                    <View style={Styles().formGroupInput}>
                        <Text style={Styles().formGroupInputText}>Username</Text>
                        <TextInput style={{color: '#323232', fontWeight: '400', fontSize: 14}} placeholder='Enter username' value={user.username} onChangeText={(value) => onChange({username: value})}/>
                    </View>
                    <View style={Styles().formGroupInput}>
                        <Text style={Styles().formGroupInputText}>Password</Text>
                        <TextInput 
                            style={{color: '#323232', fontWeight: '400', fontSize: 14}}
                            secureTextEntry={true} 
                            textContentType={'password'} 
                            placeholder='Enter password'
                            value={user.password}
                            onChangeText={(value) => onChange({password: value})}
                        />
                    </View>
                </View>
                <View style={Styles().buttonContainer}>
                    <TouchableOpacity style={Styles().buttonSignIn} onPress={onSignIn}>
                        <Text style={Styles().buttonTextSignIn}>Sign In</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={Styles().footerContainer}>
                <Text style={Styles().footerContainerText}>
                    <Text>Problem with your account? </Text>
                    <Text style={{fontWeight: 'bold', textDecorationLine: 'underline'}} onPress={() => navigation.navigate("ContactScreen")}>Contact the administrator</Text>
                </Text>
            </View>

            {/* <View style={Styles().headerContainer}>
                <Text style={Styles().headerTitle}>Accede a tu cuenta</Text>
                <Image source={LogoImageSrc} style={Styles().headerLogo}/>
            </View>
            <View style={Styles().formContainer}>
                <View style={Styles().formGroupInput}>
                    <Text style={Styles().formGroupInputText}>Usuario</Text>
                    <TextInput style={{color: '#323232', fontWeight: '400', fontSize: 14}} placeholder='Ingrese usuario' value={user.username} onChangeText={(value) => onChange({username: value})}/>
                </View>
                <View style={Styles().formGroupInput}>
                    <Text style={Styles().formGroupInputText}>Contraseña</Text>
                    <TextInput 
                        style={{color: '#323232', fontWeight: '400', fontSize: 14}}
                        secureTextEntry={true} 
                        textContentType={'password'} 
                        placeholder='Ingrese contraseña'
                        value={user.password}
                        onChangeText={(value) => onChange({password: value})}
                    />
                </View>
                <Text style={Styles().remeberPasswordText} onPress={() => navigation.navigate("Recovery")}>¿Olvidaste tu contraseña?</Text>
            </View>
            <View style={Styles().buttonContainer}>
                <TouchableOpacity style={Styles().buttonSignIn} onPress={onSignIn}>
                    <Text style={Styles().buttonTextSignIn}>INICIAR SESIÓN</Text>
                </TouchableOpacity>
            </View> */}
        </View>
    );
 }
 
 export default AuthScreen;
 
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