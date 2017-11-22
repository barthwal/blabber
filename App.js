/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  View,
  Text
} from 'react-native';

import SplashScreen from './app/components/SplashScreen/SplashScreen';
import SelectLanguage from './app/components/SelectLanguage/SelectLanguage';

export default class App extends Component<{}> {
  
  constructor(props) {
    super(props);

    this.state = {isSplashActive1: "yes", isSplashActive2: "no"};
  }

  componentDidMount() {
    console.log('sadad');
    setTimeout(() => {
      console.log('changed');
      this.setState({isSplashActive1: "no", isSplashActive2: "yes"});
    }, 3000);
  }

  render() {

    return (
      <View style={{backgroundColor: "green", flex: 1}}>
        <SplashScreen display={this.state.isSplashActive1}></SplashScreen>
        <SelectLanguage display={this.state.isSplashActive2}></SelectLanguage>       
      </View>
      
    );
  }
}