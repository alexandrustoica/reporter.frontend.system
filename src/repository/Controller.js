import {OnlineService} from "./OnlineService";
import {Endpoint} from "../service/Endpoint";
import {OfflineService} from "./OfflineService";
import React from "react";
import {ConnectionStatusStore} from "./ConnectionStatus";
import createStore from "redux/es/createStore";
import {ActionType} from "./ReportLocalRepository";
import * as R from "ramda";


class Page {
    constructor(pageIndex, content) {
        this.pageIndex = pageIndex
        this.content = content
    }
}

export class Controller {

    constructor() {
        this.page = 0;
        this.cache = [];
        this.onlineService = new OnlineService(Endpoint.REPORTS)
        this.offlineService = new OfflineService()
        this.connection = new ConnectionStatusStore()
    }

    insert = (item) => this.connection.isOnline() ?
        this.onlineService.insert(item) : this.offlineService.insert(item)

    delete = (id) => this.connection.isOnline() ?
        this.onlineService.remove(id) : this.offlineService.delete(id)

    getById = (id) => this.connection.isOnline() ?
        this.onlineService.getById(id) : this.offlineService.getById(id)

    __convertToPage = (index, content) => new Page(index, content)

    __getAllByPageUntilLastPage = async () => {
        const response = await this.onlineService.getAllByPage(this.page)
        const lastPageRequested = response.result
        this.page += lastPageRequested.last ? 0 : 1
        return ({
            page: this.__convertToPage(this.page, lastPageRequested.content),
            error: response.error
        })
    }

    __saveToCacheIfNeeded = (page) =>
        R.concat(this.cache, R.filter(it => !R.contains(it, this.cache), [page]))

    __savePageToOfflineStorage = (page) =>
        this.offlineService.savePageToLocalRepository(page)


    getAll = async () => {
        const response = await this.__getAllByPageUntilLastPage()
        this.cache = (R.equals(response.error, null)) ?
            this.__saveToCacheIfNeeded(response.page) : this.cache
        return ({
            result: R.flatten(R.map(it => it.content, this.cache)),
            error: response.error
        })
    }

    all = async () => {
        return this.onlineService.getAll()
    }

    getAllFromPastWeek = async () => this.connection.isOnline() ?
        this.onlineService.getAllFromPastWeek() : this.offlineService.getAll()
}