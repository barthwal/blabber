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

export default class App extends Component<{}> {
  
  constructor(props) {
    super(props);
  }

  componentDidMount() {

  }

  render() {

    return (
      <SplashScreen></SplashScreen>
    );
  }
}