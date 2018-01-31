import {Endpoint} from "../service/Endpoint";

export class WebSocketTask {

    constructor(onMessage, onError, onOpen, onClose) {
        this.websocket = new WebSocket(Endpoint.WEB_SOCKET)
        this.websocket.onopen = onOpen
        this.websocket.onmessage = async (message) => await onMessage(JSON.parse(message.data));
        this.websocket.onerror = onError
        this.websocket.onclose = onClose
    }
}