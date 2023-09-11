import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const LogoImageSrc = require('../assets/images/PaltBlock_Logo.png');

const GreetingScreen = ({ navigation }: any) => {
    return (
        <View style={Styles().container}>
            <View style={Styles().headerContainer}>
                <Image source={LogoImageSrc} style={Styles().headerLogo}/>
                <Text style={Styles().headerTitle}>PaltBlock</Text>
                <View style={Styles().buttonContainer}>
                    <TouchableOpacity style={Styles().buttonSignIn} onPress={() => navigation.navigate("LoginScreen")}>
                        <Text style={Styles().buttonTextSignIn}>Sign In</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={Styles().footerContainer}>
                <Text style={Styles().footerContainerText}>
                    <Text>Problem with your account?</Text>
                    <Text style={{fontWeight: 'bold'}}> Contact the administrator</Text>
                </Text>
            </View>
        </View>
    );
}

const Styles = () => {
    return StyleSheet.create({
        container: {
            backgroundColor: '#00FF83',
            height: '100%',
            display: 'flex'
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
            fontSize: 32,
            fontWeight: 'bold',
            color: "#fff"
        },
        headerLogo: {
            width: 200,
            height: 200,
            marginVertical: 20
        },
        formContainer: {
            paddingHorizontal: 20
        },
        formGroupInput: {
            borderBottomColor: '#333',
            borderBottomWidth: 0.3,
            marginVertical: 10
        },
        formGroupInputText: {
            color: '#000'
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

export default GreetingScreen;