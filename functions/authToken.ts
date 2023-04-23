let apiToken = null;

export const setToken = (token) => {
  apiToken = token;
};

export const getToken = () => {
  return apiToken;
};

export const removeToken = () => {
  apiToken = null;
};