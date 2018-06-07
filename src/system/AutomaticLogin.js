

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

    constructor(store, navigation) {
        this.store = store;
        this.navigation = navigation;
    }
}