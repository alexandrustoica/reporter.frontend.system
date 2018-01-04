import {Endpoint} from "../service/Endpoint";
import {Alert} from "react-native";

export class LoginService {

	constructor() {
		this.endpoint = Endpoint.LOGIN
	}

	alert = (message) => Alert.alert("Unable to login ...", message)

	login = async (username, password) => await fetch(this.endpoint, {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({username: username, password: password,})
	}).then((response) => response.headers.get("authorization"))
		.catch((error) => alert(error.message))
}