import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { ScrollView, View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native'

import { priceDisplay } from '../util'
import ajax from '../ajax'

export default class DealDetail extends Component {
    static propTypes = {
        initialDealData: PropTypes.object.isRequired,
        onBack: PropTypes.func.isRequired
    }
    state = {
        deal: this.props.initialDealData
    }
    async componentDidMount() {
        const fullDeal = await ajax.fetchDealDetail(this.state.deal.key)
        this.setState({
            deal: fullDeal
        })
    }
    render() {
        const { deal } = this.state
        return (
            <ScrollView>
                <TouchableOpacity onPress={this.props.onBack} style={styles.button}>
                    <Text>Back</Text>
                </TouchableOpacity>
                <View style={styles.deal}>
                <Image source={{ uri: deal.media[0] }} 
                        style={styles.image}
                />
                <Text style={styles.title}>{deal.title}</Text>
                <View style={styles.row}>
                    <View style={styles.details}>
                        <Text>{deal.cause.name}</Text>
                        <Text>{priceDisplay(deal.price)}</Text>
                    </View>
                    {deal.user && (
                    <View>
                        <Image source={{ uri: deal.user.avatar }} style={styles.avatar} />
                        <Text>{deal.user.name}</Text>
                    </View>
                    )}
                </View>
                <Text style={styles.description}>{deal.description}</Text>
                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    button: {
        marginTop: 50,
        paddingLeft: 10,
    },
    deal: {
        marginTop: 10,
        margin: 10,
        paddingBottom: 10,
        borderWidth: 1,
        borderColor: '#bbb',
        backgroundColor: '#fff'
    },
    image: {
        width: '100%',
        height: 250,
        backgroundColor: '#ccc'
    },
    title: {
        color: '#212930',
        fontSize: 18,
        fontWeight: 'bold',
        padding: 10,
        backgroundColor: '#E5E1D6'
    },
    details: {
        padding: 10,
        textAlign: 'center'
    },
    avatar: {
        margin: 10,
        width: 60,
        height: 60,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    description: {
        marginTop: 10,
        padding: 10
    },
    
})