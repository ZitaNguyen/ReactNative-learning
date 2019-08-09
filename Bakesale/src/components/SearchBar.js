import React, { Component } from 'react'
import PropTypes from 'prop-types'
import debounce from 'lodash.debounce'

import { TextInput, StyleSheet } from 'react-native'

export default class SearchBar extends Component {
    static propTypes = {
        searchDeals: PropTypes.func.isRequired,
        initialSearchTerm: PropTypes.string.isRequired
    }
    state = {
        searchTerm: this.props.initialSearchTerm
    }
    searchDeals = (searchTerm) => {
        this.props.searchDeals(searchTerm)
        // blur text input
        this.inputElement.blur()
    }
    debouncedSearchDeals = debounce(this.searchDeals, 300)
    handleChange = (searchTerm) => {
        this.setState({ searchTerm }, () => {
            this.debouncedSearchDeals(this.state.searchTerm)
        })
    }
    render() {
        return (
           <TextInput 
                ref={(inputElement) => {this.inputElement = inputElement}}
                value={this.state.searchTerm}
                placeholder="Search Deal..."
                style={styles.input} 
                onChangeText={this.handleChange}
            />
        )
    }
}

const styles = StyleSheet.create({
    input: {
        marginTop: 50,
        marginHorizontal: 12,
        height: 40,
        fontSize: 25
    }
})
