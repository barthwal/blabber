import React, { Component } from 'react';
import {
    StyleSheet,
    Image,
    View,
    Text,
    Button,
    Picker
} from 'react-native';


export default class Exp extends Component<{}> {

    constructor(props) {
        super(props);

        this.state = {
          width: 0,
          height: 0,
          x: 0,
          y: 0
        }

        
    }

    componentDidMount() {
        console.log('componentDidMount... Exp');

    }

    onLayout = (e) => {
        console.log(this.state);

        this.setState({
          width: e.nativeEvent.layout.width,
          height: e.nativeEvent.layout.height,
          x: e.nativeEvent.layout.x,
          y: e.nativeEvent.layout.y
        })

        console.log(this.state);
      }


    render() {

        return (
           /*<View onLayout={this.onLayout}>
              <Image source={{ uri: 'http://fillmurray.com/200/200' }} width={200} height={200} />
              <Text>My Picture</Text>
            </View>*/


            <View style={styles.container} onLayout={this.onLayout}>
                <Image source={require('../../images/ble.png')} width={200} height={200}></Image>
                <Text>My Picture</Text>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});




