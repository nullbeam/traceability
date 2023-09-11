import React from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const TraceabilityScreen = ({ navigation }: any) => {
  return (
    <View style={styles.container}>
        <View style={styles.buttonsContainer}>
            <TouchableOpacity style={styles.button} onPress={() => /*navigation.navigate('SownScreen')*/ console.log(1)}>
                <Icon size={52} name={'plus-circle'} style={{color: '#fff'}}/>
                <Text style={styles.buttonText}>New Lot</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => console.log(2)}>
                <Icon size={52} name={'qrcode'} style={{color: '#fff'}}/>
                <Text style={styles.buttonText}>Scan Lot</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => console.log(3)}>
                <Icon size={52} name={'search'} style={{color: '#fff'}}/>
                <Text style={styles.buttonText}>Search Lot</Text>
            </TouchableOpacity>
        </View>
    </View>
  );
}

const screenWidth = Dimensions.get('window').width;
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