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

import {login} from '../auth';
import {Colors, spacing} from '../tokens';

const LoginForm = ({navigation}) => (
  <View style={styles.container}>
    <StatusBar barStyle="dark-content" />
    <SafeAreaView />
    <View style={styles.form}>
      <Text style={styles.title}>Sign in</Text>
      <Text style={styles.description}>Please enter your credentials</Text>
      <Formik
        initialValues={{username: '', password: '', error: ''}}
        onSubmit={values =>
          navigation.navigate('Verify', {username: values.username})
        }
        validateOnBlur={false}
        validateOnChange={false}
        validate={values => {
          return login(values.username, values.password).then(
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
              autoCompleteType="username"
              onBlur={handleBlur('username')}
              onChangeText={handleChange('username')}
              placeholder="Username"
              style={styles.textInput}
              testID="username-input"
              value={values.username}
            />
            <TextInput
              autoCompleteType="password"
              onBlur={handleBlur('password')}
              onChangeText={handleChange('password')}
              placeholder="Password"
              secureTextEntry
              style={styles.textInput}
              testID="password-input"
              value={values.password}
            />
            <Text testID="error" style={styles.error}>
              {errors.error}
            </Text>
            <Button
              disabled={!values.password || !values.username}
              onPress={handleSubmit}
              style={styles.loginBtn}
              testID="login-btn"
              title="Login"
            />
            {/* Had to add this because i have no other way to test if button is actually disabled */}
            {(!values.password || !values.username) && (
              <View testID="login-btn-isDisabled" />
            )}
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
  successMsg: {
    fontSize: 32,
    color: 'white',
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

export default LoginForm;
