import {successfulLogin} from './helper';
import USERS from './usersdata';

const INVALID_PASSCODE_MSG = 'Invalid passcode. Please try again';
describe('Verify', () => {
  let title;
  let passcodeInput;
  let errorComponent;
  let submitButton;
  const userUsedToLogin = 'user1';
  beforeEach(async () => {
    await device.reloadReactNative();
    await successfulLogin(userUsedToLogin);
    passcodeInput = element(by.id('passcode-input'));
    title = element(by.id('verification-code-title'));
    errorComponent = element(by.id('verification-error'));
    submitButton = element(by.id('verify-btn'));
    await expect(title).toBeVisible();
  });

  it('should show error on incorrect verification code', async () => {
    await expect(errorComponent).toHaveText('');
    await passcodeInput.replaceText('023451');
    await submitButton.tap();
    await expect(errorComponent).toHaveText(INVALID_PASSCODE_MSG);
  });

  it('should successfully login and show next screen', async () => {
    await passcodeInput.replaceText(USERS[userUsedToLogin].passcode);
    await submitButton.tap();
    await expect(element(by.id('login-success'))).toBeVisible();
  });
});
