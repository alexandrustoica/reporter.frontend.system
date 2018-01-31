import {OnlineService} from "./OnlineService";
import {Endpoint} from "../service/Endpoint";
import {NetInfo} from "react-native";
import {OfflineService} from "./OfflineService";

const ConnectionStatus = {
    Offline: 'Offline',
    Online: 'Online'
}

export class Controller {

    constructor() {
        this.onlineService = new OnlineService(Endpoint.REPORTS)
        this.offlineService = new OfflineService()
        this.connectionStatus = ConnectionStatus.Online
        NetInfo.addEventListener('connectionChange', this.updateStatus);
    }

    updateStatus = (status) => {
        this.connectionStatus = (status.type === 'wifi' || status.type === 'cellular') ?
            ConnectionStatus.Online :
            ConnectionStatus.Offline
        if (this.connectionStatus === ConnectionStatus.Online) {
            this.offlineService.sync(this.onlineService)
        }
    }

    insert = (item) => this.connectionStatus === ConnectionStatus.Online ?
        this.onlineService.insert(item) : this.offlineService.insert(item)

    delete = (id) => this.connectionStatus === ConnectionStatus.Online ?
        this.onlineService.remove(id) : this.offlineService.delete(id)

    getById = (id) => this.connectionStatus === ConnectionStatus.Online ?
        this.onlineService.getById(id) : this.offlineService.getById(id)

    getAll = () => this.connectionStatus === ConnectionStatus.Online ?
        this.onlineService.getAll() : this.offlineService.getAll()

    getAllFromPastWeek = async () => this.connectionStatus === ConnectionStatus.Online ?
        this.onlineService.getAllFromPastWeek() : this.offlineService.getAll()
}