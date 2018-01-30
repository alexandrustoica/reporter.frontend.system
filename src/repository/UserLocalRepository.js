import {AsyncStorage} from "react-native";

export class UserLocalRepository {

    login = (token) => AsyncStorage.setItem('token', token);
    getToken = async () => await AsyncStorage.getItem('token');
    logout = () => AsyncStorage.removeItem('token')
}