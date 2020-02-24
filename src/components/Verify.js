import React from 'react';
import {
  Button,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {Formik} from 'formik';

import {verify} from '../auth';
import {Colors, spacing} from '../tokens';

const Verify = ({navigation, route}) => (
  <View style={styles.container}>
    <StatusBar barStyle="dark-content" />
    <SafeAreaView />
    <View style={styles.form}>
      <Text style={styles.title} testID="verification-code-title">
        Verify
      </Text>
      <Text style={styles.description} testID="verification-code-description">
        We have sent a verification code to your mobile. Please enter it here to
        confirm your log in
      </Text>
      <Formik
        initialValues={{passcode: '', error: ''}}
        onSubmit={() => navigation.navigate('Complete')}
        validateOnBlur={false}
        validateOnChange={false}
        validate={values => {
          return verify(route.params.username, values.passcode).then(
            () => {
              return {};
            },
            err => {
              return {error: err};
            },
          );
        }}>
        {({handleChange, handleBlur, handleSubmit, values, errors}) => (
          <View>
            <TextInput
              autoCapitalize="none"
              autoFocus
              keyboardType="numeric"
              onBlur={handleBlur('passcode')}
              onChangeText={handleChange('passcode')}
              placeholder="Passcode"
              style={styles.textInput}
              testID="passcode-input"
              value={values.passcode}
            />
            <Text testID="verification-error" style={styles.error}>
              {errors.error}
            </Text>
            <Button
              disabled={!values.passcode}
              onPress={handleSubmit}
              style={styles.loginBtn}
              testID="verify-btn"
              title="Verify"
            />
          </View>
        )}
      </Formik>
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
  error: {
    color: Colors.errorColor,
  },
  form: {
    backgroundColor: Colors.formBackgroundColor,
    borderRadius: spacing.s,
    padding: spacing.m,
    width: '80%',
  },
  description: {
    alignSelf: 'center',
    marginVertical: spacing.s,
  },
  textInput: {
    borderColor: Colors.borderColor,
    borderWidth: 1,
    borderRadius: spacing.xxs,
    paddingLeft: spacing.xxs,
    height: 40,
    marginBottom: spacing.s,
  },
  title: {
    fontSize: 20,
    alignSelf: 'center',
  },
});

export default Verify;
