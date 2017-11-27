import {AsyncStorage} from "react-native";

export class LoginService {

	constructor(navigation) {
		this.navigation = navigation;
		this.endpoint = 'http://192.168.0.32:8090/login'
	}

	login = (username, password) => fetch(this.endpoint, {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			username: username,
			password: password,
		})
	})
		.then((response) => response.headers.get("authorization"))
		.then((token) => AsyncStorage.setItem('authorization', token))
		.then(() => this.navigation.navigate('Tasks'));
}