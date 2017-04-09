import React, { Component } from 'react';
import {Animated, StyleSheet, View, Image, TouchableOpacity, Text, TouchableWithoutFeedback} from 'react-native';
import {PixelRatio, Platform} from 'react-native';

import {generateQuestion} from '../helpers/level2';

import Final from './Final';

import AnimationInit from 'react-native-navigator-animation';
let buildStyleInterpolator = require('buildStyleInterpolator');
let NavAnimate = AnimationInit(buildStyleInterpolator);

import {MediaQueryStyleSheet,MediaQuery} from "react-native-responsive";
import Button from 'react-native-animated-button';

import BeadStone from '../components/BeadStone';
import BorderedText from '../components/BorderedText';
//const Sound = require('react-native-sound');
import {default as Sound} from 'react-native-sound';

export default class Level1 extends Component {
  constructor(props) {
    super(props);
    Sound.setCategory('Ambient', true); // true = mixWithOthers
    this.state={
      /*mx:[new Animated.Value(0),new Animated.Value(0),new Animated.Value(0),new Animated.Value(0),new Animated.Value(0),
          new Animated.Value(0),new Animated.Value(0),new Animated.Value(0),new Animated.Value(0),new Animated.Value(0),],//Animated.Values for Moving Beads Animation*/
      mx:Array.from({length: 10}, (v, i) => new Animated.Value(0)),
      mxlower:Array.from({length: 10}, (v, i) => new Animated.Value(0)),
      upperBeads:[],// Compoennts for upper beads
      lowerBeads:[],// Compoennts for lower beads
      upperBeadsState:[1,1,1,1,1,1,1,1,1,1], // variables for position state of beads
      lowerBeadsState:[1,1,1,1,1,1,1,1,1,1], // variables for position state of beads
      quizText:{question:'',answer:''},  //equation string
      displayed:'',
      currentAnswer:{upper:0, lower:0},
      resultIcon:null,
      quizCount:0,
      correctQuizCount:0,
      forSignScale:new Animated.Value(0),
      forSignOpacity:new Animated.Value(0),
      beadSound:Platform.OS==='ios'?new Sound(require('../../Assets/audio/abead.mp3'),'',(e)=>{console.log(e);}):new Sound('abead.mp3',Sound.MAIN_BUNDLE,(e)=>{console.log(e);})
    }
    Sound.setCategory('Ambient', true);
  }


  triggerAnimation(index,pos){
    var animArray=[];
    if (pos===0){
        if(this.state.upperBeadsState[index]==1){
          this.state.currentAnswer.upper=10-index;
          for(var i=index;i<10;i++){
            animArray.push(
              Animated.timing(this.state.mx[i], {toValue:1, duration:200})
            );
            this.state.upperBeadsState[i]=-1;
          }
        }else{
          this.state.currentAnswer.upper=10-index-1;
          for(var i=index;i>=0;i--){
            animArray.push(
              Animated.timing(this.state.mx[i], {toValue:0, duration:200})
            );
            this.state.upperBeadsState[i]=1;
          }
        }
        Animated.parallel(animArray).start(()=>{
          this.state.beadSound.play((success) => {
              if (success) {
                console.log('successfully finished playing');
              } else {
                console.log('playback failed due to audio decoding errors');
              }
            });
        });
    }else{
        if(this.state.lowerBeadsState[index]==1){
          this.state.currentAnswer.lower=10-index;
          for(var i=index;i<10;i++){
            animArray.push(
              Animated.timing(this.state.mxlower[i], {toValue:1, duration:200})
            );
            this.state.lowerBeadsState[i]=-1;
          }
        }else{
          this.state.currentAnswer.lower=10-index-1;
          for(var i=index;i>=0;i--){
            animArray.push(
              Animated.timing(this.state.mxlower[i], {toValue:0, duration:200})
            );
            this.state.lowerBeadsState[i]=1;
          }
        }
        Animated.parallel(animArray).start(()=>{
          this.state.beadSound.play((success) => {
              if (success) {
                console.log('successfully finished playing');
              } else {
                console.log('playback failed due to audio decoding errors');
              }
            });
        });
    }
  }

  componentWillMount(){
  	for(var i = 0; i < 10; i++){
  		this.state.upperBeads.push(
        <View key = {i}>
          <MediaQuery maxDeviceWidth={479} >
            <Animated.View  style={{transform: [{translateX: this.state.mx[i].interpolate({inputRange: [0, 1], outputRange: [0, 80]})}]}}>
      			   <BeadStone index={i} triggerAnim={(index)=>{this.triggerAnimation(index,0)}} />
            </Animated.View>
          </MediaQuery>
          <MediaQuery minDeviceWidth={480} minDeviceHeight={800}>
            <Animated.View key = {i} style={{transform: [{translateX: this.state.mx[i].interpolate({inputRange: [0, 1], outputRange: [0, 136]})}]}}>
      			   <BeadStone index={i} triggerAnim={(index)=>{this.triggerAnimation(index,0)}}/>
            </Animated.View>
          </MediaQuery>
        </View>
  		);

      this.state.lowerBeads.push(
        <View key = {i}>
          <MediaQuery maxDeviceWidth={479} >
            <Animated.View  style={{transform: [{translateX: this.state.mxlower[i].interpolate({inputRange: [0, 1], outputRange: [0, 80]})}]}}>
      			   <BeadStone index={i} triggerAnim={(index)=>{this.triggerAnimation(index,1)}} />
            </Animated.View>
          </MediaQuery>
          <MediaQuery minDeviceWidth={480} minDeviceHeight={800}>
            <Animated.View key = {i} style={{transform: [{translateX: this.state.mxlower[i].interpolate({inputRange: [0, 1], outputRange: [0, 136]})}]}}>
      			   <BeadStone index={i} triggerAnim={(index)=>{this.triggerAnimation(index,1)}}/>
            </Animated.View>
          </MediaQuery>
        </View>
  		);
  	}
    let quiz=generateQuestion(0);
    this.state.quizText.question=quiz.question;
    this.state.quizText.answer=quiz.answer;
    this.setState({displayed:this.state.quizText.question+'?'});
  }

