import {ActionType, LocalRepository} from "./ReportLocalRepository";
import * as R from "ramda";

export class OfflineService {

    constructor(databaseKey, historyKey) {
        this.repository = new LocalRepository(databaseKey);
        this.history = new LocalRepository(historyKey);
        //this.__resetHistory()
        //this.__resetLocalRepository()
    }

    insert = async (item) => {
        await this.__insertIntoHistory({type: ActionType.INSERT, data: item})
        return await this.repository.updateLocalStorageWithData((
            await this.getAll()).concat([item]))
    }

    delete = async (id) => {
        await this.__insertIntoHistory({type: ActionType.DELETE, data: id})
        return await this.repository.updateLocalStorageWithData(
            R.filter(it => it.id !== id, (await this.getAll())))
    }

    getById = async (id) => {
        return R.findLast(it => it.id === id,
            (await this.repository.getDataFromLocalStorage()))
    }

    __insertIntoHistory = async (action) => this.history
        .updateLocalStorageWithData((await this.actions()).concat([action]))

    __resetHistory = () => this.history.updateLocalStorageWithData([])

    __resetLocalRepository = () => this.repository.updateLocalStorageWithData([])

    __syncWithAction = (action, onlineService) =>
        action.type === ActionType.INSERT ?
            onlineService.insert(action.data) :
            onlineService.remove(action.data)

    sync = async (onlineService) => {
        R.forEach(it => this.__syncWithAction(it, onlineService),
            (await this.actions()));
        // this.__resetLocalRepository()
        this.__resetHistory()
    }

    actions = async () => await this.history.getDataFromLocalStorage()
    getAll = async () => await this.repository.getDataFromLocalStorage()

    getAllByPage = async (page) =>
        R.findLast(it => R.equals(it.pageIndex, page),
            (await this.repository.getDataFromLocalStorage()))

    savePageToLocalRepository = async (page) =>
        R.concat(R.filter(it => !R.equals(it.pageIndex, page.pageIndex),
            (await this.repository.getDataFromLocalStorage())), page)
}
