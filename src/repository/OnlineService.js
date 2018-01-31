import {AsyncStorage} from 'react-native'


export class OnlineService {

    constructor(endpoint) {
        // TODO: Try To Change Mutable Data Here
        this.baseUrl = endpoint
        this.page = 0
        this.size = 10
    }

    __getAllWithLastPageLimit = async () => {
        const data = await this._getResponseAsJsonFrom(
            await this._getResponseFromServer(`?page=${this.page++}&size=${this.size}`, 'GET'))
        data.length < this.size && this.page !== 0 ? this.page-- : this.page
        console.log(data)
        console.log(this.page)
        return data;
    }

    getAll = async () => await this.__getAllWithLastPageLimit()

    insert = async (item) =>
        (await this._getResponseAsJsonFrom(
            await this._getResponseFromServer(``, 'POST', item)))

    remove = async (id) =>
        (await this._getResponseAsJsonFrom(
            await this._getResponseFromServer(`/${id}`, 'DELETE')))

    getById = async (id) =>
        (await this._getResponseAsJsonFrom(
            await this._getResponseFromServer(`/${id}`, 'GET')))

    getAllFromPastWeek = async () =>
        await this._getResponseAsJsonFrom(
            await this._getResponseFromServer(`/latest`, 'GET'))

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
        }).catch((error) => console.log(error))
}