import React, {Component} from 'react'
import { View, Text, StyleSheet, TextInput } from 'react-native'
import PropTypes from 'prop-types'

export default class ColorForm extends Component {
    static propTypes = {
        onNewColor: PropTypes.func.isRequired
    }
    constructor() {
        super()
        this.state = {
            txtColor: ''
        }
        this.submit = this.submit.bind(this)
    }

    submit() {
        this.props.onNewColor(this.state.txtColor.toLowerCase())
        this.setState({txtColor: ''})
    }

    render() {
        return(
            <View style={styles.container}>
                <TextInput style={styles.txtInput} 
                    placeholder='enter a color...' 
                    onChangeText={(txtColor) => this.setState({txtColor})} 
                    value={this.state.txtColor} />
                <Text style={styles.button}
                    onPress={this.submit}>Add</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: 'lightgrey', 
        padding: 10
    }, 
    txtInput: {
        flex: 1, 
        margin: 5, 
        padding: 5, 
        borderWidth: 2, 
        fontSize: 20, 
        borderRadius: 5, 
        backgroundColor: 'snow'
    },
    button: {
        fontSize: 20, 
        backgroundColor: 'darkblue',
        margin: 5,
        padding: 5, 
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white'
    }
})