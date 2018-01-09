import {Endpoint} from "../service/Endpoint";
import {AsyncStorage} from "react-native";
import * as R from "ramda";
import {Alert} from "react-native";


class ReportLocalRepository {

    updateLocalStorageWithReports = (reports) =>
        AsyncStorage.setItem("reports", JSON.stringify(reports))
            .catch(error => console.log(error))

    getReportsFromLocalStorage = async () =>
        await AsyncStorage.getItem("reports")

}

export class ReportService {

    constructor() {
        this.localRepository = new ReportLocalRepository()
        this.baseUrl = Endpoint.REPORTS
        this.page = 0
        this.size = 10
    }

    reports = async () => {
        const reports = await this.getAllReportsFromRemoteLocation()
        this.localRepository.updateLocalStorageWithReports(R.clone(reports))
        return reports
    }

    getAllReportsFromRemoteLocation = async () => await this._getResponseAsJsonFrom(
        await this._getResponseFromServer(`?page=${this.page++}&size=${this.size}`, 'GET'))

    insert = async (report) =>
        (await this._getResponseAsJsonFrom(
            await this._getResponseFromServer(``, 'POST', report)))

    remove = async (id) =>
        (await this._getResponseAsJsonFrom(
            await this._getResponseFromServer(`/${id}`, 'DELETE')))

    getById = async (id) =>
        (await this._getResponseAsJsonFrom(
            await this._getResponseFromServer(`/${id}`, 'GET')))

    getAllReportsFromPastWeek = async () =>
        await this._getResponseAsJsonFrom(
            await this._getResponseFromServer(`/latest`, 'GET'))

    __ifRemoteServerUnavailableGetFromLocalStorage = () => {
        Alert.alert("You're offline",
            "Please check your network connection!")
        return this.localRepository.getReportsFromLocalStorage();
    }

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
        }).catch(() => this.__ifRemoteServerUnavailableGetFromLocalStorage())
}