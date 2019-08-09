import React, { Component } from "react"
import {
  Container,
  Header,
  Content,
  Footer,
  Left,
  Body,
  Right,
  Button,
  Icon,
  Title
} from "native-base"
import { StyleSheet } from 'react-native'
import ajax from './src/ajax'

import PhotoList from "./src/components/PhotoList"
import PhotoDetail from './src/components/PhotoDetail'
import CameraComponent from "./src/components/Camera"

export default class App extends Component {
  state = {
    photos: [],
    currentPhotoId: null,
    cameraOn: false
  }
  async componentDidMount() {
    const photos = await ajax.fetchPhotos()
    this.setState({ photos })
  }
  setCurrentPhoto = (photoId) => {
    this.setState({ currentPhotoId: photoId })
  }
  unsetCurrentPhoto = () => {
    this.setState({ currentPhotoId: null })
  }
  currentPhoto = () => {
    return this.state.photos.find((photo) => photo.key === this.state.currentPhotoId)
  }
  accessCamera = () => {
    this.setState({ cameraOn: true})
  }
  quitCamera = () => {
    this.setState({ cameraOn: false})
  }
  
  render() {
    if (this.state.cameraOn) {
      return (
        <CameraComponent onBack={this.quitCamera} />
      )
    } else {
      return (
        <Container>
        {/* This is a header */}
        <Header>
          <Left>
            <Icon name="ios-menu" />
          </Left>
          <Body>
            <Title>Photo Gallery</Title>
          </Body>
          <Right>
            <Icon name="ios-person" />
          </Right>
        </Header>

        {/* This is a content body */}
        <Content>
            { this.state.currentPhotoId
              ? <PhotoDetail photoData={this.currentPhoto()} onBack={this.unsetCurrentPhoto}/>
              : <PhotoList data={this.state.photos}  onItemPress={this.setCurrentPhoto}/>
            }
        </Content>

        {/* This is a footer */}
        <Footer>
          <Button transparent style={styles.button} onPress={this.accessCamera}>
            <Icon name="ios-camera" style={styles.icon} />
          </Button>
        </Footer>
      </Container>
      )
    }
  }
}

const styles=StyleSheet.create({
  button: {
    marginTop: 10,
  }, 
  icon: {
    fontSize: 60, 
    marginTop: -20
  }
})