import {Response} from "../repository/Response.js";
import {AsyncStorage} from "react-native"
import * as R from "ramda";

export class LocalTask {

    constructor(key, onUpdateLocalStorage) {
        this.key = key
        this.onUpdateLocalStorage = onUpdateLocalStorage
    }

    get = async () => {
        const data = await AsyncStorage.getItem(this.key)
        return R.equals(data, null) ? [] : JSON.parse(data)
    }

    insert = async (item) =>
        await this.store(R.filter(it => !R.equals(it.id, item.id), (await this.get())).concat([item]))

    delete = async (item) =>
        await this.store(R.filter(it => !R.equals(it.id, item.id), (await this.get())))

    store = async (data) => {
        this.onUpdateLocalStorage(data)
        await AsyncStorage.setItem(this.key, JSON.stringify(data))
            .catch(error => new Response(null, error))
    }
}