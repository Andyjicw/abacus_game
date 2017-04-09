import React, { Component } from 'react';
import {StyleSheet, Animated, TouchableOpacity,TouchableWithoutFeedback} from 'react-native';
import {Platform} from 'react-native';

import {Image, Text,View} from 'react-native-animatable';
import {MediaQuery, MediaQueryStyleSheet} from "react-native-responsive";

import Level1 from './Level1';
import Level2 from './Level2';

import AnimationInit from "react-native-navigator-animation";
let buildStyleInterpolator = require('buildStyleInterpolator');
let NavAnimate = AnimationInit(buildStyleInterpolator);

export default class Welcome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bgbounceValue: new Animated.Value(0.1),
    };
  }

  onPressLevelTitle(level){
    const {navigator} = this.props;
    if(level==1){
      navigator.replace({
				name:"Nav",
        component:Level1,
        animationType:NavAnimate.CustomAnimation("CenterScaleIn","CenterScaleOut")
			});
    }else if(level==2){
      navigator.replace({
				name:"Nav",
        component:Level2,
        animationType:NavAnimate.CustomAnimation("CenterScaleIn","CenterScaleOut")
			});
    }else if(level==3){
      console.log("Level 3");
    }else if(level==4){
      console.log("Level 4");
    }
  }

  render() {
    return (
        <Animated.Image source={require('../../Assets/bg_360_640.png')} style={[styles.bgimage,{opacity:this.state.bgbounceValue}]}>
            <MediaQuery maxDeviceWidth={480}>
                <Image animation="zoomInDown" delay={1010} source={require('../../Assets/title_360_640.png')} style={styles.title}/>
            </MediaQuery>
            <MediaQuery minDeviceWidth={480} >
                <Image animation="zoomInDown" delay={1010} source={require('../../Assets/title_480_800.png')} style={styles.title}/>
            </MediaQuery>
            <TouchableOpacity onPress={()=>{this.onPressLevelTitle(1)}} style={{marginTop:30}}>
              <Text animation="bounceInUp" duration={1100} delay={1800} style={styles.levelLabel}>LEVEL - 1</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{this.onPressLevelTitle(2)}}>
              <Text animation="bounceInUp" duration={1100} delay={1900} style={styles.levelLabel}>LEVEL - 2</Text>
            </TouchableOpacity>
            <TouchableWithoutFeedback activeOpacity={0.1}>
              <Text animation="bounceInUp" duration={1100} delay={2000} style={styles.levelLabel} >LEVEL - 3</Text>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback activeOpacity={0.1}>
              <Text animation="bounceInUp" duration={1100} delay={2100} style={styles.levelLabel} >LEVEL - 4</Text>
            </TouchableWithoutFeedback>
        </Animated.Image>
    );
  }

  componentDidMount(){
    Animated.timing(                          // Base: spring, decay, timing
      this.state.bgbounceValue,                 // Animate `bounceValue`
      {
        toValue: 1.0,                         // Animate to smaller size
        duration:1000
      }
    ).start();
  }
}

const styles=MediaQueryStyleSheet.create({
  bgimage:{
    flex:1,
    alignItems:'center',
    justifyContent:'center',
    width:null,
		height:null,
		resizeMode:'cover'
  },
  title:{
    resizeMode:'cover'
  },
  levelLabel:{
    fontSize:36,
    fontFamily:Platform.OS=='ios'?'Helvetica':'sans-serif',
    lineHeight:40,
    color:'#ccbfaf',
    textShadowOffset: {width: 2, height: 5},
    textShadowRadius: 14,
    textShadowColor: 'black'
  }
},{
  "@media (min-device-width: 480)": {
    levelLabel:{
      fontSize:55,
      marginTop:15
    }
  }
}
);
