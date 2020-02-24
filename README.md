# Qwil Messenger mobile testing recruitment test

👋 thanks for applying to Qwil.

This repo comprises a simple react native application with a two-step login process. We'd like you to implement the following test cases using Detox in the `e2e` folder which contains files for the login and verify pages. We have added the basic configuration to run Detox over the iOS simulator.

## Test cases

1. Unsuccessful login (incorrect username):

   - Enter incorrect username
   - Enter correct password
   - Tap Login  
     Expect: Error message is displayed.

2. Unsuccessful login (incorrect password)

   - Enter correct username
   - Enter incorrect password
   - Tap Login  
     Expect: Error message is displayed.

3. Unsuccessful login (blocked user)

   - Enter correct username
   - Enter correct password
   - Tap Login  
     Expect: Error message for blocked account

4. Login disabled

   - Enter correct username  
     Expect: Login is not tappable

5. Successful login

   - Enter correct username
   - Enter correct password
   - Tap Login  
     Expect: App navigates to the 'Verify' screen

6. Incorrect verification code gives an error

   - Navigate to the Verify screen
   - Enter incorrect passcode
   - Tap Verify  
     Expect: Error message is displayed

7. Correct verification code
   - Navigate to the Verify screen
   - Enter correct passcode
   - Tap Verify  
     Expect: App navigates to the 'Success' screen

## Starting the app

To start the app:

If using [yarn](https://yarnpkg.com/) (preferred)

```
yarn
yarn ios
```

If using npm

```
npm install
npm run ios
```
