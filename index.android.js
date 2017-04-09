import React, { Component } from 'react';
import {AppRegistry,StatusBar, StyleSheet, Text, View,Navigator} from 'react-native';
import Logo from './src/scenes/Logo';

import AnimationInit from "react-native-navigator-animation";
let buildStyleInterpolator = require('buildStyleInterpolator');
let NavAnimate = AnimationInit(buildStyleInterpolator);

const Routes = {
  Nav:{
    name:"Logo",component:Logo,index:0,animationType:NavAnimate.AnimationScaleInRight,params:{bgColor:"#76EEC6"}
  },
}

export default class AncientAbacus extends Component {
  render() {
    return (
      <View style={styles.navigatorContainer}>
        <StatusBar backgroundColor="blue" barStyle="light-content" hidden={true}/>
        <Navigator
					initialRoute={Routes.Nav}
          enableGestures={false}
          configureScene={(route) =>{return route.animationType;}}
					renderScene={(route, navigator) => {
            let Component = route.component;
						if (route.component) {
							return <route.component navigator={navigator} {...route.passProps} />;
						}
					}}
				/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
	navigatorContainer: {
        flex: 1,
    }
});

AppRegistry.registerComponent('AncientAbacus', () => AncientAbacus);
