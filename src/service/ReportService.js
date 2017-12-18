import {Endpoint} from "./Endpoint";
import {AsyncStorage} from "react-native";

export class ReportService {

	constructor() {
		this.baseUrl = Endpoint.REPORTS
		this.page = 0
		this.size = 6
	}

	reports = async () => (await this._getResponseAsJsonFrom(
		await this._getResponseFromServer(`?page=${this.page++}&size=${this.size}`, 'GET'))).content

	insert = async (report) =>
		(await this._getResponseAsJsonFrom(await this._getResponseFromServer(``, 'POST', report)))

	_getResponseAsJsonFrom = async (response) => await response.json()

	_getTokenFromDatabase = async () => await AsyncStorage.getItem('authorization')

	_getResponseFromServer = async (specificUrl, method, body) =>
		await fetch(this.baseUrl + specificUrl, {
			method: method,
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				'Authorization': await this._getTokenFromDatabase()
			},
			body: JSON.stringify(body)
		})
}