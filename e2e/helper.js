import USERS from './usersdata';

let usernameInput;
let passwordInput;
let errorComponent;

export const isInLoginScreen = async () => {
  await expect(usernameInput).toExist();
  await expect(passwordInput).toExist();
  await expect(loginButton).toExist();
};

export const isInVerifyScreen = async () => {
  await expect(element(by.id('verification-code-title'))).toBeVisible();
};

export const successfulLogin = async username => {
  usernameInput = element(by.id('username-input'));
  passwordInput = element(by.id('password-input'));
  errorComponent = element(by.id('error'));
  loginButton = element(by.id('login-btn'));
  await isInLoginScreen();
  await usernameInput.replaceText(username);
  await passwordInput.replaceText(USERS[username].password);
  await loginButton.tap();
  await isInVerifyScreen();
};
