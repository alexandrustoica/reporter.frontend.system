import {AsyncStorage} from 'react-native'
import {Response} from "./Response";

export class OnlineService {

    constructor(endpoint) {
        this.baseUrl = endpoint
        this.page = 0
        this.size = 10
    }

    __getAllWithLastPageLimit = async () => {
        const data = await this._getResponseFromServer(`?page=${this.page++}&size=${this.size}`, 'GET')
        data.result.length < this.size && this.page !== 0 ? this.page-- : this.page
        return data;
    }

    getAllByPage = async(page) =>
        await this._getResponseFromServer(`?page=${page}&size=${this.size}`, 'GET')

    getAll = async () => await this.__getAllWithLastPageLimit()

    insert = async (item) =>
            await this._getResponseFromServer(``, 'POST', item)

    remove = async (id) =>
          await this._getResponseFromServer(`/${id}`, 'DELETE')

    getById = async (id) =>
        await this._getResponseFromServer(`/${id}`, 'GET')

    getAllFromPastWeek = async () =>
        await  this._getResponseFromServer(`/latest`, 'GET')

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
        }).then(async (response) => new Response((await response.json()), null))
            .catch((error) => new Response(null, error))
}