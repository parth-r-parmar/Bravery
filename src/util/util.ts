interface UserData {
  token: string;
}

export const setUserData = (data: UserData) => {
  if (data.token) localStorage.setItem("loginSession", JSON.stringify(data.token));
};

export const getUserData = () => {
  const info = localStorage.getItem("loginSession");
  return info ? JSON.parse(info) : null;
};

export const deleteUserData = () => {
  localStorage.removeItem("loginSession");
};

export const isAuthenticated = () => !!getUserData();
