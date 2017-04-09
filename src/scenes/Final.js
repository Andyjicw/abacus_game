import React, { Component } from 'react';
import {Animated, StyleSheet, View, Image, TouchableOpacity, Text} from 'react-native';

import AnimateNumber from 'react-native-animate-number';
import AnimationInit from 'react-native-navigator-animation';
let buildStyleInterpolator = require('buildStyleInterpolator');
let NavAnimate = AnimationInit(buildStyleInterpolator);

import {MediaQueryStyleSheet,MediaQuery} from "react-native-responsive";

import Welcome from './Welcome';

export default class Final extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render(){
    console.log(this.props);
    let value=this.props.quizCount/this.props.totals*100;
    return(
        <Image source={require('../../Assets/final_bg.png')} style={styles.container}>
          <Text style={styles.yourScore}>YOUR SCORE</Text>
          <View style={{position:'relative',width:120, height:88,alignItems:'center', flexDirection:'row',marginBottom:20}}>
              <AnimateNumber style={[styles.rateNumber,styles.leftShadow]} value={value} formatter={(val) => {
                    return parseInt(val)+"%"
                  }}>
              </AnimateNumber>
              <AnimateNumber style={[styles.rateNumber,styles.rightShadow]} value={value} formatter={(val) => {
                    return parseInt(val)+"%"
                  }}>
              </AnimateNumber>
              <AnimateNumber style={[styles.rateNumber,styles.topShadow]} value={value} formatter={(val) => {
                    return parseInt(val)+"%"
                  }}>
              </AnimateNumber>
              <AnimateNumber style={[styles.rateNumber,styles.bottomShadow]} value={value} formatter={(val) => {
                    return parseInt(val)+"%"
                  }}>
              </AnimateNumber>
          </View>
          <TouchableOpacity onPress={()=>{this._onContinue()}} activeOpacity={0.5}>
              <MediaQuery maxDeviceWidth={479}>
                <Image source={require('../../Assets/continue.png')}></Image>
              </MediaQuery>
              <MediaQuery minDeviceWidth={480} minDeviceHeight={800} >
                <Image source={require('../../Assets/continue_480_800.png')}></Image>
              </MediaQuery>
          </TouchableOpacity>
        </Image>
    );
  }
  _onContinue(){
    const {navigator} = this.props;
    navigator.replace({
      name:"Nav",
      component:Welcome,
      animationType:NavAnimate.CustomAnimation("CenterScaleIn","CenterScaleOut")
    });
  }
};

const styles = MediaQueryStyleSheet.create({
  container: {
    flex: 1,
    justifyContent:'center',
    alignItems: 'center',
    width:null,
		height:null,
		resizeMode:'cover'
  },
  yourScore:{
    fontSize:58,
    color:'#ccbfaf',
    textShadowOffset:{width:2, height:5},
    textShadowRadius:7,
    fontWeight:'bold',
    backgroundColor: 'rgba(0,0,0,0)',
  },
  rateNumber:{
    fontSize:100,
    color:'#B74312',
    fontWeight:'800',
    textShadowOffset:{width:2,height:2},
  },
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
},{
  "@media (min-device-width: 479) and (min-device-height: 800)": {
      yourScore:{
        fontSize:70,
      },
      rateNumber:{
        fontSize:180,
      }
  }
}
);
