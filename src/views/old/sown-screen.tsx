import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Jazzicon from 'react-native-jazzicon'
import moment from "moment";
import { ScrollView } from 'react-native';
import { FAB } from '@rneui/themed';

const SownScreen = ({ navigation }: any) => {
    const list = [1,2,3,4,5,6,7,8,10]  
    return (
        <View style={styles.container}>
            <ScrollView>
            {
                list.map((item, i) => (
                    <TouchableOpacity key={i} style={styles.button}>
                        <View style={{flex: 0.25}}>
                            <Jazzicon size={50} seed={Math.round(Math.random() * 10000000)} />
                        </View>
                        <View style={{flex: 1}}>
                            <Text style={styles.buttonText} numberOfLines={1} ellipsizeMode='middle'>Transaccion: 0xb5d5c0d45123017d4e6e7a35c35a22180a58798b72a341a52b39e75e6054285c</Text>
                            <Text style={styles.buttonText}>Fecha: {moment().format('DD/MM/YYYY')}</Text>
                        </View>
                    </TouchableOpacity>
                ))
            }
            </ScrollView>
            <FAB
                visible={true}
                icon={{ name: 'add', color: '#000' }}
                color='#18c460'
                placement="right"
                onPress={() => navigation.navigate('SownFormScreen')}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
      backgroundColor: '#f2f4f5',
      paddingVertical: 6,
      paddingHorizontal: 6,
      position: 'relative'
    },
    button: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 10,
        backgroundColor: '#fff',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
        margin: 6,
        paddingHorizontal: 16,
        paddingVertical: 16
    },
    buttonText: {
        color: '#000',
        fontSize: 12,
        fontWeight: '400',
        lineHeight: 20
    }
});

export default SownScreen;