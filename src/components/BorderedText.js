import React, { Component } from 'react';
import {View,Text,StyleSheet} from 'react-native';
export default class BorderedText extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render(){
    return(
      <View >
        <Text style={this.props.textStyle}>{this.props.text}</Text>
        <Text style={[this.props.textStyle,styles.leftShadow]}>{this.props.text}</Text>
        <Text style={[this.props.textStyle,styles.rightShadow]}>{this.props.text}</Text>
        <Text style={[this.props.textStyle,styles.topShadow]}>{this.props.text}</Text>
        <Text style={[this.props.textStyle,styles.bottomShadow]}>{this.props.text}</Text>
      </View>
    );
  }
}

const styles=StyleSheet.create({
  leftShadow:{
    textShadowOffset:{width:4,hehght:4},
    textShadowRadius:4,
    textShadowColor:'#af9c87',
    position:'absolute'
  },
  rightShadow:{
    textShadowOffset:{width:-4,hehght:-4},
    textShadowRadius:4,
    textShadowColor:'#af9c87',
    position:'absolute'
  },
  topShadow:{
    textShadowOffset:{width:4,hehght:-4},
    textShadowRadius:4,
    textShadowColor:'#af9c87',
    position:'absolute'
  },
  bottomShadow:{
    textShadowOffset:{width:-4,hehght:4},
    textShadowRadius:4,
    textShadowColor:'#af9c87',
    position:'absolute'
  },
});
