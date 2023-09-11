import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const ProfileScreen = ({ navigation }: any) => {
  return (
    <View style={styles.container}>
        <Text>Profile Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f2f4f5'
    }
});
  

export default ProfileScreen;