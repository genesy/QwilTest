import USERS from './usersdata';

const INVALID_CREDENTIALS_MESSAGE =
  'Invalid credentials. Please check and try again.';
const BLOCKED_USER_MESSAGE =
  'Your account has been blocked due to too many failed login attempts.';

describe('Login', () => {
  let usernameInput;
  let passwordInput;
  let errorComponent;
  let loginButton;

  const isInLoginScreen = async () => {
    await expect(usernameInput).toExist();
    await expect(passwordInput).toExist();
    await expect(loginButton).toExist();
  };

  const shouldShowErrorMessage = async errorMessage => {
    await expect(errorComponent).toBeVisible();
    await expect(errorComponent).toHaveText(errorMessage);
  };

  const attemptLoginUser = async (username, password) => {
    await usernameInput.replaceText(username);
    await passwordInput.replaceText(password);
    await loginButton.tap();
  };
  beforeEach(async () => {
    await device.reloadReactNative();
    usernameInput = element(by.id('username-input'));
    passwordInput = element(by.id('password-input'));
    errorComponent = element(by.id('error'));
    loginButton = element(by.id('login-btn'));
    await isInLoginScreen();
  });

  it('should show error message for wrong username and correct password', async () => {
    await attemptLoginUser('incorrectUsername', USERS.user1.password);
    await shouldShowErrorMessage(INVALID_CREDENTIALS_MESSAGE);
  });

  it('should show error message for correct username and wrong password', async () => {
    const user = 'user1';
    await attemptLoginUser(user, 'incorrectPassword');
    await shouldShowErrorMessage(INVALID_CREDENTIALS_MESSAGE);
  });

  it('should show error message for blocked user', async () => {
    const user = 'user2';
    await attemptLoginUser(user, USERS[user].password);
    await shouldShowErrorMessage(BLOCKED_USER_MESSAGE);
  });

  it('should disable login if no password in textfield', async () => {
    const user = 'user1';
    const isDisabledChecker = element(by.id('login-btn-isDisabled'));
    await usernameInput.replaceText(user);
    await passwordInput.replaceText('password');
    await expect(isDisabledChecker).toNotExist();
    await passwordInput.replaceText('');
    await expect(isDisabledChecker).toExist();
  });

  it('should successfully login and move to next screen', async () => {
    const user = 'user1';
    await expect(element(by.id('verification-code-title'))).toBeNotVisible();
    await attemptLoginUser(user, USERS[user].password);
    await expect(element(by.id('verification-code-title'))).toBeVisible();
  });
});
