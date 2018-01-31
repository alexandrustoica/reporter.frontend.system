import {RemoteTask} from "./RemoteTask";
import {Endpoint} from "../service/Endpoint";
import * as R from "ramda";
import {LocalTask} from "./LocalTask";
import {WebSocketTask} from "./WebSocketTask";

class DataFromTaskModel {
    constructor(id, text, status, updated) {
        this.id = id
        this.text = text
        this.status = status
        this.updated = updated
    }
}


export class TaskController {
    constructor() {
        this.websocket = new WebSocketTask(this.onMessageFromRemoteServer)
        this.local = new LocalTask('data', this.notifyListenersAboutLocalChange)
        this.localListeners = []
    }

    connectToLocalStorage = (listener) => this.localListeners.push(listener)

    notifyListenersAboutLocalChange = (data) => {
        R.forEach(it => it(data), this.localListeners)
    }

    onMessageFromRemoteServer = async (message) => {
        if (R.equals(message.event, "inserted")) {
            await this.local.insert(this.__adapt(message.task))
        }
        if (R.equals(message.event, "deleted")) {
            await this.local.delete(this.__adapt(message.task))
        }
    }

    updateDataFromRemoteLocation = () =>
        this.getAllFromRemoteLocation().then(data => this.local.store(data))


    getAllFromRemoteLocation = async () =>
        R.map(this.__adapt, (await
            new RemoteTask(Endpoint.LAST_UPDATED_TASKS((await this.getAllFromLocalStorage()).length), 'GET').execute()).result)

    filterAllFromRemoteLocation = async (filter) =>
        R.filter(filter, (await this.getAllFromRemoteLocation()))

    getAllFromLocalStorage = async () => await this.local.get()

    filterAllFromLocalStorage = async (filter) =>
        R.filter(filter, (await this.getAllFromLocalStorage()))

    __adapt = (item) => new DataFromTaskModel(
        item.id, item.text, item.status, item.updated
    )
}