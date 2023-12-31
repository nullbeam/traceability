import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import NewLotScreen from './new-lot-screen';
import ScanLotScreen from './scan-lot-screen';
import SuccessfulScreen from './successful-screen';
import SearchLotScreen from './search-lot-screen';
import AddToLotScreen from './add-to-lot-screen';
import TraceabilityLotScreen from './traceability-lot-screen';
import QRScreen from './qr-screen';

const TraceabilityMainScreen = ({ navigation }: any) => {
    return (
        <View style={styles.container}>
            <View style={styles.buttonsContainer}>
                <TouchableOpacity style={styles.button} onPress={() => navigation.push('NewLotScreen')}>
                    <Icon size={52} name={'plus-circle'} style={{color: '#fff'}}/>
                    <Text style={styles.buttonText}>New Lot</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => navigation.push('ScanLotScreen')}>
                    <Icon size={52} name={'qrcode'} style={{color: '#fff'}}/>
                    <Text style={styles.buttonText}>Scan Lot</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => navigation.push('SearchLotScreen')}>
                    <Icon size={52} name={'search'} style={{color: '#fff'}}/>
                    <Text style={styles.buttonText}>Search Lot</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const Stack = createNativeStackNavigator();

const TraceabilityScreen = ({ navigation }: any) => {
    return (
        <Stack.Navigator initialRouteName="TraceabilityMainScreen">
          <Stack.Screen name="TraceabilityMainScreen" component={TraceabilityMainScreen} options={{headerShown: true, title: "Traceability", headerTintColor: '#1f1f1f', headerStyle: {backgroundColor: '#00FF83'}}}/>
          <Stack.Screen name="NewLotScreen" component={NewLotScreen} options={{headerShown: true, title: "Traceability", headerTintColor: '#1f1f1f', headerStyle: {backgroundColor: '#00FF83'}}}/>
          <Stack.Screen name="SearchLotScreen" component={SearchLotScreen} options={{headerShown: true, title: "Traceability", headerTintColor: '#1f1f1f', headerStyle: {backgroundColor: '#00FF83'}}}/>
          <Stack.Screen name="AddToLotScreen" component={AddToLotScreen} options={{headerShown: true, title: "Traceability", headerTintColor: '#1f1f1f', headerStyle: {backgroundColor: '#00FF83'}}}/>
          <Stack.Screen name="SuccessfulScreen" component={SuccessfulScreen} options={{headerShown: true, title: "Traceability", headerTintColor: '#1f1f1f', headerStyle: {backgroundColor: '#00FF83'}}}/>
          <Stack.Screen name="QRScreen" component={QRScreen} options={{headerShown: true, title: "Traceability", headerTintColor: '#1f1f1f', headerStyle: {backgroundColor: '#00FF83'}}}/>
          <Stack.Screen name="ScanLotScreen" component={ScanLotScreen} options={{headerShown: true, title: "Traceability", headerTintColor: '#1f1f1f', headerStyle: {backgroundColor: '#00FF83'}}}/>
          <Stack.Screen name="TraceabilityLotScreen" component={TraceabilityLotScreen} options={{headerShown: true, title: "Traceability", headerTintColor: '#1f1f1f', headerStyle: {backgroundColor: '#00FF83'}}}/>
        </Stack.Navigator>
    );
}

const screenHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f2f4f5'
    },
    buttonsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        paddingHorizontal: 40,
        alignContent: 'center',
        height: screenHeight - 140
    },
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 132,
        height: 132,
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
        margin: 12,
        gap: 12
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600'
    }
});
  

export default TraceabilityScreen;