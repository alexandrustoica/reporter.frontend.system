import {AsyncStorage} from "react-native";

export const ActionType = {
    INSERT: 'INSERT',
    DELETE: 'DELETE',
    GET_BY_ID: 'GET_BY_ID',
    GET_ALL: 'GET_ALL',
    GET_ALL_BY_PAGE: 'GET_ALL_BY_PAGE'
}

export class ReportLocalRepository {

    updateLocalStorageWithReports = async (reports) => {
        await AsyncStorage.setItem("tasks", JSON.stringify(reports))
            .catch(error => console.log(error))
        return this.getReportsFromLocalStorage()
    }

    getReportsFromLocalStorage = async () =>
        await AsyncStorage.getItem("tasks")
}

export class LocalRepository {

    constructor(key) {
        this.key = key
    }

    updateLocalStorageWithData = (data) =>
        AsyncStorage.setItem(this.key, JSON.stringify(data))
            .catch(error => console.log(error))

    getDataFromLocalStorage = async () => {
        const data = await AsyncStorage.getItem(this.key)
        return data === null ? [] : JSON.parse(data)
    }
}

