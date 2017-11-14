import React, { Component } from 'react';
import {
    NativeModules,
    StyleSheet,
    LayoutAnimation,
    TouchableOpacity,
    FlatList,
    View,
    Text,
    Button,
    Picker
} from 'react-native';

import Voice from 'react-native-voice';
import Tts from 'react-native-tts';


const languageList = [{"key": "en", "value": "English"}, {"key": "hi", "value": "Hindi"}, {"key": "bn", "value": "Bengali"}, {"key": "bh", "value": "Bihari"}, {"key": "zh", "value": "Chinese"}, {"key": "fr", "value": "French"}, {"key": "ks", "value": "Kashmiri"}, {"key": "ur", "value": "Urdu"}];



// 
const { UIManager } = NativeModules;
UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);

export default class SelectLanguage extends Component<{}> {

    constructor(props) {
        super(props);

        this.state = {myLanguage : 'en', yourLanguage : 'hi', voiceData: ['hello', 'hello world','hello', 'hello world', 'pick you'], translateData: [], butonText: 'Listen me', showLoader: false, isformShow: true, w: 0, h: 0};

    }

    reset() {
        this.setState({voiceData: ['hello', 'hello world','hello', 'hello world', 'pick you'], translateData: [], butonText: 'Listen me', showLoader: false, isformShow: false, w: 0, h: 0});
    }

    componentDidMount() {
        console.log('componentDidMount... SelectLanguage');


        Voice.onSpeechStart = this.onSpeechStartHandler.bind(this);
        Voice.onSpeechEnd = this.onSpeechEndHandler.bind(this);
        Voice.onSpeechResults = this.onSpeechResultsHandler.bind(this);
    }

    // start voice to text convert
    onSpeechStartHandler (e) {
        console.log("onSpeechStartHandler: ", e);
    }

    onSpeechEndHandler (e) {
        console.log("onSpeechEndHandler: ", e);
        this.setState({voiceData: [], butonText: 'Listen me', showLoader: false, isformShow: true});
    }

    onSpeechResultsHandler (e) {
        console.log("onSpeechResultsHandler: ", e);
        this.setState({voiceData: e.value, butonText: 'Listen me', showLoader: false, isformShow: false});


        LayoutAnimation.spring();
        this.setState({w: 313, h: 425 });

    }

    onListenButtonPress() {
        console.log('saurabh: ');


        let available = Voice.isAvailable();
        let onListenClick = this.state.showLoader;


        if(available && !onListenClick){
            console.log('Selected voice: ', this.state.myLanguage);
            console.log('Voice available: ', available);

            Voice.start(this.state.myLanguage);
            this.setState({voiceData: [], butonText: 'Listining...', showLoader: true});
        }
    }
    // end voice to text convert



