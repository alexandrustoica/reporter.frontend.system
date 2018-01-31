
const MY_IP = '192.168.0.31:3000'

export const Endpoint = {
	LOGIN: 'http://192.168.0.31:8080/login',
	REGISTER_CONSUMER: 'http://192.168.0.31:8080/users/register',
	REPORTS: 'http://192.168.0.31:8080/tasks',

    WEB_SOCKET: `ws://${MY_IP}`,
    UPDATE_TASK: (value) => `http://${MY_IP}/task/${value}`,
	LAST_UPDATED_TASKS: (value) => `http://${MY_IP}/task?lastUpdated=${value}`,
}