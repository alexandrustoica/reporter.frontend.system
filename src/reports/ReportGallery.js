import React from "react";
import {Screen} from "../elements/box/screen/Screen";
import {Image, ScrollView, StatusBar, View} from "react-native";
import {NavigationBar} from "../elements/components/NavigationBar";
import {HBox} from "../elements/box/HBox";


export default class ReportGallery extends React.Component {

    static navigationOptions = {header: null};

    constructor(props) {
        super(props)
        this.state = {
            photos: this.props.navigation.state.params.photos
        }
    }

    __renderPhotoFromUser = (photo) =>
        <View style={{width: '100%'}}>
            <Image style={{height: 300}}
                   source={{uri: `data:image/png;base64, ${photo.bytes}`}}/>
        </View>

    render = () =>
        <Screen backgroundColor={'white'}>
            <StatusBar
                backgroundColor="transparent"
                barStyle="dark-content"/>
            <NavigationBar
                text={"Report Gallery"}
                align={'left'}
                leftIcon={{name: 'arrow-back', color: 'black'}}
                leftAction={() => this.props.navigation.goBack()}/>
            <ScrollView style={{height: "100%", width: "100%", flex: 1}}>
                <HBox width={'100%'} style={{flexWrap: 'wrap'}}>
                    {this.state.photos.map(this.__renderPhotoFromUser)}
                </HBox>
            </ScrollView>
        </Screen>
}

