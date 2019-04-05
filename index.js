import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import React, {Component} from 'react';
import LocationComponent from './app/components/LocationComponent'
import LocationStore from './app/store/LocationStore';
import { Provider } from 'mobx-react';

class App extends Component{
    render(){
        return(
        <Provider store = {LocationStore}>
            <LocationComponent/>
        </Provider>
        )
    }
}

AppRegistry.registerComponent(appName, () => App);
