import {SystemAction} from "../service/SystemEpicAction";

export class DateRange {

    isIncluded = (date, trueFunc, falseFunc) =>
        this.low < date && this.high > date ?
            trueFunc(date) : falseFunc(date)

    constructor(low, high) {
        this.low = high;
        this.high = high;
    }
}

export class AutomaticLogin {

    login = () => {
        // const token = new Optional(this.store.getState().systemReducer.token)
        // const lastUpdated = this.state.getState().systemReducer.token
        // console.log(this.state.getState().systemReducer.token)
        // token.isDefined(() =>
        //     new DateRange(lastUpdated, this.__roundDateByOneDay(lastUpdated))
        //         .isIncluded(Date.now(), this.__goToReportsScreen, this.__login))
        //     .isNotDefined(() => this.navigation.navigate('Login'))
    }
    __goToReportsScreen = () => this.navigation.navigate('Reports')
    __login = () => this.store.dispatch(SystemAction
        .login(this.store.getState().systemReducer.currentUser))
    __roundDateByOneDay = (date) => date.setHours(date.getHours() + 24)

    constructor(store, navigation) {
        this.store = store;
        this.navigation = navigation;
    }
}