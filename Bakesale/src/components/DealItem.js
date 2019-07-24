import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native'

import { priceDisplay } from '../util'

export default class DealItem extends Component {
    static propTypes = {
        deal: PropTypes.object.isRequired,
        onPress: PropTypes.func.isRequired
    }
    handlePress = () => {
        this.props.onPress(this.props.deal.key)
    }
    render() {
        const { deal } = this.props
        return (
            <TouchableOpacity style={styles.deal}
                onPress={this.handlePress}
            >
                <Image source={{ uri: deal.media[0] }} 
                        style={styles.image}
                />
                <Text style={styles.title}>{deal.title}</Text>
                <View style={styles.details}>
                    <Text>{deal.cause.name}</Text>
                    <Text>{priceDisplay(deal.price)}</Text>   
                </View>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    deal: {
        margin: 10,
        paddingBottom: 10,
        borderWidth: 1,
        borderColor: '#bbb',
        backgroundColor: '#fff'
    },
    image: {
        width: '100%',
        height: 150,
        backgroundColor: '#ccc'
    },
    title: {
        color: '#212930',
        fontSize: 18,
        fontWeight: 'bold',
        padding: 10,
    },
    details: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingRight: 10,
        paddingLeft: 10
    }
})