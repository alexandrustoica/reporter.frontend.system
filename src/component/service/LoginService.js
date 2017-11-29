import {AsyncStorage} from "react-native";
import {Endpoint} from "./Endpoint";
import {Alert} from "react-native";


export class LoginService {

	constructor(navigation) {
		this.navigation = navigation
		this.endpoint = Endpoint.LOGIN
	}

	alert = (message) => Alert.alert("Unable to login ...", message)

	login = (username, password) => fetch(this.endpoint, {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			username: username,
			password: password,
		})})
		.then((response) => response.status === 401 ?
			this.alert("The username or password is incorrect!"): response)
		.then((response) => response.headers.get("authorization"))
		.then((token) => AsyncStorage.setItem('authorization', token))
		.then(() => this.navigation.navigate('Jobs'))
}