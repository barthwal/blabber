/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
} from 'react-native';

import LandingScreen from './app/components/LandingScreen/LandingScreen';
import SplashScreen from './app/components/SplashScreen/SplashScreen';
import SelectLanguage from './app/components/SelectLanguage/SelectLanguage';
import Exp from './app/components/Exp/Exp';

export default class App extends Component<{}> {
  
  constructor(props) {
    super(props);
  }

  componentDidMount() {

  }

  render() {

    return (
      <SelectLanguage></SelectLanguage>
    );
  }
}