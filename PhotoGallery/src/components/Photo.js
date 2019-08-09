import React, { Component } from "react";
import PropTypes from "prop-types";
import { TouchableOpacity, Image, StyleSheet, Dimensions } from "react-native";

const WIDTH = Dimensions.get("window").width;

export default class Photo extends Component {
  static propTypes = {
    photo: PropTypes.object.isRequired,
    onPress: PropTypes.func.isRequired
  }

  handlePress = () => {
      this.props.onPress(this.props.photo.key)
  }

  render() {
    const { photo } = this.props
    return (    
        <TouchableOpacity onPress={this.handlePress}>
          <Image
            source={{ uri: photo.media[0] }}
            // 0:
            // cause: {name: "Science"}
            // key: "2092036b41a263b6750ba00b47b06ca7"
            // media: Array(4)
            //   0: "https://res.cloudinary.com/bakesale/image/upload/h_150,c_fill/JasminHurtado_084_01262018_lbswrx"
            //   1: "https://res.cloudinary.com/bakesale/image/upload/h_150,c_fill/13_bwdlln"
            //   2: "https://res.cloudinary.com/bakesale/image/upload/h_150,c_fill/DANNYIMG_002001262018_kpk6cf"
            //   3: "https://res.cloudinary.com/bakesale/image/upload/h_150,c_fill/IMG_0068_kkzkcy"
            // length: 4
            // __proto__: Array(0)
            // price: 10000
            // title: "1 hour Photoshoot session "
            // __proto__: Object
            style={styles.photo}
          />
        </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  photo: {
    height: 150,
    width: WIDTH / 2,
    borderWidth: 2,
    borderColor: "#fff",
    padding: 5
  }
});
