import AsyncStorage from "@react-native-async-storage/async-storage";
import { useContext } from "react";
import UserContext from "./Context/UserContext";

export const checkPassword = (password) => {
    const regExp = /^.*(?=^.{8,}$)(?=.*\d)(?=.*[a-zA-Z]).*$/;

    if (!password.match(regExp)) {
        return false;
    } else {
        return true;
    }
};

export const setLogin = async (token, userId, userInfo) => {
    const { info, setInfo } = useContext(UserContext);
    setInfo(userInfo);
    await AsyncStorage.setItem("token", token);
    await AsyncStorage.setItem("userId", userId + "");
};

export const setLogout = async () => {
    const { info, setInfo } = useContext(UserContext);
    const { setIsLoggedIn } = useContext(IsLoggedInContext);
    setInfo(null);
    await AsyncStorage.removeItem("token");
    await AsyncStorage.removeItem("userId");
    setIsLoggedIn(false);
};
