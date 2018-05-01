import {SystemAction} from "../src/service/SystemEpicAction";


it('when getting login action expect correct login action', () => {
    const user = {username: "usertest", password: "usertest"}
    const subject = {type: "LOGIN", payload: user}
    const result = SystemAction.login(user)
    expect(result).toEqual(subject)
})
