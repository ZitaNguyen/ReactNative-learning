import React, { Component } from 'react';
import PropTypes from "prop-types"
import { Text, View, TouchableOpacity, Image, StyleSheet } from 'react-native';
import * as Permissions from 'expo-permissions';
import { Camera } from 'expo-camera';
import { Icon, Button } from 'native-base'

export default class CameraComponent extends Component {
    static propTypes = {
        onBack: PropTypes.func.isRequired
    }
    state = {
        hasCameraPermission: null,
        type: Camera.Constants.Type.back,
        photoCaptured: null,
        onBack: false,
    }

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  async snapPhoto() {       
    // console.log('Button Pressed');
    if (this.camera) {
    //    console.log('Taking photo');
       const options = { quality: 1, base64: true, fixOrientation: true, 
       exif: true};
       await this.camera.takePictureAsync(options).then(photo => {
          photo.exif.Orientation = 1;            
          // console.log(photo);  
          this.setState({ photoCaptured: photo.uri }) 
        })         
    }
  }

  handlePress = () => {
    this.setState({ onBack: true })
  }

  render() {
    const { hasCameraPermission } = this.state;
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      if (this.state.photoCaptured && !this.state.onBack) {
        return(
          <View>
            <Button transparent onPress={this.handlePress} style={styles.arrowBack}>
              <Icon name='arrow-back' />
            </Button>
            <Image source={{ uri: this.state.photoCaptured }} style={styles.photoCaptured} />
          </View>
        )
      } else {
        return (
          <View style={{ flex: 1 }}>
            <Camera style={{ flex: 1 }} 
                  ref={ (ref) => {this.camera = ref} }
                  type={this.state.type}>
              <View style={styles.buttons}>
                  <TouchableOpacity onPress={this.props.onBack} 
                          style={styles.buttonBack}>
                      <Icon name='arrow-back' />
                      <Text style={styles.text}>Back</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                      onPress={() => {
                      this.setState({
                          type:
                          this.state.type === Camera.Constants.Type.back
                              ? Camera.Constants.Type.front
                              : Camera.Constants.Type.back,
                      });
                  }}>
                      <Text style={styles.flip}>Flip</Text>
                  </TouchableOpacity>
              </View>
              <View>
                  <TouchableOpacity onPress={this.snapPhoto.bind(this)} >
                      <Icon name='ios-camera' style={styles.iconCamera}/>
                  </TouchableOpacity>
              </View>
            </Camera>
          </View>
        )
      }
      
    }
  }
}

const styles=StyleSheet.create({
    buttons: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'transparent',
        justifyContent: 'space-between',
        marginHorizontal: 10
    },
    buttonBack: {
        flexDirection: 'row',
        justifyContent: 'flex-start', 
        marginTop: 50,
    },  
    text: {
        fontSize: 18, 
        color: '#000',
        marginTop: 3
    },
    flip: {
        fontSize: 18,
        marginTop: 50, 
        color: '#000'
    },
    iconCamera: {
        fontSize: 70,
        textAlign: 'center',
        marginTop: 650,
        marginHorizontal: 140,
        backgroundColor: '#fff',
        opacity: 0.7
    },
    photoCaptured: {
      marginTop: 50,
      height: 500
    },
    arrowBack: {
      marginTop: 50
    }
})