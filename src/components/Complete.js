import React from 'react';
import {SafeAreaView, StatusBar, StyleSheet, Text, View} from 'react-native';

import {Colors} from '../tokens';

const Complete = () => (
  <View style={styles.container}>
    <StatusBar barStyle="dark-content" />
    <SafeAreaView />
    <View>
      <Text style={styles.successMsg} testID="login-success">
        Logged in successfully
      </Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: Colors.backgroundColor,
    flex: 1,
    justifyContent: 'center',
  },
  successMsg: {
    alignSelf: 'center',
    color: 'white',
    fontSize: 32,
  },
});

export default Complete;
