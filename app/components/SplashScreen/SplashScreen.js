import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text
} from 'react-native';

export default class SplashScreen extends Component<{}> {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        console.log('componentDidMount... splashscreen');
    }


    render() {
        return (
            <View style={styles.container}>
                <View style={styles.logoContainer}>
                    
                    <Text style={styles.logoText}>Blabber</Text>
                </View>
                <View style={styles.footerContainer}>
                    <Text style={styles.footerText}>Developed by Saurabh Barthwal</Text>
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
    },
    logoContainer: {
        flex: 1,
        justifyContent: 'center'
    },
    logoText: {
        fontSize: 43,
        fontWeight: 'bold',
        color: '#fff',
        opacity: 0.9

    },
    footerContainer: {
        paddingBottom: 20,
        opacity: 0.5
    },
    footerText: {
        color: '#fff'
    }
});




