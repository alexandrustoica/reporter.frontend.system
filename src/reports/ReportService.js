import {Endpoint} from "../service/Endpoint";
import {AsyncStorage} from "react-native";

export class ReportService {

	constructor() {
		this.baseUrl = Endpoint.REPORTS
		this.page = 0
		this.size = 10
	}

	reports = async () => (await this._getResponseAsJsonFrom(
		await this._getResponseFromServer(`?page=${this.page++}&size=${this.size}`, 'GET')))

	insert = async (report) =>
		(await this._getResponseAsJsonFrom(
			await this._getResponseFromServer(``, 'POST', report)))

	remove = async (id) =>
		(await this._getResponseAsJsonFrom(
			await this._getResponseFromServer(`/${id}`, 'DELETE')))

	getById = async (id) =>
		(await this._getResponseAsJsonFrom(
			await this._getResponseFromServer(`/${id}`, 'GET')))

	_getResponseAsJsonFrom = async (response) => await response.json()

	_getTokenFromDatabase = async () => await AsyncStorage.getItem('token')

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