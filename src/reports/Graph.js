import React from "react";
import {ReportService} from "../service/ReportService";
import {Box} from "../box/Box";
import {IconType} from "../icon/IconType";
import {Screen} from "../screen/Screen";
import {Text} from "react-native";
import {Bar} from "react-native-pathjs-charts";
import * as R from "ramda";
import moment from "moment/moment";
import {Colors} from "../color/Colors";
import {NavigationBar} from "../components/NavigationBar";
import {SystemIcon} from "../icon/SystemIcon";

export default class Graph extends React.Component {

    static navigationOptions = {
        header: null,
        drawerIcon: ({ tintColor }) => (
            <SystemIcon url={IconType.STATS_ICON}/>
        )
    };

    constructor(props) {
        super(props)
        this.state = {
            service: new ReportService(),
            graphData: [[{"v": 49}]],
        }
    }

    componentDidMount = async () => {
        this.setState({
            graphData: [this.__getGraphDataFromReports(
                await this.state.service.getAllReportsFromPastWeek())]
        })
    }

    __getGraphDataFromReports = (reports) =>
        R.map((reports) => {return {"v": reports.length}},
            R.groupWith((report) => moment(report.date).format('dddd'))(reports))

    options = {
        width: 50,
        margin: {
            top: 10,
            left: 40,
            bottom: 40,
            right: 40
        },
        color: Colors.BLUE,
        gutter: 40,
        animate: {
            type: 'oneByOne',
            duration: 200,
            fillTransition: 3
        },
        axisX: {
            showAxis: true,
            showLines: true,
            showLabels: true,
            showTicks: true,
            zeroAxis: false,
            orient: 'bottom',
            label: {
                fontFamily: 'Arial',
                fontSize: 8,
                fontWeight: true,
                fill: '#34495E'
            }
        },
        axisY: {
            showAxis: true,
            showLines: true,
            showLabels: true,
            showTicks: true,
            zeroAxis: false,
            orient: 'left',
            label: {
                fontFamily: 'Arial',
                fontSize: 14,
                fontWeight: true,
                fill: '#34495E'
            }
        }
    }
    render = () =>
        <Screen backgroundColor={'white'}>
            <NavigationBar
                text={"Reports Stats"}
                leftIcon={IconType.BACK_DARK}
                leftAction={() => this.props.navigation.goBack()}/>
            <Box flexDirection={'column'} style={{margin: 20}}>
                <Text style={{fontSize: 30, fontWeight: 'bold'}}>
                    {"Number of reports send this week ..."}
                </Text>
            </Box>
            <Bar data={this.state.graphData} options={this.options} accessorKey='v'/>
        </Screen>
}

