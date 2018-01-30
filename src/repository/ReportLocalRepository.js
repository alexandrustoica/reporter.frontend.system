import {AsyncStorage} from "react-native";

export class ReportLocalRepository {

    updateLocalStorageWithReports = (reports) =>
        AsyncStorage.setItem("reports", JSON.stringify(reports))
            .catch(error => console.log(error))

    getReportsFromLocalStorage = async () =>
        await AsyncStorage.getItem("reports")
}