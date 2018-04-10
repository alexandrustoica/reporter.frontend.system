const base = '192.168.0.122'

export const Endpoint = {
    LOGIN: `http://${base}:8080/login`,
    REGISTER: `http://${base}:8080/users/register`,
    REPORTS: `http://${base}:8080/reports`,
    PHOTOS: (id) => `http://${base}:8080/reports/${id}/photos`,
    USERS: `http://${base}:8080/users`,
    WS: `http://${base}:8080/ws/`
}