import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const HomeScreen = ({ navigation }: any) => {
  return (
    <View style={styles.container}>
        <View style={styles.titleContainer}>
            <Text style={styles.title}>Traceability App</Text>
        </View>
        <View style={styles.buttonsContainer}>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('SownScreen')}>
                <Text style={[styles.buttonText, {fontSize: 12}]}>[icono]</Text>
                <Text style={styles.buttonText}>Siembra</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('HarvestScreen')}>
                <Text style={[styles.buttonText, {fontSize: 12}]}>[icono]</Text>
                <Text style={styles.buttonText}>Cosecha</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('StoredScreen')}>
                <Text style={[styles.buttonText, {fontSize: 12}]}>[icono]</Text>
                <Text style={styles.buttonText}>Almacenado</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('LogisticScreen')}>
                <Text style={[styles.buttonText, {fontSize: 12}]}>[icono]</Text>
                <Text style={styles.buttonText}>Logistica</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => {}}>
                <Text style={[styles.buttonText, {fontSize: 12}]}>[icono]</Text>
                <Text style={styles.buttonText}>Ajustes</Text>
            </TouchableOpacity>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f2f4f5'
    },
    titleContainer: {
        flex: 0.2,
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        fontSize: 28,
        color: '#262626',
        fontWeight: '600'
    },
    buttonsContainer: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        paddingHorizontal: 40,
    },
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 120,
        height: 120,
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
        margin: 12
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '400'
    }
});
  

export default HomeScreen;