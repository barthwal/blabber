import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image
} from 'react-native';


const languageList = [{"key": "en", "value": "English"}, {"key": "hi", "value": "Hindi"}, {"key": "bn", "value": "Bengali"}, {"key": "bh", "value": "Bihari"}, {"key": "zh", "value": "Chinese"}, {"key": "fr", "value": "French"}, {"key": "ks", "value": "Kashmiri"}, {"key": "ur", "value": "Urdu"}];

export default class SelectLanguage extends Component<{}> {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        console.log('componentDidMount... SelectLanguage');
    }


    render() {
        let pickerListComponent = languageList.map((lang, index) => {
            return <Picker.Item key={'lang'+index} label={lang.value} value={lang.key} />
        });


        return (
            <View style={styles.container}>
                <View>
                    <View>
                        <Text>Select your voice</Text>
                    </View>
                    <View>

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
        backgroundColor: '#122330'
    }
});




