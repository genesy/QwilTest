const Users = {
  user1: {
    password: 'letmein',
    passcode: '123456',
  },
  user2: {
    password: 'blocked',
    passcode: '654321',
    blocked: true,
  },
};

export const login = (username, password) => {
  const user = Users[username];
  if (!user || user.password !== password) {
    return Promise.reject('Invalid credentials. Please check and try again.');
  }

  if (user.blocked) {
    return Promise.reject(
      'Your account has been blocked due to too many failed login attempts.',
    );
  }

  return Promise.resolve('success!');
};

export const verify = (username, passcode) => {
  console.log(username, passcode);
  const user = Users[username];
  if (!user || user.passcode !== passcode) {
    return Promise.reject('Invalid passcode. Please try again');
  }

  return Promise.resolve('success!');
};
