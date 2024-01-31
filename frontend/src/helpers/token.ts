import Cookies from "js-cookie";

export const setToken = (token: string) => {
  Cookies.set("accessToken", token);
};

export const deleteToken = () => {
  Cookies.remove("accessToken");
};

export const getToken = () => {
  Cookies.get("accessToken");
};
