import AsyncStorage from '@react-native-community/async-storage';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Utils } from '../utils';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Clipboard from '@react-native-community/clipboard';
import Toast from 'react-native-root-toast';
import { EthCore } from '../services/eth-core';

const SettingsScreen = ({ navigation }: any) => {
    const [address, setAddress] = React.useState('');
    const [balance, setBalance] = React.useState('');

    const writeToClipboard = async () => {
      await Clipboard.setString(address);
      Toast.show("Copied to clipboard", {
          duration: Toast.durations.SHORT,
          position: Toast.positions.BOTTOM,
      });
    }

    React.useEffect(() => {
        const load = async () => {
            let privateKey = await AsyncStorage.getItem('privatekey') || '';
            const address = Utils.privateToAddress(privateKey);
            setAddress(address);

            const ethereum = new EthCore({
                host: 'https://polygon-mumbai-bor.publicnode.com',
                privateKey,
                options: {
                    chainId: 80001,
                    gasPrice: 9500000000,
                    gasLimitMultiplier: 2
                }
            });
            var balance = await ethereum.web3Instance.eth.getBalance(address);
            setBalance(ethereum.web3Instance.utils.fromWei(balance, 'ether'));
        }
        load();
    }, [])

  return (
    <View style={styles.container}>
      <View style={styles.bodyRaw}>
        <Text style={{color: '#1f1f1f'}}>ETH Address:</Text>
        <Text style={{flex: 1, color: '#1f1f1f'}} numberOfLines={1} ellipsizeMode='middle'>{address}</Text>
        <TouchableOpacity onPress={writeToClipboard}>
          <Icon size={20} name="content-copy" color={'#1f1f1f'}/>
        </TouchableOpacity>
      </View>
      <View style={styles.bodyRaw}>
        <Text style={{color: '#1f1f1f'}}>Your Mumbai balance:</Text>
        <Text style={{flex: 1, color: '#1f1f1f'}}>{balance}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f2f4f5',
      padding: 20,
      gap: 8
    },
    bodyRaw: {
      backgroundColor: '#f2f4f5',
      gap: 20,
      flexDirection: 'row'
    }
});
  

export default SettingsScreen;