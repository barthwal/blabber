/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Button,
  Picker,
  Text,
  FlatList,
  TouchableOpacity,
  Spinner,
  View
} from 'react-native';

import Voice from 'react-native-voice';
import Tts from 'react-native-tts';

const languageList = [{"key": "en", "value": "English"}, {"key": "hi", "value": "Hindi"}, {"key": "bn", "value": "Bengali"}, {"key": "bh", "value": "Bihari"}, {"key": "zh", "value": "Chinese"}, {"key": "fr", "value": "French"}, {"key": "ks", "value": "Kashmiri"}, {"key": "ur", "value": "Urdu"}];


const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

export default class landingScreen extends Component<{}> {
  
  constructor(props) {
    super(props);

    this.state = {language : 'en', voiceData: ['hello', 'hello world','hello', 'hello world', 'pick you'], butonText: 'Listen my voice', showLoader: false};
  }

  componentDidMount() {
    console.log('componentDidMount');



    Voice.onSpeechStart = this.onSpeechStartHandler.bind(this);
    Voice.onSpeechEnd = this.onSpeechEndHandler.bind(this);
    Voice.onSpeechResults = this.onSpeechResultsHandler.bind(this);


    console.log('data: ', this.state.voiceData);


  }

  onStartButtonPress() {
    let available = Voice.isAvailable();
    if(available){
      console.log('Voice available: ', available);
      Voice.start(this.state.language);

      this.setState({voiceData: [], butonText: 'Listining...', showLoader: true});
    }
  }

  onSpeechStartHandler (e) {
    console.log("onSpeechStartHandler: ", e);
  }

  onSpeechEndHandler (e) {
    console.log("onSpeechEndHandler: ", e);
  }

  onSpeechResultsHandler (e) {
    console.log("onSpeechResultsHandler: ", e);

    this.setState({voiceData: e.value, butonText: 'Listen my voice', showLoader: false});
  }

  _onCorrectTextSelect (e, text) {
    this.setState({voiceData: [text]});

    let url = "https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=hi&dt=t&q="+text;
    fetch(url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: null
    }).then((response) => response.json())
    .then((responseJson) => {
        this._nowTranslateMyConvertedText(responseJson);
    })
    .catch((error) => {
        console.error(error);
    });


    //https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=hi&dt=t&q=Hello%20world
  }


  _nowTranslateMyConvertedText(responseJson) {
    console.log('responseJson: ', responseJson, JSON.stringify(responseJson));
    
    
    Tts.voices().then(voices => console.log(voices));

    Tts.setDefaultLanguage("hi-IN");


    Tts.speak(responseJson[0][0][0]);
  }





  render() {

    let pickerListComponent = languageList.map((lang, index) => {
      return <Picker.Item key={'lang'+index} label={lang.value} value={lang.key} />
    });


    return (
      <View style={{backgroundColor: "red", flex: 1}}>
        <View style={{backgroundColor: "green", flex: 1}}>
          <Text style={{fontSize: 20, textAlign: 'center', marginTop: 20}}>Select your voice</Text>
          <Picker 
            selectedValue={this.state.language} 
            onValueChange={(itemValue, itemIndex) => this.setState({language: itemValue})}>

            {pickerListComponent}
          </Picker>

          <Button
              style={{width: 30, height: 50 }}
              onPress={this.onStartButtonPress.bind(this)}
              title={this.state.butonText}
              color="#841584"
          ></Button>
        </View>
        <View style={{backgroundColor: "pink", flex: 2}}>
          <FlatList
            data={this.state.voiceData}
            renderItem={ ({item}) => 
                        <TouchableOpacity
                          style={styles.btnItem}
                          onPress={(e) => this._onCorrectTextSelect(e, item)}
                        >
                          <Text style={styles.btnItemText}>{item}</Text>
                        </TouchableOpacity>
            }
          ></FlatList>
        </View>
      </View>
      
      /*<View style={styles.container}>
        
        <View style={styles.allEle}>
          <Text style={{fontSize: 20, textAlign: 'center', marginTop: 20}}>Select your voice</Text>
          <Picker 
            selectedValue={this.state.language} 
            onValueChange={(itemValue, itemIndex) => this.setState({language: itemValue})}>

            {pickerListComponent}
          </Picker>

          <Button
              onPress={this.onStartButtonPress.bind(this)}
              title={this.state.butonText}
              color="#841584"
          ></Button>
        </View>

        <FlatList
          style={{backgroundColor: 'red', flex: 100, height: 10}}
          data={this.state.voiceData}
          renderItem={ ({item}) => 
                      <TouchableOpacity
                        style={styles.btnItem}
                        onPress={(e) => this._onCorrectTextSelect(e, item)}
                      >
                        <Text style={styles.btnItemText}>{item}</Text>
                      </TouchableOpacity>
          }
        ></FlatList>
      </View>*/
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
    flexDirection: 'column',
    justifyContent: 'center',
    /*alignItems: 'center',*/
    paddingLeft: 16,
    paddingRight: 16
  },
  allEle: {
    flex: 1,
    /*flexDirection: 'row'*/
  },
  btnItem: {
    backgroundColor: 'rgba(0,0,0,0)'
  },
  btnItemText: {
    padding: 10,
    fontSize: 18,
    height: 44,
    color: 'black'
  }
});