  _nextQuiz(){
    if(this.state.quizCount+1<12){
        let quiz=generateQuestion(this.state.quizCount+1);
        this.state.quizText.question=quiz.question;
        this.state.quizText.answer=quiz.answer;
        this.setState({
          displayed:this.state.quizText.question+'?',
          resultIcon:null,
          quizCount:this.state.quizCount+1
        });
    }else{
      const {navigator} = this.props;
      navigator.replace({
				name:"Final",
        component:Final,
        animationType:NavAnimate.CustomAnimation("CenterScaleIn","CenterScaleOut"),
        passProps:{'quizCount':this.state.correctQuizCount, 'totals':12}
			});
    }
  }

  _handlePressEnter(){
    let tempStr=this.state.quizText.question;
    tempStr.slice(0,-2);
    this.setState({displayed:this.state.quizText.question+this.state.quizText.answer});
    let currentAnswer=this.state.currentAnswer.upper*10+this.state.currentAnswer.lower;
    if(this.state.quizText.answer===currentAnswer){
      this.setState({
        resultIcon: <Animated.Image source={require('../../Assets/tick.png')} style={styles.answer_sign,{transform: [{scale: this.state.forSignScale}]}}></Animated.Image>,/*,{opacity: this.state.forSignOpacity}*/
        correctQuizCount:this.state.correctQuizCount+1
      });
    }else{
      this.setState({
        resultIcon: <Animated.Image source={require('../../Assets/cross.png')} style={styles.answer_sign,{transform: [{scale: this.state.forSignScale}]}}></Animated.Image>/*,{opacity: this.state.forSignOpacity}*/
      });
    }
    this.state.forSignScale.setValue(1.5);
    Animated.sequence([Animated.timing(this.state.forSignScale, {
      toValue: 1.0,
      duration:200
    }),Animated.delay(300),
    Animated.timing(this.state.forSignScale, {
      toValue: 1.5,
      duration:200
    })]).start();
    setTimeout(() => {this._nextQuiz()}, 800);
  }

  render() {
    return (
      <Image style={styles.container} source={require('../../Assets/level_2_bg.png')}>
        <View style={styles.answer_sign}>
          {this.state.resultIcon}
        </View>
        <BorderedText textStyle={styles.quizText} text={this.state.displayed}></BorderedText>
        <View style={styles.abacusContainer}>
          <Image  source={require('../../Assets/abacusBg.png')} style={styles.beadpanBg}>
              <View style={styles.beadpan}>
                {this.state.upperBeads}
              </View>
          </Image>
          <Image  source={require('../../Assets/abacusBg.png')} style={styles.beadpanBg}>
              <View style={styles.beadpan}>
                {this.state.lowerBeads}
              </View>
          </Image>
        </View>
        <TouchableOpacity onPress={()=>{this._handlePressEnter();}} style={styles.enterBt}>
            <Image source={require('../../Assets/button.png')} />
        </TouchableOpacity>
      </Image>
    );
  }
}

const styles = MediaQueryStyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    width:null,
		height:null,
		resizeMode:'cover'
  },answer_sign:{width:60, height:60},
  quizText:{
    zIndex:10, color:'#62473e', fontSize:36,
    fontFamily:Platform.OS=='ios'?'Helvetica':'sans-serif',
    lineHeight:40, backgroundColor: 'rgba(0,0,0,0)', fontWeight:'800',
    textShadowColor:'#af9c87', textShadowOffset:{width:2,hehght:2}, textShadowRadius:4
    //textShadow:'0 0 0 transparent, 6px 0px 0px #af9c87, 5.54328px 2.2961px 0px #af9c87, 4.24264px 4.24264px 0px #af9c87, 2.2961px 5.54328px 0px #af9c87, 0px 6px 0px #af9c87, -2.2961px 5.54328px 0px #af9c87, -4.24264px 4.24264px 0px #af9c87, -5.54328px 2.2961px 0px #af9c87, -6px 0px 0px #af9c87, -5.54328px -2.2961px 0px #af9c87, -4.24264px -4.24264px 0px #af9c87, -2.2961px -5.54328px 0px #af9c87, 0px -6px 0px #af9c87, 2.29612px -5.54327px 0px #af9c87, 4.24274px -4.24262px 0px #af9c87, 5.54372px -2.29599px 0px #af9c87, 5px 5px 15px rgba(0, 0, 0, 0.5)'
  },
  abacusContainer:{
    marginTop:-10
  },
  beadpanBg:{
    width:440,
    height:90,
    resizeMode:'stretch'
  },
  beadpan:{marginTop:20, marginLeft:29, flex:1,flexDirection:'row'},
  enterBt:{marginTop:-10}
},{
  "@media (min-device-width: 479) and (min-device-height: 800)": {
    beadpan:{
      marginTop:64,marginLeft:45,marginBottom:66,flex:1,paddingTop:5
    },
    quizText:{
      fontSize:72,
      paddingTop:20,
    },
    answer_sign:{width:100, height:100}
  }
}
);
