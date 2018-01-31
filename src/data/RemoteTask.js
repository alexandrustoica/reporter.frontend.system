import {Response} from "../repository/Response.js";

export class RemoteTask {

    constructor(endpoint, type, body) {
        this.endpoint = endpoint
        this.type = type
        this.body = body
    }

    execute = async () =>
        await this._getResponseFromServer(this.endpoint, this.type, this.body)

    _getResponseFromServer = async (endpoint, type, body) =>
        await fetch(endpoint, {
            method: type,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)
        }).then(async (response) => new Response((await response.json()), null))
            .catch((error) => new Response(null, error))
}