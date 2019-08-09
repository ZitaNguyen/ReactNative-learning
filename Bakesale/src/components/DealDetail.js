import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { 
    ScrollView, 
    View, 
    Text, 
    Image, 
    Button,
    TouchableOpacity, 
    PanResponder,
    Animated, 
    Dimensions,
    Linking,
    StyleSheet 
} from 'react-native'

import { priceDisplay } from '../util'
import ajax from '../ajax'

export default class DealDetail extends Component {
    imageXPos = new Animated.Value(0)
    imagePanResponder = PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onPanResponderMove: (evt, gs) => {
            this.imageXPos.setValue(gs.dx) // gs.dx: position of gesture
        },
        onPanResponderRelease: (evt, gs) => {
            // this.width so we can access from other function, instead of const
            this.width = Dimensions.get('window').width 
            // if (gs.dx < -1 * width * 0.4), 
            // if dx less than 40% of the width in minus, means we swipe left
            // The Math.abs() function returns the absolute value of a number
            if (Math.abs(gs.dx) > this.width * 0.4) {
                // The Math.sign() function returns the sign of a number, 
                // indicating whether the number is positive, negative or zero.
                const direction = Math.sign(gs.dx)
                // -1 for left, 1 for right
                Animated.timing(this.imageXPos, {
                    toValue: direction * this.width,
                    duration: 250
                }).start(() => this.handleSwipe(-1 * direction))
            } else {
                // if swipe less than 40%, reset image back to 0 position
                Animated.spring(this.imageXPos, {
                    toValue: 0
                }).start()
            }
        }
    })

    // indexDirection: +1 OR -1 (swipe left or right), this is the inverse of direction above
    handleSwipe = (indexDirection) => {
        // if no more image in the media array, return
        // reset swipe
        if (!this.state.deal.media[this.state.imageIndex + indexDirection]) {
            Animated.spring(this.imageXPos, {
                toValue: 0
            }).start()
            return
        }
        // update state, change imageIndex
        // animate next image
        this.setState((prevState) => ({
            imageIndex: prevState.imageIndex + indexDirection
        }), () => {
            this.imageXPos.setValue(indexDirection * this.width)
            Animated.spring(this.imageXPos, {
                toValue: 0
            }).start()
        })
    }

    static propTypes = {
        initialDealData: PropTypes.object.isRequired,
        onBack: PropTypes.func.isRequired
    }
    state = {
        deal: this.props.initialDealData, 
        imageIndex: 0
    }
    async componentDidMount() {
        const fullDeal = await ajax.fetchDealDetail(this.state.deal.key)
        this.setState({
            deal: fullDeal
        })
    }
    openDealUrl = () => {
        Linking.openURL(this.state.deal.url) 
    }
    render() {
        const { deal } = this.state
        return (
            <View>
                <TouchableOpacity onPress={this.props.onBack} style={styles.button}>
                    <Text>Back</Text>
                </TouchableOpacity>
                <View style={styles.deal}>
                    <Animated.Image 
                        {...this.imagePanResponder.panHandlers}
                        source={{ uri: deal.media[this.state.imageIndex] }} 
                        style={[{left: this.imageXPos} ,styles.image]}
                    />
                    <Text style={styles.title}>{deal.title}</Text>
                    <ScrollView>
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
                        <Button title="Buy this deal!" onPress={this.openDealUrl} />
                    </ScrollView>
                </View>
            </View>
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
        paddingBottom: 10,
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