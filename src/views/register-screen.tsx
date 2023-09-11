// import { Auth } from 'aws-amplify';
import React from 'react';
import { Alert, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
// import {
//     CodeField,
//     Cursor,
//     useBlurOnFulfill,
//     useClearByFocusCell,
//   } from 'react-native-confirmation-code-field';

const LogoImageSrc = require('../assets/images/logo.png');
const CELL_COUNT = 6;

const RegisterScreen = ({ navigation }: any) => {
    const [step, setStep] = React.useState<number>(1);
    const [userData, setUserData] = React.useState<Record<string, string>>({});
    const [value, setValue] =  React.useState<string>('');
    // const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
    // const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    //     value,
    //     setValue,
    // });

    const onSignUp = async () => {
        // try {
        //     const { user } = await Auth.signUp({
        //         username: userData.username.trim(),
        //         password: userData.password.trim(),
        //         attributes: {
        //             email: userData.email.trim(),
        //             phone_number: '+51' + userData.phoneNumber.trim(),
        //             given_name: '-',
        //             family_name: userData.lastname.trim(),
        //             middle_name: '-',
        //             name: userData.name.trim()
        //         },
        //         autoSignIn: {
        //             enabled: true,
        //         }
        //     });
        //     console.log(user);
        //     onNext();
        // } catch (error) {
        //     Alert.alert('error signing up:', error.message);
        // }
    }

    const onConfirmSignUp = async () => {
        // try {
        //     await Auth.confirmSignUp(userData.username, value);
        //     Alert.alert('Usuario registrado correctamente');
        //     navigation.navigate("Auth");
        // } catch (error) {
        //     Alert.alert('error confirming sign up', error.message);
        // }
    }

    const onChange = (value: Record<string, any>) => {
        setUserData({...userData, ...value});
    }

    const onClose = () => {
        navigation.navigate("LoginScreen");
    }

    const onBack = () => {
        setStep(step - 1);
    }

    const onNext = () => {
        if (userData.password !== userData.confirmPassword) {
            Alert.alert('La contraseña no coincide');
            return;
        }
        setStep(step + 1);
    }

    const step1 = () => {
        return (
            <React.Fragment>
                <View style={Styles().formContainer}>
                    <Text style={Styles().formTitle}>Regístrate</Text>
                    <Text style={Styles().formSubTitle}>Complete los campos con sus datos</Text>
                    <View style={Styles().formGroupInput}>
                        <Text style={Styles().formGroupInputText}>Apellidos</Text>
                        <TextInput style={{color: '#323232', fontWeight: '400', fontSize: 14}} placeholder='Ingrese apellidos' value={userData.lastname} onChangeText={(value) => onChange({lastname: value})}/>
                    </View>
                    <View style={Styles().formGroupInput}>
                        <Text style={Styles().formGroupInputText}>Nombres</Text>
                        <TextInput style={{color: '#323232', fontWeight: '400', fontSize: 14}} placeholder='Ingrese nombres' value={userData.name} onChangeText={(value) => onChange({name: value})}/>
                    </View>
                </View>
                <View style={Styles().buttonContainer}>
                    <TouchableOpacity style={Styles().buttonNext} onPress={onNext}>
                        <Text style={Styles().buttonTextNext}>SIGUIENTE</Text>
                    </TouchableOpacity>
                </View>
            </React.Fragment>
        )
    }

    const step2 = () => {
        return (
            <React.Fragment>
                <View style={Styles().formContainer}>
                    <Text style={Styles().formTitle}>Regístrate</Text>
                    <Text style={Styles().formSubTitle}>Crea un usuario</Text>
                    <View style={Styles().formGroupInput}>
                        <Text style={Styles().formGroupInputText}>Usuario</Text>
                        <TextInput style={{color: '#323232', fontWeight: '400', fontSize: 14}} placeholder='Ingrese usuario' value={userData.username} onChangeText={(value) => onChange({username: value})}/>
                    </View>
                </View>
                <View style={Styles().buttonContainer}>
                    <TouchableOpacity style={[Styles().buttonNext, {marginBottom: 20}]} onPress={onNext}>
                        <Text style={Styles().buttonTextNext}>SIGUIENTE</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={Styles().buttonBack} onPress={onBack}>
                        <Text style={Styles().buttonTextBack}>ATRAS</Text>
                    </TouchableOpacity>
                </View>
            </React.Fragment>
        )
    }

    const step3 = () => {
        return (
            <React.Fragment>
                <View style={Styles().formContainer}>
                    <Text style={Styles().formTitle}>Regístrate</Text>
                    <Text style={Styles().formSubTitle}>Establece una contraseña para tu cuenta</Text>
                    <View style={Styles().formGroupInput}>
                        <Text style={Styles().formGroupInputText}>Contraseña</Text>
                        <TextInput 
                            style={{color: '#323232', fontWeight: '400', fontSize: 14}}
                            secureTextEntry={true} 
                            textContentType={'password'} 
                            placeholder='Ingrese contraseña' 
                            value={userData.password}
                            onChangeText={(value) => onChange({password: value})}
                        />
                    </View>
                    <View style={Styles().formGroupInput}>
                        <Text style={Styles().formGroupInputText}>Repite la contraseña</Text>
                        <TextInput 
                            style={{color: '#323232', fontWeight: '400', fontSize: 14}}
                            secureTextEntry={true} 
                            textContentType={'password'} 
                            placeholder='Repite la contraseña'
                            value={userData.confirmPassword}
                            onChangeText={(value) => onChange({confirmPassword: value})}
                        />
                    </View>
                </View>
                <View style={Styles().buttonContainer}>
                    <TouchableOpacity style={[Styles().buttonNext, {marginBottom: 20}]} onPress={onNext}>
                        <Text style={Styles().buttonTextNext}>SIGUIENTE</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={Styles().buttonBack} onPress={onBack}>
                        <Text style={Styles().buttonTextBack}>ATRAS</Text>
                    </TouchableOpacity>
                </View>
            </React.Fragment>
        )
    }

    const step4 = () => {
        return (
            <React.Fragment>
                <View style={Styles().formContainer}>
                    <Text style={Styles().formTitle}>Regístrate</Text>
                    <Text style={Styles().formSubTitle}>Asocia tú numero de celular y su e-mail a tu cuenta</Text>
                    <View style={Styles().formGroupInput}>
                        <Text style={Styles().formGroupInputText}>Celular</Text>
                        <TextInput style={{color: '#323232', fontWeight: '400', fontSize: 14}} placeholder='Ingrese celular' value={userData.phoneNumber} onChangeText={(value) => onChange({phoneNumber: value})}/>
                    </View>
                    <View style={Styles().formGroupInput}>
                        <Text style={Styles().formGroupInputText}>Correo electrónico</Text>
                        <TextInput style={{color: '#323232', fontWeight: '400', fontSize: 14}} placeholder='Ingrese correo' value={userData.email} onChangeText={(value) => onChange({email: value})}/>
                    </View>
                </View>
                <View style={Styles().buttonContainer}>
                    <TouchableOpacity style={[Styles().buttonNext, {marginBottom: 20}]} onPress={onSignUp}>
                        <Text style={Styles().buttonTextNext}>REGISTRARME</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={Styles().buttonBack} onPress={onBack}>
                        <Text style={Styles().buttonTextBack}>ATRAS</Text>
                    </TouchableOpacity>
                </View>
            </React.Fragment>
        )
    }

    const step5 = () => {
        return (
            <React.Fragment>
                <View style={Styles().formContainer}>
                    <Text style={Styles().formTitle}>Regístrate</Text>
                    <Text style={Styles().formSubTitle}>Inserta el código de verificación enviado a tu correo</Text>
                    {/* <CodeField
                        ref={ref}
                        {...props}
                        value={value}
                        onChangeText={setValue}
                        cellCount={CELL_COUNT}
                        rootStyle={Styles().codeFieldRoot}
                        keyboardType="number-pad"
                        textContentType="oneTimeCode"
                        renderCell={({index, symbol, isFocused}) => (
                            <View
                                key={index}
                                onLayout={getCellOnLayoutHandler(index)}
                                style={[Styles().cellRoot, isFocused && Styles().focusCell]}
                            >
                                <Text
                                    key={index}
                                    style={Styles().cellText}
                                >
                                    {symbol || (isFocused ? <Cursor /> : null)}
                                </Text>
                            </View>
                        )}
                    /> */}
                </View>
                <View style={Styles().buttonContainer}>
                    <TouchableOpacity style={[Styles().buttonNext, {marginBottom: 20}]} onPress={onConfirmSignUp}>
                        <Text style={Styles().buttonTextNext}>CONFIRMAR</Text>
                    </TouchableOpacity>
                </View>
            </React.Fragment>
        )
    }

    const renderSteps = () => {
       switch(step) {
            case 1:
                return step1();
            case 2:
                return step2();
            case 3:
                return step3();
            case 4:
                return step4();
            case 5:
                return step5();
            default:
                return step1();
       }
    }

    return (
        <View style={Styles().container}>
            <View style={Styles().headerContainer}>
                <TouchableOpacity style={Styles().headerCloseButton} onPress={onClose}>
                        <Icon name="close" size={30} color="#278e33" />
                </TouchableOpacity>
                <Image source={LogoImageSrc} style={Styles().headerLogo}/>
            </View>
            {renderSteps()}
        </View>
    );
}

export default RegisterScreen;

const Styles = () => {
    return StyleSheet.create({
        container: {
            backgroundColor: '#fff',
            height: '100%'
        },
        headerContainer: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'flex-start',
            paddingHorizontal: 20,
            paddingVertical: 20
        },
        headerCloseButton: {
            flex: 1
        },
        headerLogo: {
            width: 80,
            height: 80
        },
        formContainer: {
            paddingHorizontal: 20
        },
        formTitle: {
            fontSize: 25,
            marginVertical: 5,
            fontWeight: '500',
            color: '#000'
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
        formGroupInputText: {
            color: '#000'
        },
        buttonContainer: {
            paddingHorizontal: 100
        },
        buttonNext: {
            backgroundColor: '#278e33',
            paddingVertical: 20,
            alignItems: 'center',
            borderRadius: 50,
            marginVertical: 60
        },
        buttonTextNext: {
            fontSize: 14,
            fontWeight: '600',
            color: '#fff'
        },
        buttonBack: {
            backgroundColor: '#fff',
            borderColor: '#278e33',
            borderWidth: 1,
            paddingVertical: 20,
            alignItems: 'center',
            borderRadius: 50
        },
        buttonTextBack: {
            fontSize: 14,
            fontWeight: '600',
            color: '#278e33'
        },
        codeFieldRoot: {
            marginTop: 40
        },
        cellRoot: {
            width: 50,
            height: 50,
            justifyContent: 'center',
            alignItems: 'center',
            borderBottomColor: '#ccc',
            borderBottomWidth: 1,
        },
        cellText: {
            color: '#000',
            fontSize: 36,
            textAlign: 'center',
        },
        focusCell: {
            borderBottomColor: '#007AFF',
            borderBottomWidth: 2,
        },
    });
};