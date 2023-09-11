import AsyncStorage from '@react-native-community/async-storage';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Utils } from '../utils';

const SettingsScreen = ({ navigation }: any) => {
    const [address, setAddress] = React.useState('');

    React.useEffect(() => {
        const load = async () => {
            let privateKey = await AsyncStorage.getItem('privatekey') || '';
            const address = Utils.privateToAddress(privateKey);
            setAddress(address);
        }
        load();
    }, [])

  return (
    <View style={styles.container}>
        <Text>ETH Address :</Text>
        <Text>{address}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f2f4f5'
    }
});
  

export default SettingsScreen;