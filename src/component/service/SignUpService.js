import {LoginService} from "./LoginService";

export class SignUpService {

	constructor(navigation) {
		this.navigation = navigation;
		this.errorAccumulator = [];
		this.endpoint = "http://192.168.0.32:8090/user/register";
	}

	signUp = (username, password, confirmPassword, email) =>
		password !== confirmPassword ?
			this.errorAccumulator.concat(["Not the same password!"]) :
			fetch(this.endpoint, {
				method: 'POST',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					username: username,
					password: password,
					email: email,
				})
			}).catch((error) => this.errorAccumulator.concat([error]))
				.then((response) => new LoginService(this.navigation).login(username, password))
}