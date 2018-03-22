import {LoginService} from "./LoginService";
import {Endpoint} from "./Endpoint";
import {Alert, Keyboard} from "react-native";

export class RegisterService {

	constructor(navigation) {
		this.navigation = navigation;
		this.endpoint = Endpoint.REGISTER;
	}

	signUp = (username, password, confirmPassword, email, name) =>
		fetch(this.endpoint, {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				username: username,
				password: password,
				confirmPassword: confirmPassword,
				email: email,
				name: name
			})
		}).then((response) => response.status === 200 ?
				new LoginService(this.navigation).login(username, password) :
			Alert.alert("Unable to register...", ":("))
}