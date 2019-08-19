import React, {Component} from 'react';
import { StyleSheet, FlatList } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
// import PropTypes from 'prop-types'

import ColorButton from './ColorButton'
import ColorForm from './ColorForm'

export default class ColorList extends Component {
    static navigationOptions = {
        title: 'Available Colors'
    }

    constructor() {
        super()
        const availableColors = []
        this.state = {
        //   backgroundColor: 'blue',
        availableColors
        }
        // this.changeColor = this.changeColor.bind(this)
        this.newColor = this.newColor.bind(this)
    }

    componentDidMount() {
        getColor = async () => {
        try {
            const data = await AsyncStorage.getItem('@ColorListStore')
            console.log(data)
            if (data !== null) {
            const availableColors = JSON.parse(data)
            this.setState({availableColors})
            } 
        } catch (err) {
            console.error('Error loading colors', err)
        }
        }
    }

    saveColor = async (color) => {
        try {
        await AsyncStorage.setItem(
            // save data under key name
            '@ColorListStore', 
            // save data under a string
            JSON.stringify(color)
        )
        console.log(color)
        } catch (err) {
        console.error('Error loading colors', err)
        }
    }

    //   changeColor(backgroundColor) {
    //     this.setState({backgroundColor})
    //   }

    newColor(color) {
        const availableColors = [
        // copy all old array into this new array
        ...this.state.availableColors,
        {color}
        ]
        this.setState({availableColors})
        this.saveColor(availableColors)
    }

    render() {
        const { navigate } = this.props.navigation
        const { backgroundColor } = this.state
        return (
        <FlatList data = {this.state.availableColors} 
            renderItem = {({item}) => 
            <ColorButton backgroundColor={item.color}
            // redundant code, can be changed as below
            // onSelect={(color) => this.changeColor(color)} 
            //   onSelect={this.changeColor} 
                // onSelect={this.props.onColorSelected}
                onSeclect={() => navigate('Details', {color})}
                />
            }
            keyExtractor = {(item, index) => index.toString()}
            ListHeaderComponent = {() => <ColorForm onNewColor={this.newColor} /> }
            style={[ styles.container, { backgroundColor }]}>
        </FlatList>
        )
    }
}

// ColorList.defaultProps = {
//     onColorSelected: f=>f
// }

// ColorList.propTypes = {
//     onColorSelected: PropTypes.func
// }

const styles = StyleSheet.create({
  container: {
    flex: 1, 
  },
})

