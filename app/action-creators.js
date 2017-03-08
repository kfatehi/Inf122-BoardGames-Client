export const connect = (url) => {
  return { type: 'SET_SERVER', url };
};

export const login = () => {
  return { type: 'LOGIN' };
};
