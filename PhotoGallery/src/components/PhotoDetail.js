import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, Text, Image, StyleSheet } from 'react-native'
import { Button, Icon } from 'native-base'
import ajax from '../ajax'

export default class PhotoDetail extends Component {
    static propTypes = {
        photoData: PropTypes.object.isRequired,
        onBack: PropTypes.func.isRequired
    }
    state = {
        photo: this.props.photoData
    }
    async componentDidMount() {
        const photoDetail = await ajax.fetchPhotoDetail(this.state.photo.key)
        this.setState({
            photo: photoDetail
        })
    }
    render() {
        const { photo } = this.state
        return (
            <View>
                <Button iconLeft transparent onPress={this.props.onBack} 
                        style={styles.button}>
                    <Icon name='arrow-back' />
                    <Text style={styles.text}>Back</Text>
                </Button>
                <Text style={styles.title}>{photo.title}</Text>
                <Image source={{ uri: photo.media[0] }} style={styles.photo} />
            </View>
        )
    }
}

const styles=StyleSheet.create({
    button: {
        justifyContent: 'flex-start'
    },
    text: {
        fontSize: 18, 
        marginLeft: 7,
        color: '#428bca'
    },
    title: {
        fontSize: 20, 
        fontWeight: 'bold',
        textAlign: 'center',
        margin: 10
    },
    photo: {
        height: 300, 
        width: null, 
        margin: 10
    }
})