    // start google translate api
    _onCorrectTextSelect (e, text) {
        this.setState({voiceData: [text]});

        //let url = "https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=hi&dt=t&q="+text;
        let url = "https://translate.googleapis.com/translate_a/single?client=gtx&sl="+this.state.myLanguage+"&tl="+this.state.yourLanguage+"&dt=t&q="+text;
        fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: null
        }).then((response) => response.json())
        .then((responseJson) => {
            this._nowTranslateMyConvertedText(responseJson[0][0][0]);
        })
        .catch((error) => {
            console.error(error);
        });

        //https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=hi&dt=t&q=Hello%20world
      }
    // end google translate api


    // start text to speech
    _nowTranslateMyConvertedText(responseJson) {
        console.log('responseJson: ', responseJson);

        let voiceText = responseJson;
        this.setState({translateData: [voiceText]});

        Tts.voices().then(voices => console.log(voices));

        Tts.setDefaultLanguage("hi-IN");
        Tts.speak(voiceText);
    }
    // end text to speech


    // start navigation three button Panel
    onListenBackButtonPress() {
        this.reset();
        this.setState({isformShow: true});
    }

    onListenPlayAgainButtonPress() {
        var voiceText = this.state.translateData[0];
        console.log('voice: ', voiceText);
        
        this._nowTranslateMyConvertedText(voiceText);
    }

    onListenNavButtonPress() {
        this.setState({isformShow: true});
        this.onListenButtonPress();
    }
    // end navigation three button Panel



    render() {
        let pickerListComponent = languageList.map((lang, index) => {
            return <Picker.Item key={'lang'+index} label={lang.value} value={lang.key} />
        });


        return (
            <View style={styles.container}>
                <View style={{display: (this.state.isformShow == true)? 'flex' : 'none'}}>
                    <View style={styles.rowContainer}>
                        <View style={styles.textView}>
                            <Text style={styles.textHeading}>Select your voice:</Text>
                        </View>
                        <View style={styles.pickerView}>
                            <Picker
                                style={styles.pickerElement} 
                                selectedValue={this.state.myLanguage} 
                                onValueChange={(itemValue, itemIndex) => this.setState({myLanguage: itemValue})}>
                                {pickerListComponent}
                            </Picker>
                        </View>
                    </View>
                    <View style={[styles.rowContainer, styles.rowContainerMarginTop]}>
                        <View style={styles.textView}>
                            <Text style={styles.textHeading}>Translate voice into:</Text>
                        </View>
                        <View style={styles.pickerView}>
                            <Picker
                                style={styles.pickerElement} 
                                selectedValue={this.state.yourLanguage} 
                                onValueChange={(itemValue, itemIndex) => this.setState({yourLanguage: itemValue})}>
                                {pickerListComponent}
                            </Picker>
                        </View>
                    </View>
                    <View style={[styles.rowContainer, styles.rowContainerMarginTop]}>
                        <Button
                            onPress={this.onListenButtonPress.bind(this)}
                            title={this.state.butonText}
                            color="#34495e"
                        >
                        </Button>
                    </View>
                </View>

                <View style={{display: (this.state.isformShow == false)? 'flex' : 'none', width: this.state.w, height: this.state.h}}>
                    <View style={[styles.rowContainer], { flex: 1, justifyContent: "flex-end" }}>
                        <View style={styles.rowTranslateView} >
                            <View style={{alignItems: "center"}}>
                                <Text style={{fontSize: 20, fontWeight: "bold", textAlign: "center", width: 250}}>What you want to translate, select correct sentence!</Text>
                            </View>
                            <FlatList
                                data={this.state.voiceData}
                                renderItem={ ({item}) => 
                                                    <TouchableOpacity
                                                        style={styles.btnItem}
                                                        onPress={(e) => this._onCorrectTextSelect(e, item)}>
                                                        <Text style={styles.btnItemText}>{item}</Text>
                                                    </TouchableOpacity>
                                            }
                            ></FlatList>
                        </View>

                        <View style={styles.rowTranslateView, {display: (this.state.translateData.length > 0) ? "flex": "none"}} >
                            <View style={{alignItems: "center"}}>
                                <Text style={{fontSize: 20, fontWeight: "bold", textAlign: "center", width: 250}}>Final voice:</Text>
                            </View>

                            <FlatList
                                data={this.state.translateData}
                                renderItem={ ({item}) => 
                                                    
                                            <Text style={styles.btnItemText}>{item}</Text>
                                        }
                            ></FlatList>
                        </View>
                    </View>


                    <View style={[styles.rowContainer, styles.rowContainerMarginTop, styles.threebuttonPanel]}>
                        <View style={styles.threeButtonView}>
                           <TouchableOpacity
                                style={styles.threebuttonEle}
                                onPress={this.onListenBackButtonPress.bind(this)}>
                                
                                <Text style={styles.threebuttonTextEle}>Back</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.threeButtonView, {display: (this.state.translateData.length > 0) ? "flex": "none"}}>
                            <TouchableOpacity
                                style={styles.threebuttonEle}
                                onPress={this.onListenPlayAgainButtonPress.bind(this)}>
                                
                                <Text style={styles.threebuttonTextEle}>Play again</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.threeButtonView}>
                            <TouchableOpacity
                                style={styles.threebuttonEle}
                                onPress={this.onListenNavButtonPress.bind(this)}>
                                
                                <Text style={styles.threebuttonTextEle}>{this.state.butonText}</Text>
                            </TouchableOpacity>

                        </View>
                    </View>
                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:'#fff'
    },
    rowContainer: {
        width: 300,
    },
    rowContainerMarginTop: {
        marginTop: 34
    },
    rowTranslateView: {
        
    },
    textView: {
        marginBottom: 16
    },
    textHeading: {
        fontSize: 20,
        textAlign: 'center',
        color: '#7f8c8d',
        opacity: 0.7
    },
    pickerView: {
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: '#bdc3c7'
    },
    pickerElement: {
        color: '#bdc3c7',
    },
    threebuttonPanel: {
        flex: 1,
        flexDirection: 'row',
        width: 300,
        justifyContent: 'center'
    },
    threeButtonView: {
        width: 100,
        height: 80,
        alignContent: "center",
        alignItems: "center",
        justifyContent: "center",
    },
    threebuttonEle: {
        width: 80,
        height: 80,
        borderRadius: 50,
        backgroundColor: '#34495e',
        justifyContent: "center",
        alignItems: "center"
    },
    threebuttonTextEle: {
        textAlign: "center",
        color: "#fff"
    }
});




