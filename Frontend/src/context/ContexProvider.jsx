import { createContext, useContext, useState } from "react";
import CryptoJS from "crypto-js";

const StateContext = createContext({
  currentUser: {},
  userToken: null,
  setCurrentUser: () => {},
  setUserToken: () => {},
});

export const ContextProvider = ({ children }) => {

  const encryptUser = (data) => {
    const encryptedUser = CryptoJS.AES.encrypt(JSON.stringify(data),import.meta.env.VITE_ENCRYPT_PASSWORD).toString();
    return encryptedUser;
  }

  const decryptData = (encryptedUser) => {
    if (!encryptedUser) {
      return null;
    }
    const decryptedData = CryptoJS.AES.decrypt(encryptedUser, import.meta.env.VITE_ENCRYPT_PASSWORD).toString(CryptoJS.enc.Utf8);
    return JSON.parse(decryptedData);
  }

  const [currentUser, _setCurrentUser] = useState(decryptData(localStorage.getItem('USER')) || null);
  const [userToken, _setUserToken] = useState(localStorage.getItem('TOKEN') || null);


  const setCurrentUser = (user) => {
    if (user) {
      const sanitizedUser = {
        uuid: user.uuid,
        cpf: user.cpf,
        name: user.name,
      }
      const encryptedUser = encryptUser(sanitizedUser);
      localStorage.setItem('USER', encryptedUser)
      _setCurrentUser(sanitizedUser);
    } else {
      localStorage.removeItem('USER')
      _setCurrentUser({});
    }
  }

  const setUserToken = (token) => {
    if (token) {
      localStorage.setItem('TOKEN', token);
      _setUserToken(token);
    } else {
      localStorage.removeItem('TOKEN');
      _setUserToken(null);
    }
  }

  return (
    <StateContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        userToken,
        setUserToken,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);