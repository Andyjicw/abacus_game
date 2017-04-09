import React,{ Component, PropTypes} from 'react';
import {Image,View, TouchableWithoutFeedback} from 'react-native';
import {MediaQueryStyleSheet,MediaQuery} from "react-native-responsive";

export default class BeadStone extends Component{
  constructor(props) {
    super(props);
  }

  _onImagePress(){
    this.props.triggerAnim(this.props.index);//, this.state.pos);
  }

  render(){
      return(
        <View>
          <MediaQuery maxDeviceWidth={479}>
              <TouchableWithoutFeedback onPress={() => this._onImagePress()}>
                  <Image source={require('../../Assets/bead.png')}></Image>
              </TouchableWithoutFeedback>
          </MediaQuery>
          <MediaQuery minDeviceWidth={480}>
              <TouchableWithoutFeedback onPress={() => this._onImagePress()}>
                  <Image source={require('../../Assets/bead_480_800.png')}></Image>
              </TouchableWithoutFeedback>
          </MediaQuery>
        </View>
      );
  }
}

BeadStone.propTypes = {
  triggerAnim: PropTypes.func.isRequired,
};
